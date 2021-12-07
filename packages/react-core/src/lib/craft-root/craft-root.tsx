import { RootMeta } from '@d2-craft/typed'

export interface CraftCoreProps<ExtendableNodeMeta> {
  meta: RootMeta<ExtendableNodeMeta>
}

export function CraftRoot<ExtendableNodeMeta>(props: CraftCoreProps<ExtendableNodeMeta>) {
  return (
    <div>
      <h1>Welcome to CraftRoot!</h1>
    </div>
  );
}

export default CraftRoot;
