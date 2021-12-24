import { ExUnused, NodeMeta, NodeMetaBase, RootMeta } from '.';

describe('typed', () => {
  it('should work', () => {
    type ExItem<N, C> = NodeMetaBase<N, C, NodeMeta<ExNodeMeta>>;
    type ExNodeMeta<Ex = ExUnused> = NodeMeta<
      Ex | ExItem<'A', { a: string }> | ExItem<'B', { b: string }>
    >;

    const testTree: RootMeta<ExNodeMeta> = {
      children: [
        {
          component: 'A',
          config: { a: '' },
          children: [
            {
              component: 'B',
              config: { b: '' },
              children: [
                {
                  component: 'A',
                },
              ],
            },
          ],
        },
      ],
    };

    expect(testTree).toBeTruthy();
  });
});
