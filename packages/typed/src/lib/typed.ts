export interface NodeMetaBase<Name, Config, _NodeMeta> {
  component: Name,
  config?: Config
  children?: _NodeMeta[]
}

export type NodeMeta<Ex = null> = Ex

/**
 * @example
 *
 *   type ExItem<N, C> = NodeMetaBase<N, C, NodeMeta<ExNodeMeta>>
 *   type ExNodeMeta<Ex = null> = NodeMeta< Ex
 *     | ExItem<'A', { a: string }>
 *     | ExItem<'B', { b: string }>
 *   >
 *
 *   const testTree: RootMeta<ExNodeMeta> = {
 *     children: [{
 *       component: 'A',
 *       config: { a: '' },
 *       children: [{
 *         component: 'B',
 *         config: { b: '' },
 *         children: [{
 *           component: 'A'
 *         }]
 *       }]
 *     }]
 *   }
 */
export interface RootMeta<ExtendableNodeMeta> {
  children: ExtendableNodeMeta[]
}
