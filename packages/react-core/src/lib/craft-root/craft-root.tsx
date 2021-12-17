import { createContext, ReactNode, ReactPropTypes, useContext, useMemo } from "react";
import { RootMeta } from '@d2-craft/typed'
import { useImmer } from "use-immer";
import { useCraftProvider } from "../craft-provider/craft-provider";

export interface CraftRootProps<ExtendableNodeMeta> {
  meta: RootMeta<ExtendableNodeMeta>;
  children?: ReactNode | undefined;
}

export function CraftRoot<ExtendableNodeMeta>(props: CraftRootProps<ExtendableNodeMeta>) {
  const { indexTree } = useCraftProvider()
  const innerMeta = useMemo(() => indexTree(props.meta), [indexTree, props.meta])

  useImmer(innerMeta)

  return (
    <CraftRootContext.Provider value={{ meta: props.meta }}>
      {props.children}
    </CraftRootContext.Provider>
  );
}

export default CraftRoot;

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


