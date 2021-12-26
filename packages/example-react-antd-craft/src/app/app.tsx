import { useMemo } from 'react';
import { RootMeta } from '@d2-craft/typed';
import { CraftProvider, CraftRoot } from '@d2-craft/react-core';
import { componentMap, ExNodeMeta } from './craft-components/craft';
import RootContainer from './craft-components/root-container/root-container';

import styles from './app.module.scss';

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
      {/* <aside>TODO</aside> */}
      <main>
        <CraftProvider componentMap={componentMap}>
          <CraftRoot<ExNodeMeta> meta={initialRootMeta}>
            <RootContainer />
          </CraftRoot>
        </CraftProvider>
      </main>
    </div>
  );
}

export default App;
