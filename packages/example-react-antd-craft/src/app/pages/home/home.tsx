import { CraftRoot } from '@d2-craft/react-core';
import { RootMeta } from '@d2-craft/typed';
import { Breadcrumb, Button, Layout, Space } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { useAppActive, useAppProvider } from '../../app-provider';
import { ExNodeMeta } from '../../craft-components/craft';
import RootContainer from '../../craft-components/root-container/root-container';
import { SwapOutlined } from '@ant-design/icons';

const initialRootMeta: RootMeta<ExNodeMeta> = {
  children: [
    {
      component: 'GridContainer',
      children: [
        {
          component: 'PureText',
          config: {
            content: 'hello',
          },
        },
      ],
    },
  ],
};

const HomePage: React.FC<RouteComponentProps> = () => {
  const { isCreative, isSurvival, toCreative, toSurvival } = useAppProvider();
  const { setActiveId } = useAppActive();

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Layout.Header>
        <div
          style={{
            float: 'left',
            width: '120px',
            height: '31px',
            margin: '16px 24px 16px 0',
            background: 'rgba(255, 255, 255, 0.3)',
          }}
        ></div>
      </Layout.Header>
      <Layout.Content style={{ padding: '0 50px' }}>
        <Space size="large">
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>App</Breadcrumb.Item>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Example</Breadcrumb.Item>
          </Breadcrumb>
          {!isCreative && (
            <Button onClick={() => toCreative()} icon={<SwapOutlined />}>
              To Creative Mode
            </Button>
          )}
          {!isSurvival && (
            <Button
              onClick={() => {
                setActiveId(null);
                toSurvival();
              }}
              icon={<SwapOutlined />}
            >
              To Survival Mode
            </Button>
          )}
        </Space>
        <div
          style={{
            minHeight: '280px',
            padding: '24px',
            background: '#fff',
          }}
        >
          <CraftRoot<ExNodeMeta> meta={initialRootMeta}>
            <RootContainer />
          </CraftRoot>
        </div>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>
        @d2-projects/d2-craft
      </Layout.Footer>
    </Layout>
  );
};

export default HomePage;
