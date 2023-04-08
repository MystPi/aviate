import { lexer } from './lexer';
import MagicString from 'magic-string';

export function highlight(text: string) {
  const tokens = lexer.tokenize(text).tokens;
  const s = new MagicString(text);

  s.replace(/[<&]/g, (m) => (m === '<' ? '&lt;' : '&amp;'));

  for (const [i, token] of tokens.entries()) {
    let className = '';

    switch (token.tokenType.name) {
      case 'UnquotedString':
        className = 'text-slate-700';
        break;
      case 'LBrace':
      case 'RBrace':
        className = 'text-slate-400';
        break;
      case 'Number':
        className = 'text-teal-700';
        break;
      case 'String':
        className = 'text-violet-700';
        break;
      case 'Bool':
        className = 'text-blue-700';
        break;
      case 'Ident':
        if (tokens[i - 1]?.tokenType.name === 'LBrace') {
          className = 'text-slate-700 font-bold underline underline-offset-2 decoration-slate-200';
        } else {
          className = 'text-violet-700';
        }
        break;
    }
    s.appendRight(token.startOffset, `<span class="${className}">`);
    s.appendRight(token.endOffset! + 1, '</span>');
  }

  if (text.length) {
    s.append(` <span class="text-slate-300 text-sm">${200 - text.length} left</span>`);
  }

  return s.toString();
}
