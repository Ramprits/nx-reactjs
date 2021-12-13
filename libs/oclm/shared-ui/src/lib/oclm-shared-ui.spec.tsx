import { render } from '@testing-library/react';

import OclmSharedUi from './oclm-shared-ui';

describe('OclmSharedUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OclmSharedUi />);
    expect(baseElement).toBeTruthy();
  });
});
