import { createContext, useContext } from 'react';
import { exUnusedMeta } from '@d2-craft/typed';

export interface CraftNodeProps {
  meta: unknown;
}

export const CraftNode: React.FC<CraftNodeProps> = (props) => {
  return (
    <CraftNodeContext.Provider value={{ meta: props.meta }}>
      {props.children}
    </CraftNodeContext.Provider>
  );
};

export default CraftNode;

/* Context */

const CraftNodeContext = createContext<{
  meta: unknown;
}>({
  meta: exUnusedMeta as unknown,
});

export function useCraftNode<MetaType extends { children?: unknown[] }>() {
  type NodeType = MetaType extends { children?: Array<infer R> } ? R : unknown;

  type IndexedChildrenNodeMeta = NodeType & {
    __uid: string;
    children?: IndexedChildrenNodeMeta[];
  };

  type IndexedNodeMeta = Omit<MetaType, 'children'> & {
    __uid: string;
    children?: IndexedChildrenNodeMeta[];
  };

  const meta = useContext(CraftNodeContext).meta as unknown as IndexedNodeMeta;

  return { meta };
}
