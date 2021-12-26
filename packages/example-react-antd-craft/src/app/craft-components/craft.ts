import { makeComponentMap } from '@d2-craft/react-core';
import { ExUnused, NodeMeta, NodeMetaBase } from '@d2-craft/typed';
import GridContainer, {
  GridContainerMeta,
} from './grid-container/grid-container';
import PureText, { PureTextMeta } from './pure-text/pure-text';

// Recursive components meta
export type ExItem<N, C = Record<string, never>> = NodeMetaBase<
  N,
  C,
  NodeMeta<ExNodeMeta>
>;
export type ExNodeMeta<Ex = ExUnused> = NodeMeta<
  Ex | GridContainerMeta | PureTextMeta
>;

// Components map
export const componentMap = makeComponentMap()
  .append<GridContainerMeta>('GridContainer', GridContainer)
  .append<PureTextMeta>('PureText', PureText)
  .value();
