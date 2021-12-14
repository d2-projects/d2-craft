import { render } from '@testing-library/react';
import { ExUnused, NodeMeta, NodeMetaBase, RootMeta } from '@d2-craft/typed';
import { CraftProvider, CraftRoot, useCraftNode, makeComponentMap, CraftNode, useCraftProvider } from './index'
import React from 'react';

describe('React Core', () => {
  it('should render successfully', () => {

    // Example component A
    type ComponentMetaA = ExMeta<'A', { a: string }>;

    const ComponentA: React.FC = () => {
      const { meta } = useCraftNode<ComponentMetaA>()
      const { componentMap } = useCraftProvider()

      return (
        <div className="component-a">
          <b>Component A: { meta.config?.a }</b>
          <div className="component-a-children">
            {
              meta.children?.map((child, key) => {
                const Component = componentMap.get(child.component)
                return Component && (
                  <CraftNode meta={child} key={key}>
                    <Component />
                  </CraftNode>
                )
              })
            }
          </div>
        </div>
      )
    }

    // Example component B
    type ComponentMetaB = ExMeta<'B', { b: string }>

    const ComponentB: React.FC = () => {
      const { meta } = useCraftNode<ComponentMetaB>()
      const { componentMap } = useCraftProvider()

      return (
        <div className="component-b">
          <b>Component B: { meta.config?.b }</b>
          <div className="component-b-children">
            {
              meta.children?.map((child, key) => {
                const Component = componentMap.get(child.component)
                return Component && (
                  <CraftNode meta={child} key={key}>
                    <Component />
                  </CraftNode>
                )
              })
            }
          </div>
        </div>
      )
    }

    // Example component C
    type ComponentMetaC = ExMeta<'C', { c: string }>

    const ComponentC: React.FC = () => {
      const { meta } = useCraftNode<ComponentMetaC>()

      return (
        <div className="component-c">
          <b>Component C: { meta.config?.c }</b>
        </div>
      )
    }

    // Recursive components meta
    type ExMeta<N, C> = NodeMetaBase<N, C, NodeMeta<ExMetaTree>>
    type ExMetaTree<Ex = ExUnused> = NodeMeta< Ex
      | ComponentMetaA
      | ComponentMetaB
      | ComponentMetaC
    >

    // Components map
    const componentMap = makeComponentMap()
      .append<ComponentMetaA>('A', ComponentA)
      .append<ComponentMetaB>('B', ComponentB)
      .append<ComponentMetaC>('C', ComponentC)
      .value()

    // Example data
    const rootMeta: RootMeta<ExMetaTree> = {
      children: [{
        component: 'A',
        config: { a: '1' },
        children: [{
          component: 'B',
          config: { b: '2' },
          children: [{
            component: 'C',
            config: { c: '3' }
          }]
        }]
      }]
    }

    // Three layer construct
    const { baseElement } = render(
      <CraftProvider componentMap={componentMap}>
        <CraftRoot<ExMetaTree> meta={rootMeta}>
          <div className="craft-root">
            {rootMeta.children.map((child, key) => {
              const Component = componentMap.get(child.component)
              return Component && (
                <CraftNode meta={child} key={key}>
                  <Component />
                </CraftNode>
              )
            })}
          </div>
        </CraftRoot>
      </CraftProvider>
    );

    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot()
  });
});
