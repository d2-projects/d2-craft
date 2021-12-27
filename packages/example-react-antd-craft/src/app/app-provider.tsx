import { createContext, useContext, useMemo, useState } from 'react';

export enum Mode {
  CREATIVE = 'CREATIVE',
  SURVIVAL = 'SURVIVAL',
}

const AppContext = createContext<{
  mode: Mode;
  setMode: (mode: Mode) => void;
}>({
  mode: Mode.SURVIVAL,
  setMode: () => undefined,
});

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppProviderProps {}

export const AppProvider: React.FC<AppProviderProps> = (props) => {
  const [mode, setMode] = useState(Mode.SURVIVAL);

  return (
    <AppContext.Provider value={{ mode, setMode }}>
      {props.children}
    </AppContext.Provider>
  );
};

export const useAppProvider = () => {
  const { mode, setMode } = useContext(AppContext);

  const { isCreative, toCreative, isSurvival, toSurvival } = useMemo(() => {
    const isCreative: boolean = mode === Mode.CREATIVE;
    const isSurvival: boolean = mode === Mode.SURVIVAL;

    const toCreative = () => setMode(Mode.CREATIVE);
    const toSurvival = () => setMode(Mode.SURVIVAL);

    return { isCreative, toCreative, isSurvival, toSurvival };
  }, [mode, setMode]);

  return {
    isCreative,
    toCreative,
    isSurvival,
    toSurvival,
  };
};
