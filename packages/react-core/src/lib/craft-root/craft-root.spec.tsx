import { NodeMeta, NodeMetaBase, RootMeta } from '@d2-craft/typed';
import { render } from '@testing-library/react';

import CraftRoot from './craft-root';

describe('CraftRoot', () => {
  it('should render successfully', () => {
    type ExItem<N, C> = NodeMetaBase<N, C, NodeMeta<ExNodeMeta>>
    type ExNodeMeta<Ex = null> = NodeMeta< Ex
      | ExItem<'A', { a: string }>
      | ExItem<'B', { b: string }>
    >

    const { baseElement } = render(
      <CraftRoot<ExNodeMeta>
        meta={{
          children: [{
            component: 'A',
            config: { a: '' },
            children: [{
              component: 'B',
              config: { b: '' },
              children: [{
                component: 'A'
              }]
            }]
          }]
        }}
      />
    );

    expect(baseElement).toBeTruthy();
  });
});
