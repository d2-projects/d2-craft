import { useMemo } from 'react';
import { RootMeta } from '@d2-craft/typed';
import { componentMap, ExNodeMeta } from './craft-components/craft';

import styles from './app.module.scss';
import { CraftProvider, CraftRoot } from '@d2-craft/react-core';
import RootContainer from './craft-components/root-container/root-container';

// import { Route, Link } from 'react-router-dom';

export function App() {
  const initialRootMeta = useMemo(() => {
    const rootMeta: RootMeta<ExNodeMeta> = {
      children: [
        {
          component: 'GridContainer',
          children: [
            {
              component: 'PureText',
              config: {
                content: 'hello',
              },
            },
          ],
        },
      ],
    };
    return rootMeta;
  }, []);

  return (
    <div className={styles.app}>
      <CraftProvider componentMap={componentMap}>
        <CraftRoot<ExNodeMeta> meta={initialRootMeta}>
          <RootContainer />
        </CraftRoot>
      </CraftProvider>
    </div>
  );
}

export default App;
