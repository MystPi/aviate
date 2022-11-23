import DataFetcher from './datafetcher';

class Token {
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
}

class ArgType extends Token {}

export class StatusLang {
  constructor(langFunc, fetchTimeout = 5000, errorPrefix = '[error] ') {
    this.langFunc = langFunc;
    this.fetchTimeout = fetchTimeout;
    this.errorPrefix = errorPrefix;
    this.lang = {};
    this.limits = {};
  }

  _tokenize(string) {
    const tokens = [];
    let current = '';
    let index = 0;
    let acceptingWs = 0;

    while (index < string.length) {
      const char = string[index];

      if (char === '{' || char === '}') {
        if (current) {
          tokens.push(new Token('value', current));
          current = '';
        }

        if (char === '{') {
          acceptingWs += 1;
        } else if (char === '}') {
          acceptingWs -= 1;
        }

        tokens.push(new Token(char, char));
      } else if (char === ' ' && acceptingWs > 0) {
        if (current) {
          tokens.push(new Token('value', current));
          current = '';
        }
      } else {
        current += char;
      }
      index += 1;
    }

    if (current) {
      tokens.push(new Token('value', current));
    }

    return tokens;
  }

  _parseTokens(tokens) {
    if (tokens.length === 0) {
      throw new SyntaxError(
        'unexpected end of status, did you miss a closing bracket?'
      );
    }

    const token = tokens.shift();

    if (token.type === 'value') {
      return {
        type: 'value',
        value: token.value,
      };
    } else if (token.type === '{') {
      const component = {
        type: 'component',
        name: tokens.shift().value,
        args: [],
      };

      while (tokens.length > 0 && tokens[0].type !== '}') {
        component.args.push(this._parseTokens(tokens));
      }

      if (tokens.length === 0) {
        this._parseTokens(tokens);
      }

      tokens.shift();
      return component;
    } else if (token.type === '}') {
      throw new SyntaxError('unexpected closing bracket');
    }
  }

  _parse(tokens) {
    const ret = [];
    while (tokens.length > 0) {
      ret.push(this._parseTokens(tokens));
    }
    return ret;
  }

  _findArgType(value) {
    const string = value.toString();
    for (const type of this.lang.argTypes) {
      if (type.test(string)) {
        return new ArgType(type.name, type.apply ? type.apply(string) : string);
      }
    }
    return new ArgType('string', string);
  }

  _checkArgTypes(evaledArgs, component) {
    const ret = [];
    const types = evaledArgs.map((value) => this._findArgType(value));
    let i = 0;
    for (const argType of component.args) {
      if (argType !== types[i].type) {
        return false;
      }
      ret.push(types[i].value);
      i++;
    }
    return ret;
  }

  _checkLimits(component) {
    if (this.limits[component.name] !== undefined) {
      if (this.limits[component.name] >= component.limit) {
        throw new Error(
          `only ${component.limit} ${component.name} component(s) allowed in status`
        );
      } else {
        this.limits[component.name]++;
      }
    } else {
      this.limits[component.name] = 1;
    }
  }

  async _evaluateChunk(chunk, data) {
    if (chunk.type === 'value') {
      return chunk.value;
    }
    for (const component of this.lang.components) {
      if (
        component.name === chunk.name &&
        (component.args?.length || 0) === chunk.args.length
      ) {
        let evaledArgs = await Promise.all(
          chunk.args.map((value) => this._evaluateChunk(value, data))
        );
        if (chunk.args.length > 0) {
          const checked = this._checkArgTypes(evaledArgs, component);
          if (!checked) continue;
          evaledArgs = checked;
        }
        if (component.limit) {
          this._checkLimits(component);
        }
        const result = await component.func(data, evaledArgs);
        if (result === null) {
          throw new Error('requested data not available right now');
        }
        return result;
      }
    }
    throw new SyntaxError('invalid component/argument combination found');
  }

  async _evaluate(parsed, data) {
    const evaled = [];
    for (const chunk of parsed) {
      evaled.push(await this._evaluateChunk(chunk, data));
    }
    return evaled.join('');
  }

  async run(username, status) {
    try {
      this.lang = this.langFunc(username);
      this.limits = {};
      const tokenized = this._tokenize(status);
      const parsed = this._parse(tokenized);
      const data = new DataFetcher(this.lang.data, this.fetchTimeout);
      return await this._evaluate(parsed, data);
    } catch (e) {
      return this.errorPrefix + e.message;
    }
  }
}
