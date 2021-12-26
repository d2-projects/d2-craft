import { useCraftNode } from '@d2-craft/react-core';
import { ExItem } from '../craft';

export interface PureTextConfig {
  content?: string;
}

export type PureTextMeta = ExItem<'PureText', PureTextConfig>;

const PureText: React.FC = () => {
  const { meta } = useCraftNode<PureTextMeta>();

  return (
    <div>{meta.config?.content}</div>
  );
};

export default PureText;
