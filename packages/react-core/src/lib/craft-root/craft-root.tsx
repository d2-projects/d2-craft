import { createContext, ReactNode, useContext, useMemo } from "react";
import { RootMeta } from '@d2-craft/typed'
import { useImmer } from "use-immer";
import { useCraftProvider } from "../craft-provider/craft-provider";

export interface CraftRootProps<ExtendableNodeMeta> {
  meta: RootMeta<ExtendableNodeMeta>;
  children: (rootMeta: RootMeta<ExtendableNodeMeta & { __uid: string }>) => ReactNode;
}

export function CraftRoot<ExtendableNodeMeta>(props: CraftRootProps<ExtendableNodeMeta>) {
  const { uid } = useCraftProvider()
  const indexedMeta = useMemo(() => indexTree<ExtendableNodeMeta>(props.meta, uid), [props.meta, uid])

  useImmer(indexedMeta)

  return (
    <CraftRootContext.Provider value={{ meta: indexedMeta }}>
      {props.children(indexedMeta)}
    </CraftRootContext.Provider>
  );
}

export default CraftRoot;

/* Self utils */

const indexTree =  <X extends { children?: X[] },>(
  i: RootMeta<X>,
  uidGenerator: () => string
): RootMeta<X & { __uid: string }> => {

  const it = (node: X): X => ({
    ...node,
    __uid: uidGenerator(),
    children: node.children?.map(it)
  })

  const tree = { ...i, children: i.children.map(it) }

  return tree as RootMeta<X & { __uid: string }>
}

/* Context */

export const CraftRootContext = createContext<{
  meta: unknown
}>({
  meta: {
    children: []
  }
})

export const useCraftRoot = () => {
  return useContext(CraftRootContext)
}
