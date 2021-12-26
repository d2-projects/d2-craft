import { CraftNode, CraftRender, useCraftNode } from '@d2-craft/react-core';
import { ExItem } from '../craft';

export interface GridContainerConfig {
  align?: 'top' | 'middle' | 'bottom';
}

export type GridContainerMeta = ExItem<'GridContainer', GridContainerConfig>;

const GridContainer: React.FC = () => {
  const { meta } = useCraftNode<GridContainerMeta>();

  return (
    <div>
      {meta.children?.map((child) => (
        <CraftNode meta={child} key={child.__uid}>
          <CraftRender />
        </CraftNode>
      ))}
    </div>
  );
};

export default GridContainer;
