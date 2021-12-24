import { FallbackProps } from 'react-error-boundary';
import { useCraftNode } from '../craft-node/craft-node';
import './default-error-boundary.module.scss';

export const DefaultErrorBoundary: React.FC<FallbackProps> = () => {
  const { meta } = useCraftNode();

  // TODO improve ui
  return <div data-error-craft-uid={meta.__uid}>RENDER ERROR</div>;
};

export default DefaultErrorBoundary;
