import type { CstNode } from 'chevrotain';
import type { ComponentAstNode, AstNode, ValueAstNode } from './parser_ast.js';
import type {
  ComponentCstChildren,
  ContentCstChildren,
  ToplevelCstChildren,
  ValueCstChildren,
} from './parser_cst.js';
import { BaseAviateVisitor } from './parser.js';

class AviateVisitor extends BaseAviateVisitor {
  constructor() {
    super();
    this.validateVisitor();
  }

  visitAll(nodes: CstNode[] | undefined) {
    return nodes?.map((x) => this.visit(x)) ?? [];
  }

  content(ctx: ContentCstChildren): AstNode[] {
    return this.visitAll(ctx.toplevel);
  }

  toplevel(ctx: ToplevelCstChildren): AstNode {
    if (ctx.UnquotedString) {
      return {
        type: 'value',
        value: ctx.UnquotedString[0].image,
      };
    } else if (ctx.component) {
      return this.visit(ctx.component);
    }
    throw 'unreachable';
  }

  component(ctx: ComponentCstChildren): ComponentAstNode {
    const name = ctx.Ident[0].image;
    const args = this.visitAll(ctx.value);

    return {
      type: 'component',
      name,
      args,
    };
  }

  value(ctx: ValueCstChildren): ValueAstNode {
    let value: string | number | boolean = '';

    if (ctx.String) {
      value = ctx.String[0].image.slice(1, -1);
    } else if (ctx.Number) {
      value = +ctx.Number[0].image;
    } else if (ctx.Bool) {
      value = ctx.Bool[0].image === 'true';
    } else if (ctx.Ident) {
      value = ctx.Ident[0].image;
    } else if (ctx.component) {
      return this.visit(ctx.component);
    }

    return {
      type: 'value',
      value,
    };
  }
}

export const visitor = new AviateVisitor();
