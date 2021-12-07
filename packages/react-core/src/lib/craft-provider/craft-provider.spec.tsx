import { render } from '@testing-library/react';

import CraftProvider from './craft-provider';

describe('CraftProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CraftProvider />);
    expect(baseElement).toBeTruthy();
  });
});
