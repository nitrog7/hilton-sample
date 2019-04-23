import React from 'react';
import renderer from 'react-test-renderer';

import {setHome} from '../actions/navigationActions';
import {init, InitializingView} from './InitializingView';

jest.mock('../actions/navigationActions');

describe('InitializingView', () => {
  it('should render', () => {
    const view = renderer.create(<InitializingView />);
    expect(view.root.instance).not.toBeUndefined();
  });

  describe('init', () => {
    it('should initialize', () => {
      init();
      expect(setHome).toBeCalledTimes(1);
    });
  });
});
