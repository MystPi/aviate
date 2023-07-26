export type AstNode = LiteralAstNode | ComponentAstNode;

export type ValueAstNode = LiteralAstNode | ComponentAstNode;

export interface ComponentAstNode {
  type: 'component';
  name: string;
  args: ValueAstNode[];
}

export type LiteralType = string | number | boolean;

export interface LiteralAstNode {
  type: 'value';
  value: LiteralType;
}
