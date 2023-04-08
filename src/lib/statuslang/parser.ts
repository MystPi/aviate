import { CstParser, type IToken } from 'chevrotain';
import { modes, Ident, Bool, String, Number, LBrace, RBrace, UnquotedString } from './lexer.js';

/*
  content
    : toplevel*

  toplevel
    : UnquotedString
    | component

  component
    : "{" Ident value* "}"

  value
    : String
    | Number
    | Bool
    | Ident
    | component
*/

class AviateParser extends CstParser {
  constructor() {
    super(modes);
    this.performSelfAnalysis();
  }

  content = this.RULE('content', () => {
    this.MANY(() => {
      this.SUBRULE(this.toplevel);
    });
  });

  toplevel = this.RULE('toplevel', () => {
    this.OR([
      { ALT: () => this.CONSUME(UnquotedString) },
      { ALT: () => this.SUBRULE(this.component) },
    ]);
  });

  component = this.RULE('component', () => {
    this.CONSUME(LBrace);
    this.CONSUME(Ident);
    this.MANY(() => {
      this.SUBRULE(this.value);
    });
    this.CONSUME(RBrace);
  });

  value = this.RULE('value', () => {
    this.OR([
      { ALT: () => this.CONSUME(String) },
      { ALT: () => this.CONSUME(Number) },
      { ALT: () => this.CONSUME(Bool) },
      { ALT: () => this.CONSUME(Ident) },
      { ALT: () => this.SUBRULE(this.component) },
    ]);
  });
}

export const parser = new AviateParser();
export const productions = parser.getGAstProductions();
export const BaseAviateVisitor = parser.getBaseCstVisitorConstructor();

export function parse(tokens: IToken[]) {
  parser.input = tokens;
  const cst = parser.content();
  if (parser.errors.length > 0) {
    throw new SyntaxError(parser.errors[0].message);
  }
  return cst;
}
