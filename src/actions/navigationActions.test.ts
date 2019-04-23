import {Navigation} from 'react-native-navigation';

import {goBack, goBackTo, goto, setRoot} from './navigationActions';

jest.mock('react-native-navigation');

describe('navigationActions', () => {
  afterEach(() => {
    (Navigation.push as any).mockReset();
    (Navigation.pop as any).mockReset();
    (Navigation.popTo as any).mockReset();
    (Navigation.setRoot as any).mockReset();
  });

  describe('goto', () => {
    it('should navigate to a view', async () => {
      const name: string = 'test';
      const comoponentId: string = 'Component1';
      const passProps: object = {};
      const options: object = {};

      await goto(name, comoponentId, passProps, options);
      expect(Navigation.push).toBeCalledWith(comoponentId, {
        component: {
          name,
          options,
          passProps
        }
      });
    });
  });

  describe('goBack', () => {
    it('should go back', async () => {
      const comoponentId: string = 'Component1';

      await goBack(comoponentId);
      expect(Navigation.pop).toBeCalledWith(comoponentId);
    });
  });

  describe('goBackTo', () => {
    it('should go back to a view', async () => {
      const comoponentId: string = 'Component1';

      await goBackTo(comoponentId);
      expect(Navigation.popTo).toBeCalledWith(comoponentId);
    });
  });

  describe('setRoot', () => {
    it('should go back to a view', async () => {
      const name: string = 'test';
      const passProps: object = {};

      await setRoot(name, passProps);
      expect(Navigation.setRoot).toBeCalledWith({
        root: {
          stack: {
            children: [
              {
                component: {
                  name,
                  passProps
                }
              }
            ]
          }
        }
      });
    });
  });

  describe('setHome', () => {
    it('should go home', async () => {
      const name: string = 'test';
      const passProps: object = {};

      await setRoot(name, passProps);
      expect(Navigation.setRoot).toBeCalledTimes(1);
    });
  });
});
