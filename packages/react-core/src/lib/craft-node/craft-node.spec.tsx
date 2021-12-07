import { render } from '@testing-library/react';

import CraftNode from './craft-node';

describe('CraftNode', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CraftNode />);
    expect(baseElement).toBeTruthy();
  });
});
