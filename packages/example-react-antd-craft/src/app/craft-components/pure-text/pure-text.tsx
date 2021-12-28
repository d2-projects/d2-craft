import { useCraftNode } from '@d2-craft/react-core';
import { useNodeActive } from '../../app-provider';
import { useBlockNodeSkeleton } from '../../skeleton';
import { ExItem } from '../craft';

export interface PureTextConfig {
  content?: string;
}

export type PureTextMeta = ExItem<'PureText', PureTextConfig>;

const PureText: React.FC = () => {
  const { meta } = useCraftNode<PureTextMeta>();
  const { className } = useBlockNodeSkeleton();
  const { clickTrigger } = useNodeActive();

  return (
    <div className={className} onClick={clickTrigger}>
      {meta.config?.content}
    </div>
  );
};

export default PureText;
