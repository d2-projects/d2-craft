import React, { createContext, useCallback, useContext, useMemo } from "react";

let uidIndex = 0
const uid = () => String(uidIndex++)
const indexTree = (i: any) => i // TODO

/* Context */

const CraftContext = createContext<{
  uid: () => string
  indexTree: (i: any) => any // TODO
  componentMap: Map<string, React.ComponentType>
}>({ uid, indexTree, componentMap: new Map() })

export const useCraftProvider = () => useContext(CraftContext)

export interface CraftProviderProps {
  componentMap: Map<string, React.ComponentType>
}

export const CraftProvider: React.FC<CraftProviderProps> = (props) => {

  const value = useMemo(() =>  ({
    uid,
    indexTree,
    componentMap: props.componentMap
  }), [props.componentMap])

  return (
    <CraftContext.Provider value={value}>
      {props.children}
    </CraftContext.Provider>
  );
}

export default CraftProvider;

/* Utils */

export const makeComponentMap = () => {
  const componentMap = new Map<string, React.ComponentType>()

  const self = {
    value: () => componentMap,
    append: <M extends { component: string },>(name: M['component'], fc: React.ComponentType) => {
      componentMap.set(name, fc)
      return self
    }
  }

  return self
}
