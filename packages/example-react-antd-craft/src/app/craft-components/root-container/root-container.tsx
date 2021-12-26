import { CraftNode, CraftRender, useCraftRoot } from '@d2-craft/react-core';
import { ExNodeMeta } from '../craft';

const RootContainer: React.FC = () => {
  const { meta } = useCraftRoot<ExNodeMeta>();

  return (
    <div>
      {meta.children.map((child) => (
        <CraftNode meta={child} key={child.__uid}>
          <CraftRender />
        </CraftNode>
      ))}
    </div>
  );
};

export default RootContainer;
