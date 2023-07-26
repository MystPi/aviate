import type { CstNode, ICstVisitor, IToken } from 'chevrotain';

export interface ContentCstNode extends CstNode {
  name: 'content';
  children: ContentCstChildren;
}

export type ContentCstChildren = {
  toplevel?: ToplevelCstNode[];
};

export interface ToplevelCstNode extends CstNode {
  name: 'toplevel';
  children: ToplevelCstChildren;
}

export type ToplevelCstChildren = {
  UnquotedString?: IToken[];
  component?: ComponentCstNode[];
};

export interface ComponentCstNode extends CstNode {
  name: 'component';
  children: ComponentCstChildren;
}

export type ComponentCstChildren = {
  LBrace: IToken[];
  Ident: IToken[];
  value?: ValueCstNode[];
  RBrace: IToken[];
};

export interface ValueCstNode extends CstNode {
  name: 'value';
  children: ValueCstChildren;
}

export type ValueCstChildren = {
  String?: IToken[];
  Number?: IToken[];
  Bool?: IToken[];
  Ident?: IToken[];
  component?: ComponentCstNode[];
};

export interface ICstNodeVisitor<IN, OUT> extends ICstVisitor<IN, OUT> {
  content(children: ContentCstChildren, param?: IN): OUT;
  toplevel(children: ToplevelCstChildren, param?: IN): OUT;
  component(children: ComponentCstChildren, param?: IN): OUT;
  value(children: ValueCstChildren, param?: IN): OUT;
}
