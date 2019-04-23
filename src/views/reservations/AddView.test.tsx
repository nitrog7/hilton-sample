import React from 'react';
import renderer from 'react-test-renderer';

import {AddView} from './AddView';

describe('AddView', () => {
  it('should render', () => {
    const view = renderer.create(<AddView />);
    expect(view.root.instance).not.toBeUndefined();
  });

  // TODO: Add more unit tests
  // More functions can be mocked here for for demo purposes, only the only function in the InitializingView was tested.
});
