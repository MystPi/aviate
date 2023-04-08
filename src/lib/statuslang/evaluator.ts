import { ComponentNotFoundError, InvalidArgumentError } from './errors';
import type { AstNode, ComponentAstNode, LiteralType, ValueAstNode } from './parser_ast';

type MaybePromise<T> = T | Promise<T>;

type Component<S> = {
  args: string[] | null;
  description: string;
} & (
  | {
      control?: false;
      func: (args: LiteralType[], state: S) => MaybePromise<LiteralType>;
    }
  | {
      control: true;
      func: (args: ValueAstNode[], ctx: Evaluator<S>, state: S) => MaybePromise<LiteralType>;
    }
);

export type Components<S> = Record<string, Component<S>>;

export class Evaluator<S> {
  private readonly components: Components<S>;
  private state: S;

  constructor(components: Components<S>, state: S) {
    this.components = components;
    this.state = state;
  }

  async evalNodesToString(nodes: AstNode[]) {
    const evaledNodes = await this.evalNodes(nodes);
    return evaledNodes.join('');
  }

  async evalNodes(nodes: AstNode[]) {
    return Promise.all(nodes.map((node) => this.evalNode(node)));
  }

  async evalNode(node: AstNode) {
    if (node.type === 'value') {
      return node.value;
    } else {
      return this.evalComponent(node);
    }
  }

  async evalComponent(node: ComponentAstNode): Promise<LiteralType> {
    const component = this.components[node.name];

    if (!component) {
      throw new ComponentNotFoundError(`Component '${node.name}' not found`);
    }

    if (component.args && component.args.length !== node.args.length) {
      throw new InvalidArgumentError(
        `Component '${node.name}' was given wrong number of arguments`
      );
    }

    if (component.control) {
      return component.func(node.args, this, this.state);
    }

    const args = await this.evalNodes(node.args);
    return component.func(args, this.state);
  }
}
