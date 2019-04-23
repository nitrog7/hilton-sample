import React from 'react';
import renderer from 'react-test-renderer';

import {ListView} from './ListView';

describe('ListView', () => {
  it('should render', () => {
    const view = renderer.create(<ListView />);
    expect(view.root.instance).not.toBeUndefined();
  });

  // TODO: Add more unit tests
  // More functions can be mocked here for for demo purposes, only the only function in the InitializingView was tested.
});
