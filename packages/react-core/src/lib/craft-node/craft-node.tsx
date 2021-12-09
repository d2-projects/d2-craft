import { createContext, useContext } from "react";
import { NodeMeta } from "@d2-craft/typed";

export interface CraftNodeProps<ExtendableNodeMeta> {
  meta: NodeMeta<ExtendableNodeMeta>
}

export function CraftNode<ExtendableNodeMeta>(props: CraftNodeProps<ExtendableNodeMeta>) {
  return (
    <div>
      <h1>Welcome to CraftNode!</h1>
    </div>
  );
}

export default CraftNode;

/* Context */

export const CraftNodeContext = createContext<{
  __id: string;
  meta: NodeMeta
}>({
  __id: '',
  meta: null
})

export const useCraftNodeContext = () => {
  return useContext(CraftNodeContext)
}
