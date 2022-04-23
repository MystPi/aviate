const forums = {
  total: 'total',
  sat: 'Show and Tell',
  announcements: 'Announcements',
  ns: 'New Scratchers',
  hws: 'Help with Scripts',
  requests: 'Requests',
  dse: 'Developing Scratch Extensions',
  qas: 'Questions about Scratch',
  at: 'Advanced Topics',
  suggestions: 'Suggestions',
  collaboration: 'Collaboration',
  bag: 'Bugs and Glitches',
  pi: 'Project Ideas',
  osp: 'Open Source Projects',
  timac: 'Things I\'m Making and Creating',
  tirap: 'Things I\'m Reading and Playing',
  cthpw: 'Connecting to the Physical World'
};


const categories = [
  'loves',
  'favorites',
  'comments',
  'views',
  'followers',
  'following'
];


class Token {
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
}


class InvalidArgType extends Error {
  constructor(...args) {
    super(...args);
    this.name = 'InvalidArgType';
  }
}


class UnknownComponent extends Error {
  constructor(...args) {
    super(...args);
    this.name = 'UnknownComponent';
  }
}


function tokenize(string) {
  const tokens = [];
  let current = '';
  let index = 0;
  let acceptingWs = 0;

  while (index < string.length) {
    const char = string[index];

    if (char === '{' || char === '}') {
      if (current) {
        tokens.push(new Token('string', current));
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
        tokens.push(new Token('string', current));
        current = '';
      }
    } else {
      current += char;
    }
    index += 1;
  }

  if (current) {
    tokens.push(new Token('string', current));
  }

  return tokens;
}


function findValue(string) {
  if (/^-?\d+(\.\d+)?$/.test(string.trim())) {
    return {
      type: 'number',
      value: Number(string)
    };
  } else {
    return {
      type: 'string',
      value: string
    };
  }
}


function parseValue(tokens) {
  if (tokens.length === 0) {
    throw new SyntaxError('unexpected end of status, did you miss a closing bracket?');
  }

  const token = tokens.shift();

  if (token.type === 'string') {
    return findValue(token.value);
  } else if (token.type === '{') {
    const value = {
      type: 'function',
      name: tokens.shift().value,
      args: []
    };

    while (tokens.length > 0 && tokens[0].type !== '}') {
      value.args.push(parseValue(tokens));
    }

    if (tokens.length === 0) {
      parseValue(tokens);
    }

    tokens.shift();
    return value;
  } else if (token.type === '}') {
    throw new SyntaxError('unexpected closing bracket');
  }
}


function parse(tokens) {
  const ret = [];

  while (tokens.length > 0) {
    ret.push(parseValue(tokens));
  }

  return ret;
}


function assertAmount(args, amount = null) {
  if (amount !== null && args.length !== amount) {
    throw new SyntaxError(`expected ${amount} arguments, got ${args.length}`);
  }
}


function assertNumbers(args, amount) {
  assertAmount(args, amount);

  args.forEach(arg => {
    if (typeof arg !== 'number') {
      throw new InvalidArgType('expected a number or another component that results in a number');
    }
  });
}


function assertCategory(args) {
  assertAmount(args, 1);

  args.forEach(arg => {
    if (!categories.includes(arg)) {
      throw new InvalidArgType('expected a category');
    }
  })
}


function assertForum(args) {
  assertAmount(args, 1);

  args.forEach(arg => {
    if (!forums.hasOwnProperty(arg)) {
      throw new InvalidArgType('expected a forum');
    }
  })
}


function dataFromPath(data, path) {
  path = path.split('.');
  let current = data;

  for (let p of path) {
    if (current[p] === undefined) {
      throw new InvalidArgType('the requested data is not available for this user right now');

    }
    current = current[p];
  }

  return current;
}


export async function evaluate(parsed, data) {
  function evalVal(parsed) {
    if (parsed.type === 'number' || parsed.type === 'string') {
      return parsed.value;
    } else {
      const name = parsed.name;
      const args = parsed.args.map(arg => {
        const val = evalVal(arg);
        if (typeof val === 'string') {
          return val.toLowerCase();
        }
        return val;
      });

      switch (name) {
        // General
        case 'username':
        case 'id':
        case 'country':
        case 'status':
        case 'bio':
        case 'work':
          assertAmount(args, 0);
          return dataFromPath(data, name);
        case 'joke':
          assertAmount(args, 0);
          return data.joke;

        // Statistics
        case 'followers':
          assertAmount(args, 0);
          return dataFromPath(data, 'statistics.followers');
        case 'posts':
          if (args.length === 0) {
            return dataFromPath(data, 'forumData.counts.total.count');
          }
          assertForum(args);
          return dataFromPath(data, `forumData.counts.${forums[args[0]]}.count`);
        case 'rank':
          if (categories.includes(args[0])) {
            return dataFromPath(data, 'statistics.ranks.' + args[0]);
          } else {
            try {
              assertForum(args);
            } catch (e) {
              if (e instanceof InvalidArgType) {
                throw new InvalidArgType('expected a category or a forum');
              }
              throw e;
            }
            return dataFromPath(data, `forumData.counts.${forums[args[0]]}.rank`);
          }
        case 'stats':
          assertCategory(args);
          return dataFromPath(data, 'statistics.ranks.' + args[0]);

        // Math
        case 'add':
          assertNumbers(args);
          return args.reduce((a, b) => a + b);
        case 'sub':
          assertNumbers(args);
          return args.reduce((a, b) => a - b);
        case 'mul':
          assertNumbers(args);
          return args.reduce((a, b) => a * b);
        case 'div':
          assertNumbers(args);
          return args.reduce((a, b) => a / b);
        case 'pow':
          assertNumbers(args, 2);
          return Math.pow(args[0], args[1]);
        case 'root':
          assertNumbers(args, 2);
          return Math.pow(args[0], 1 / args[1]);
        case 'random':
          assertNumbers(args, 2);
          return Math.floor(Math.random() * (args[1] - args[0] + 1)) + args[0];
        case 'round':
          if (args.length === 1) {
            assertNumbers(args, 1);
            return Math.round(args[0]);
          }
          assertNumbers(args, 2);
          return Math.round((args[0] + Number.EPSILON) * (10 ** args[1])) / (10 ** args[1]);

        default:
          throw new UnknownComponent('unknown component: ' + name);
      }
    }
  }

  return parsed.map(evalVal).join('');
}


async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 5000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal
  });
  clearTimeout(id);
  return response;
}


export async function run(status, user) {
  try {
    let userData, forumData, joke;

    try {
      userData = await fetch('https://scratchdb.lefty.one/v3/user/info/' + user).then(res => res.json());
    } catch (e) {
      userData = {};
    }

    try {
      forumData = await fetch('https://scratchdb.lefty.one/v3/forum/user/info/' + user).then(res => res.json());
    } catch (e) {
      forumData = {};
    }

    try {
      joke = await fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&format=txt&type=single').then(res => res.text());
    } catch (e) {
      joke = '[joke couldn\'t be fetched]';
    }

    const data = {
      ...userData,
      forumData,
      joke
    };

    const result = await evaluate(parse(tokenize(status)), data);
    return result.replace(/\n/g, ' ');
  } catch (e) {
    return `[error] ${e.message}`;
  }
}