import { CraftNode, CraftRender, useCraftNode } from '@d2-craft/react-core';
import { Row, Col } from 'antd';
import { ExItem } from '../craft';

export interface GridContainerConfig {
  align?: 'top' | 'middle' | 'bottom';
}

export type GridContainerMeta = ExItem<'GridContainer', GridContainerConfig>;

const GridContainer: React.FC = () => {
  const { meta } = useCraftNode<GridContainerMeta>();

  return (
    <Row>
      {meta.children?.map((child) => (
        <Col key={child.__uid}>
          <CraftNode meta={child} key={child.__uid}>
            <CraftRender />
          </CraftNode>
        </Col>
      ))}
    </Row>
  );
};

export default GridContainer;
