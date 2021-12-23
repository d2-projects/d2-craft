import { ExUnused } from '@d2-craft/typed'
import { useCraftProvider } from "../craft-provider/craft-provider";
import { useCraftNode } from "../craft-node/craft-node";
import { ErrorBoundary } from 'react-error-boundary';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CraftRenderProps {}

export const CraftRender: React.FC<CraftRenderProps> = () => {
  const { meta } = useCraftNode<ExUnused>()
  const { componentMap, notfoundComponent, errorBoundaryComponent } = useCraftProvider()

  const Component = componentMap.get(meta.component) ?? notfoundComponent

  return Component ? (
    <ErrorBoundary FallbackComponent={errorBoundaryComponent}>
      <Component />
    </ErrorBoundary>
  ) : null;
}

export default CraftRender;
