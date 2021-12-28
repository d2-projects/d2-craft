import { CraftNode, CraftRender, useCraftNode } from '@d2-craft/react-core';
import { useContainerNodeSkeleton } from '../../skeleton';
import { useNodeActive } from '../../app-provider';
import { ExItem } from '../craft';

export interface GridContainerConfig {
  align?: 'top' | 'middle' | 'bottom';
}

export type GridContainerMeta = ExItem<'GridContainer', GridContainerConfig>;

const GridContainer: React.FC = () => {
  const { meta } = useCraftNode<GridContainerMeta>();
  const { className } = useContainerNodeSkeleton();
  const { clickTrigger } = useNodeActive();

  return (
    <div
      className={className}
      onClick={clickTrigger}
    >
      {meta.children?.map((child) => (
        <div key={child.__uid}>
          <CraftNode meta={child} key={child.__uid}>
            <CraftRender />
          </CraftNode>
        </div>
      ))}
    </div>
  );
};

export default GridContainer;
