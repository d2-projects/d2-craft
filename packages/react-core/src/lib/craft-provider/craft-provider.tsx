import { createContext, useCallback, useContext, useMemo } from "react";

let uidIndex = 0
const uid = () => String(uidIndex++)

/* Context */

const CraftContext = createContext<{
  uid: () => string
}>({ uid })

export const useCraftContext = () => useContext(CraftContext)

/* eslint-disable-next-line */
export interface CraftProviderProps {}

export const CraftProvider: React.FC<CraftProviderProps> = (props) => {

  const value = useMemo(() =>  ({ uid }), [])

  return (
    <CraftContext.Provider value={value}>
      {props.children}
    </CraftContext.Provider>
  );
}

export default CraftProvider;
