import { createContext, useContext } from "react";
import { NodeMeta, exUnusedMeta } from "@d2-craft/typed";

export interface CraftNodeProps {
  meta: unknown
}

export const CraftNode: React.FC<CraftNodeProps> = (props) => {
  return (
    <CraftNodeContext.Provider value={{ meta: props.meta }}>
      {props.children}
    </CraftNodeContext.Provider>
  );
}

export default CraftNode;

/* Context */

export const CraftNodeContext = createContext<{
  meta: unknown
}>({
  meta: exUnusedMeta as unknown
})

export const useCraftNode = <MetaType,>() => {
  const { meta }  = useContext(CraftNodeContext)
  return { meta: meta as unknown as MetaType & { __uid: string } }
}
