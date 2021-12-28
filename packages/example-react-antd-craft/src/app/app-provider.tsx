import { useCraftNode } from '@d2-craft/react-core';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

export enum Mode {
  CREATIVE = 'CREATIVE',
  SURVIVAL = 'SURVIVAL',
}

const AppContext = createContext<{
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
  activeId: string | null;
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>;
}>({
  mode: Mode.SURVIVAL,
  setMode: () => undefined,
  activeId: null,
  setActiveId: () => undefined,
});

export const AppProvider: React.FC = (props) => {
  const [mode, setMode] = useState(Mode.SURVIVAL);
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <AppContext.Provider value={{ mode, setMode, activeId, setActiveId }}>
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

export const useAppActive = () => {
  const { activeId, setActiveId } = useContext(AppContext);

  const hasActive = Boolean(activeId);

  return {
    activeId,
    hasActive,
    setActiveId,
  };
};

export const useNodeActive = () => {
  const { activeId, setActiveId } = useContext(AppContext);
  const {
    meta: { __uid: currentId },
  } = useCraftNode();
  const { isCreative } = useAppProvider();

  const isActive = currentId === activeId;

  const triggerActive = useCallback(
    (targetId: string) => {
      setActiveId((lastId) => {
        if (targetId === lastId) return null;
        return targetId;
      });
    },
    [setActiveId]
  );

  const clickTrigger = useCallback(
    (event) => {
      if (isCreative) {
        triggerActive(currentId);
        event.stopPropagation();
      }
    },
    [currentId, isCreative, triggerActive]
  );

  return {
    isActive,
    clickTrigger,
  };
};
