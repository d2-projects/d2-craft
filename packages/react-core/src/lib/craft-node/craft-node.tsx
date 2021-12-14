import { createContext, useContext } from "react";
import { NodeMeta, exUnusedMeta } from "@d2-craft/typed";

export interface CraftNodeProps {
  meta: unknown
}

export const CraftNode: React.FC<CraftNodeProps> = (props) => {
  return (
    <CraftNodeContext.Provider value={{ __id: 'TODO', meta: props.meta }}>
      {props.children}
    </CraftNodeContext.Provider>
  );
}

export default CraftNode;

/* Context */

export const CraftNodeContext = createContext<{
  __id: string;
  meta: unknown
}>({
  __id: '',
  meta: exUnusedMeta as unknown
})

export const useCraftNode = <MetaType,>() => {
  const { meta, __id }  = useContext(CraftNodeContext)
  return { meta: meta as unknown as MetaType, __id }
}
