import { act, fireEvent, render } from '@testing-library/react';
import { ExUnused, NodeMeta, NodeMetaBase, RootMeta } from '@d2-craft/typed';
import {
  CraftProvider,
  CraftRoot,
  useCraftNode,
  makeComponentMap,
  CraftNode,
  CraftRender,
  useCraftRoot,
  dummyUid,
  dummyUpdater,
} from './index';
import React from 'react';

describe('React Core', () => {
  it('should render successfully', () => {
    // Example component A
    type ComponentMetaA = ExItem<'A', { a: string }>;

    const ComponentA: React.FC = () => {
      const { meta } = useCraftNode<ComponentMetaA>();

      return (
        <div className="component-a" data-craft-uid={meta.__uid}>
          <b>Component A: {meta.config?.a}</b>
          <div className="component-a-children">
            {meta.children?.map((child) => (
              <CraftNode meta={child} key={child.__uid}>
                <CraftRender />
              </CraftNode>
            ))}
          </div>
        </div>
      );
    };

    // Example component B
    type ComponentMetaB = ExItem<'B', { b: string }>;

    const ComponentB: React.FC = () => {
      const { meta } = useCraftNode<ComponentMetaB>();

      return (
        <div className="component-b" data-craft-uid={meta.__uid}>
          <b>Component B: {meta.config?.b}</b>
          <div className="component-b-children">
            {meta.children?.map((child) => (
              <CraftNode meta={child} key={child.__uid}>
                <CraftRender />
              </CraftNode>
            ))}
          </div>
        </div>
      );
    };

    // Example component C
    type ComponentMetaC = ExItem<'C', { c: string }>;

    const ComponentC: React.FC = () => {
      const { meta } = useCraftNode<ComponentMetaC>();

      return (
        <div className="component-c" data-craft-uid={meta.__uid}>
          <b>Component C: {meta.config?.c}</b>
        </div>
      );
    };

    // Recursive components meta
    type ExItem<N, C = Record<string, never>> = NodeMetaBase<
      N,
      C,
      NodeMeta<ExNodeMeta>
    >;
    type ExNodeMeta<Ex = ExUnused> = NodeMeta<
      Ex | ComponentMetaA | ComponentMetaB | ComponentMetaC
    >;

    // Components map
    const componentMap = makeComponentMap()
      .append<ComponentMetaA>('A', ComponentA)
      .append<ComponentMetaB>('B', ComponentB)
      .append<ComponentMetaC>('C', ComponentC)
      .value();

    // Example data
    const rootMeta: RootMeta<ExNodeMeta> = {
      children: [
        {
          component: 'A',
          config: { a: '1' },
          children: [
            {
              component: 'B',
              config: { b: '2' },
              children: [
                {
                  component: 'C',
                  config: { c: '3' },
                },
              ],
            },
          ],
        },
      ],
    };

    // Root Component
    const RootComponent: React.FC = () => {
      const { meta } = useCraftRoot<ExNodeMeta>();

      return (
        <div className="craft-root">
          {meta.children.map((child) => (
            <CraftNode meta={child} key={child.__uid}>
              <CraftRender />
            </CraftNode>
          ))}
        </div>
      );
    };

    // Three layer construct
    const { baseElement } = render(
      <CraftProvider componentMap={componentMap}>
        <CraftRoot<ExNodeMeta> meta={rootMeta}>
          <RootComponent />
        </CraftRoot>
      </CraftProvider>
    );

    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it('should render container and children with item wrapper', () => {
    // Example container component
    type FlexContainerMeta = ExItem<'FlexContainer'>;

    const FlexContainer: React.FC = () => {
      const { meta } = useCraftNode<FlexContainerMeta>();

      return (
        <div className="flex-container" data-craft-uid={meta.__uid}>
          {meta.children?.map((child) => (
            <div
              className="flex-container-item"
              data-item-uid={child.__uid}
              key={child.__uid}
            >
              <CraftNode meta={child}>
                <CraftRender />
              </CraftNode>
            </div>
          ))}
        </div>
      );
    };

    // Example component text
    type TextMeta = ExItem<'Text', { content: string }>;

    const Text: React.FC = () => {
      const { meta } = useCraftNode<TextMeta>();

      return (
        <div className="text" data-craft-uid={meta.__uid}>
          <b>{meta.config?.content}</b>
        </div>
      );
    };

    // Recursive components meta
    type ExItem<N, C = Record<string, never>> = NodeMetaBase<
      N,
      C,
      NodeMeta<ExNodeMeta>
    >;
    type ExNodeMeta<Ex = ExUnused> = NodeMeta<
      Ex | FlexContainerMeta | TextMeta
    >;

    // Components map
    const componentMap = makeComponentMap()
      .append<FlexContainerMeta>('FlexContainer', FlexContainer)
      .append<TextMeta>('Text', Text)
      .value();

    // Example data
    const rootMeta: RootMeta<ExNodeMeta> = {
      children: [
        {
          component: 'FlexContainer',
          children: [
            {
              component: 'Text',
              config: { content: 'Hello' },
            },
          ],
        },
      ],
    };

    // Root Component
    const RootComponent: React.FC = () => {
      const { meta } = useCraftRoot<ExNodeMeta>();

      return (
        <div className="craft-root">
          {meta.children.map((child) => (
            <CraftNode meta={child} key={child.__uid}>
              <CraftRender />
            </CraftNode>
          ))}
        </div>
      );
    };

    // Three layer construct
    const { baseElement } = render(
      <CraftProvider componentMap={componentMap}>
        <CraftRoot<ExNodeMeta> meta={rootMeta}>
          <RootComponent />
        </CraftRoot>
      </CraftProvider>
    );

    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it('should render default error boundary component', () => {
    // Example component text
    type TextMeta = ExItem<'Text', { content: string }>;

    const Text: React.FC = () => {
      const { meta } = useCraftNode<TextMeta>();

      const right = 2 === 1 + 1;
      if (right) {
        throw new Error('Ops!');
      }

      return (
        <div className="text" data-craft-uid={meta.__uid}>
          <b>{meta.config?.content}</b>
        </div>
      );
    };

    // Recursive components meta
    type ExItem<N, C = Record<string, never>> = NodeMetaBase<
      N,
      C,
      NodeMeta<ExNodeMeta>
    >;
    type ExNodeMeta<Ex = ExUnused> = NodeMeta<Ex | TextMeta>;

    // Components map
    const componentMap = makeComponentMap()
      .append<TextMeta>('Text', Text)
      .value();

    // Example data
    const rootMeta: RootMeta<ExNodeMeta> = {
      children: [
        {
          component: 'Text',
          config: { content: 'Hello' },
        },
      ],
    };

    // Root Component
    const RootComponent: React.FC = () => {
      const { meta } = useCraftRoot<ExNodeMeta>();

      return (
        <div className="craft-root">
          {meta.children.map((child) => (
            <CraftNode meta={child} key={child.__uid}>
              <CraftRender />
            </CraftNode>
          ))}
        </div>
      );
    };

    // Mock console
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const consoleError = console.error as jest.Mock<void, unknown[]>;

    // Three layer construct
    const { baseElement } = render(
      <CraftProvider componentMap={componentMap}>
        <CraftRoot<ExNodeMeta> meta={rootMeta}>
          <RootComponent />
        </CraftRoot>
      </CraftProvider>
    );

    expect(consoleError).toHaveBeenCalledTimes(2);
    consoleError.mockClear();

    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it('should render default notfound component', () => {
    // Example component text
    type TextMeta = ExItem<'Text', { content: string }>;

    const Text: React.FC = () => {
      const { meta } = useCraftNode<TextMeta>();

      return (
        <div className="text" data-craft-uid={meta.__uid}>
          <b>{meta.config?.content}</b>
        </div>
      );
    };

    // Recursive components meta
    type ExItem<N, C = Record<string, never>> = NodeMetaBase<
      N,
      C,
      NodeMeta<ExNodeMeta>
    >;
    type ExNodeMeta<Ex = ExUnused> = NodeMeta<Ex | TextMeta>;

    // Components map
    const componentMap = makeComponentMap()
      // .append<TextMeta>('Text', Text) // ! Ops. Not register to map
      .value();

    // Example data
    const rootMeta: RootMeta<ExNodeMeta> = {
      children: [
        {
          component: 'Text',
          config: { content: 'Hello' },
        },
      ],
    };

    // Root Component
    const RootComponent: React.FC = () => {
      const { meta } = useCraftRoot<ExNodeMeta>();

      return (
        <div className="craft-root">
          {meta.children.map((child) => (
            <CraftNode meta={child} key={child.__uid}>
              <CraftRender />
            </CraftNode>
          ))}
        </div>
      );
    };

    // Mock console
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    const consoleWarn = console.warn as jest.Mock<void, unknown[]>;

    // Three layer construct
    const { baseElement } = render(
      <CraftProvider componentMap={componentMap}>
        <CraftRoot<ExNodeMeta> meta={rootMeta}>
          <RootComponent />
        </CraftRoot>
      </CraftProvider>
    );

    expect(consoleWarn).toHaveBeenCalledTimes(1);
    consoleWarn.mockClear();

    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it('should switch child', () => {
    // Example component text
    type TextMeta = ExItem<'Text', { content: string }>;

    const Text: React.FC = () => {
      const { meta } = useCraftNode<TextMeta>();

      return (
        <div className="text" data-craft-uid={meta.__uid}>
          <b>{meta.config?.content}</b>
        </div>
      );
    };

    // Recursive components meta
    type ExItem<N, C = Record<string, never>> = NodeMetaBase<
      N,
      C,
      NodeMeta<ExNodeMeta>
    >;
    type ExNodeMeta<Ex = ExUnused> = NodeMeta<Ex | TextMeta>;

    // Components map
    const componentMap = makeComponentMap()
      .append<TextMeta>('Text', Text)
      .value();

    // Example data
    const rootMeta: RootMeta<ExNodeMeta> = {
      children: [
        {
          component: 'Text',
          config: { content: 'Hello' },
        },
        {
          component: 'Text',
          config: { content: 'World' },
        },
      ],
    };

    // Root Component
    const RootComponent: React.FC = () => {
      const { meta, updater } = useCraftRoot<ExNodeMeta>();

      const onSwitchChild = () => {
        updater((root) => {
          root.children.reverse();
        });
      };

      return (
        <div className="craft-root">
          <div>
            <button aria-label="switch" onClick={onSwitchChild}>
              switch child
            </button>
          </div>
          <div className="craft-root-children">
            {meta.children.map((child) => (
              <CraftNode meta={child} key={child.__uid}>
                <CraftRender />
              </CraftNode>
            ))}
          </div>
        </div>
      );
    };

    // Three layer construct
    const { baseElement, getByLabelText } = render(
      <CraftProvider componentMap={componentMap}>
        <CraftRoot<ExNodeMeta> meta={rootMeta}>
          <RootComponent />
        </CraftRoot>
      </CraftProvider>
    );

    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot('before');

    fireEvent.click(getByLabelText('switch'));

    expect(baseElement).toMatchSnapshot('after');
  });
});

describe('Dummy', () => {
  it('should call dummy functions', () => {
    expect(dummyUid()).toBe('');
    expect(dummyUpdater()).toBeNull();
  });
});
