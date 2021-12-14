import { createContext, PropsWithChildren, ReactNode, ReactPropTypes, useContext } from "react";
import { RootMeta } from '@d2-craft/typed'

export interface CraftRootProps<ExtendableNodeMeta> {
  meta: RootMeta<ExtendableNodeMeta>;
  children?: ReactNode | undefined;
}

export function CraftRoot<ExtendableNodeMeta>(props: CraftRootProps<ExtendableNodeMeta>) {
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
