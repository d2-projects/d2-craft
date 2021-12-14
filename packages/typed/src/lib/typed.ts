export interface NodeMetaBase<Name, Config, _NodeMeta> {
  component: Name,
  config?: Config
  children?: _NodeMeta[]
}

/**
 * Don't use it
 */
export type ExUnused = { component: '_' }
export const exUnusedMeta: ExUnused = { component: '_' }

export type NodeMeta<Ex = ExUnused> = Ex

/**
 * @example
 *
 *   type ExItem<N, C> = NodeMetaBase<N, C, NodeMeta<ExNodeMeta>>
 *   type ExNodeMeta<Ex = ExUnused> = NodeMeta< Ex
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
export interface RootMeta<ExtendableNodeMeta = null> {
  children: ExtendableNodeMeta[]
}
