import { createToken, Lexer } from 'chevrotain';

export const Ident = createToken({
  name: 'Ident',
  pattern: /[a-zA-Z_]\w*/,
});

export const Bool = createToken({
  name: 'Bool',
  pattern: /true|false/,
  longer_alt: Ident,
});

export const String = createToken({
  name: 'String',
  pattern: /"([^"\\]|\\.)*"/,
});

export const Number = createToken({
  name: 'Number',
  pattern: /-?\d+(\.?\d+)?/,
});

export const LBrace = createToken({
  name: 'LBrace',
  pattern: /{/,
  push_mode: 'componentMode',
});

export const RBrace = createToken({
  name: 'RBrace',
  pattern: /}/,
  pop_mode: true,
});

export const WhiteSpace = createToken({
  name: 'WhiteSpace',
  pattern: /\s+/,
  group: Lexer.SKIPPED,
});

export const UnquotedString = createToken({
  name: 'UnquotedString',
  pattern: /[^{]+/,
});

export const modes = {
  modes: {
    toplevelMode: [RBrace, LBrace, UnquotedString],
    componentMode: [WhiteSpace, String, Number, Bool, Ident, LBrace, RBrace],
  },
  defaultMode: 'toplevelMode',
};

export const lexer = new Lexer(modes);

export function lex(text: string) {
  const lexingResult = lexer.tokenize(text);
  if (lexingResult.errors.length > 0) {
    throw new SyntaxError(lexingResult.errors[0].message);
  }
  return lexingResult.tokens;
}
