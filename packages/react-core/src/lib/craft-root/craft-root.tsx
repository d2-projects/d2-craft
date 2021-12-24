import { createContext, ReactNode, useContext, useMemo } from 'react';
import { RootMeta } from '@d2-craft/typed';
import { Updater, useImmer } from 'use-immer';
import { useCraftProvider } from '../craft-provider/craft-provider';

export interface CraftRootProps<ExtendableNodeMeta> {
  meta: RootMeta<ExtendableNodeMeta>;
  children?: ReactNode | undefined;
}

export function CraftRoot<
  ExtendableNodeMeta extends {
    children?: ExtendableNodeMeta[];
  }
>(props: CraftRootProps<ExtendableNodeMeta>) {
  const { uid } = useCraftProvider();

  const indexedRootMeta = useMemo(() => {
    type IndexedChildrenNodeMeta = ExtendableNodeMeta & {
      __uid: string;
      children?: IndexedChildrenNodeMeta[];
    };

    const it = (node: ExtendableNodeMeta): IndexedChildrenNodeMeta => ({
      ...node,
      __uid: uid(),
      children: node.children?.map(it),
    });

    type IndexedRootMeta = Omit<typeof props['meta'], 'children'> & {
      children: IndexedChildrenNodeMeta[];
    };

    const tree: IndexedRootMeta = {
      ...props.meta,
      children: props.meta.children.map(it),
    };

    return tree;
  }, [props.meta, uid]);

  const [meta, updater] = useImmer(indexedRootMeta);

  return (
    <CraftRootContext.Provider value={{ meta, updater }}>
      {props.children}
    </CraftRootContext.Provider>
  );
}

export default CraftRoot;

/* Context */

const CraftRootContext = createContext<{
  meta: unknown;
  updater: unknown;
}>({
  meta: {
    children: [],
  },
  updater: () => null,
});

export const useCraftRoot = <MetaType extends { children?: unknown[] }>() => {
  type NodeType = MetaType extends { children?: Array<infer R> } ? R : unknown;

  type IndexedChildrenNodeMeta = NodeType & {
    __uid: string;
    children?: IndexedChildrenNodeMeta[];
  };

  type IndexedRootMeta = Omit<MetaType, 'children'> & {
    children: IndexedChildrenNodeMeta[];
  };

  const context = useContext(CraftRootContext);
  const meta = context.meta as unknown as IndexedRootMeta;
  const updater = context.meta as unknown as Updater<IndexedRootMeta>;

  return { meta, updater };
};
