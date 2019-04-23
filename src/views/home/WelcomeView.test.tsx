import React from 'react';
import renderer from 'react-test-renderer';

import {WelcomeView} from './WelcomeView';

describe('WelcomeView', () => {
  it('should render', () => {
    const view = renderer.create(<WelcomeView />);
    expect(view.root.instance).not.toBeUndefined();
  });
});
