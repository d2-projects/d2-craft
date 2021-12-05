import { render } from '@testing-library/react';

import ReactCore from './react-core';

describe('ReactCore', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactCore />);
    expect(baseElement).toBeTruthy();
  });
});
