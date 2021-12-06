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

type NodeMeta
  = NodeMetaBase<'A', { a: string }, NodeMeta>
  | NodeMetaBase<'B', { b: string }, NodeMeta>
  | NodeMetaBase<'C', { c: string }, NodeMeta>

export const testTree: RootMeta<NodeMeta> = {
  version: '1',
  children: [{
    component: 'A',
    config: {
      a: 'asd'
    },
    children: [
      {component: 'B', config: {b: 'b'}, children: [
        {component: 'C', config: {
          c: 'c'
        }}
      ]}
    ]
  }]
}
