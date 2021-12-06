export function typed(): string {
  return 'typed';
}

interface NodeMetaBase<Name extends string, Config, _NodeMeta> {
  component: Name,
  config?: Config
  children?: _NodeMeta[]
}

export interface RootMeta<_NodeMeta> {
  version: string;
  children: _NodeMeta[]
}

type NodeMeta<Ex = null>
  = NodeMetaBase<'A', { a: string }, NodeMeta<Ex>>
  | NodeMetaBase<'B', { b: string }, NodeMeta<Ex>>
  | NodeMetaBase<'C', { c: string }, NodeMeta<Ex>>
  | Ex

// extends
type ExNodeMeta<Ex = null> = NodeMeta<
    NodeMetaBase<'E', { e: string }, NodeMeta<ExNodeMeta>>
  | NodeMetaBase<'F', { f: string }, NodeMeta<ExNodeMeta>>
  | Ex
>

// extends align
type ExxNodeMeta = ExNodeMeta<
    NodeMetaBase<'X', { x: string }, NodeMeta<ExxNodeMeta>>
  | NodeMetaBase<'Y', { y: string }, NodeMeta<ExxNodeMeta>>
>

export const testTree: RootMeta<ExxNodeMeta> = {
  version: '1',
  children: [{
    component: 'A',
    config: { a: 'asd' },
    children: [
      {component: 'B', config: {b: 'b'}, children: [
        {component: 'C', config: { c: 'c' }},
        {component: 'E', children: [
          { component: 'B' },
          { component: 'A', children: [{ component: 'E' }]}
        ]}
      ]}
    ]
  }, {
    component: 'X',
    config: { x: '' },
    children: [{ component: 'A' }]
  }]
}
