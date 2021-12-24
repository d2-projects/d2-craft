import React, { createContext, useContext, useMemo } from 'react';
import { FallbackProps } from 'react-error-boundary';
import { DefaultErrorBoundary } from '../default-error-boundary/default-error-boundary';

/* Context */

const CraftContext = createContext<{
  uid: () => string;
  componentMap: Map<string, React.ComponentType>;
  notfoundComponent?: React.ComponentType;
  errorBoundaryComponent: React.ComponentType<FallbackProps>;
}>({
  uid: () => '',
  componentMap: new Map(),
  errorBoundaryComponent: DefaultErrorBoundary,
});

export const useCraftProvider = () => useContext(CraftContext);

export interface CraftProviderProps {
  componentMap: Map<string, React.ComponentType>;
  notfoundComponent?: React.ComponentType;
  errorBoundaryComponent?: React.ComponentType<FallbackProps>;
}

export const CraftProvider: React.FC<CraftProviderProps> = (props) => {
  const uid = useMemo(() => {
    let uidIndex = 0;
    const uid = () => String(uidIndex++);
    return uid;
  }, []);

  return (
    <CraftContext.Provider
      value={{
        uid,
        componentMap: props.componentMap,
        notfoundComponent: props.notfoundComponent,
        errorBoundaryComponent:
          props.errorBoundaryComponent ?? DefaultErrorBoundary,
      }}
    >
      {props.children}
    </CraftContext.Provider>
  );
};

export default CraftProvider;

/* Utils */

export const makeComponentMap = () => {
  const componentMap = new Map<string, React.ComponentType>();

  const self = {
    value: () => componentMap,
    append: <M extends { component: string }>(
      name: M['component'],
      fc: React.ComponentType
    ) => {
      componentMap.set(name, fc);
      return self;
    },
  };

  return self;
};
