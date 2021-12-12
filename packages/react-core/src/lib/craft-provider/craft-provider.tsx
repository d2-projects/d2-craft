import { createContext, useCallback, useContext, useMemo } from "react";

/* Context */

const CraftContext = createContext<{
  uid: () => string
}>({
  uid: () => ''
})

export const useCraftContext = () => {
  return useContext(CraftContext)
}

/* eslint-disable-next-line */
export interface CraftProviderProps {}

export const CraftProvider: React.FC<CraftProviderProps> = (props) => {

  const uid = useCallback(() => {
    return ''
  }, [])

  const value = useMemo(() => {
    return { uid }
  }, [uid])

  return (
    <CraftContext.Provider value={value}>
      {props.children}
    </CraftContext.Provider>
  );
}

export default CraftProvider;
