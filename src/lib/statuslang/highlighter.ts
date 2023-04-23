import { lexer } from './lexer';
import MagicString from 'magic-string';

export function highlight(text: string, charsLeft?: boolean) {
  const tokens = lexer.tokenize(text).tokens;
  const s = new MagicString(text);
  let depth = 0;

  s.replace(/[<&]/g, (m) => (m === '<' ? '&lt;' : '&amp;'));

  for (const [i, token] of tokens.entries()) {
    const type = token.tokenType.name;
    const start = token.startOffset;
    const end = token.endOffset!;
    let className = '';

    switch (type) {
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
          className = 'text-slate-700 font-bold';
        } else {
          className = 'text-violet-700';
        }
        break;
    }

    if (type === 'LBrace') {
      depth++;
      if (depth === 1) {
        s.appendRight(
          start,
          '<span class="rounded shadow outline-dashed outline-1 outline-slate-400">'
        );
      }
    } else if (type === 'RBrace' && depth) {
      depth--;
      if (depth === 0) {
        s.appendRight(end + 1, '</span>');
      }
    }

    s.appendRight(start, `<span class="${className}">`);
    s.appendRight(end + 1, '</span>');
  }

  while (depth--) {
    s.append('</span>');
  }

  if (text.length && charsLeft) {
    s.append(` <span class="text-slate-300 text-sm">${200 - text.length} left</span>`);
  }

  return s.toString();
}
