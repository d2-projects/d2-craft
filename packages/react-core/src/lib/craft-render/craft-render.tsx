import { createContext, ReactNode, ReactPropTypes, useContext, useMemo } from "react";
import { ExUnused, RootMeta } from '@d2-craft/typed'
import { useImmer } from "use-immer";
import { useCraftProvider } from "../craft-provider/craft-provider";
import { useCraftNode } from "../craft-node/craft-node";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CraftRenderProps {}

export const CraftRender: React.FC<CraftRenderProps> = () => {
  const { meta } = useCraftNode<ExUnused>()
  const { componentMap } = useCraftProvider()

  const Component = componentMap.get(meta.component)

  return Component ? <Component /> : null;
}

export default CraftRender;