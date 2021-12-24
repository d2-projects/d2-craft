import { useEffect } from 'react';
import { useCraftNode } from '../craft-node/craft-node';

/* eslint-disable-next-line */
export interface DefaultNotfoundProps {}

export const DefaultNotfound: React.FC<DefaultNotfoundProps> = () => {
  const { meta } = useCraftNode();

  useEffect(() => {
    console.warn(`Component ${meta.component} not found`)
  }, [meta.component])

  // TODO improve ui
  return (
    <div data-notfound-craft-uid={meta.__uid}>
      Component {meta.component} not found
    </div>
  );
}

export default DefaultNotfound;
