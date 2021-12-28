import { Route } from 'react-router-dom';
import classNames from 'classnames';
import { CraftProvider } from '@d2-craft/react-core';
import { componentMap } from './craft-components/craft';
import { AppProvider, useNodeActive, useAppProvider, useAppActive } from './app-provider';
import HomePage from './pages/home/home';

import styles from './app.module.scss';

export const App: React.FC = () => {
  return (
    <CraftProvider componentMap={componentMap}>
      <AppProvider>
        <AppWorkspace>
          <Route path="/" exact component={HomePage} />
        </AppWorkspace>
      </AppProvider>
    </CraftProvider>
  );
};

const AppWorkspace: React.FC = (props) => {
  const { isCreative } = useAppProvider();
  const { hasActive } = useAppActive();

  const showAside = isCreative && hasActive;

  return (
    <div
      className={classNames(styles.app, {
        [styles.show]: showAside,
      })}
    >
      {showAside && <aside className={styles.aside}>TODO</aside>}
      <main className={styles.main}>{props.children}</main>
    </div>
  );
};

export default App;
