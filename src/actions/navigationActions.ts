import {Navigation} from 'react-native-navigation';

import {images} from '../common/images';

// Navigate to a view
export const goto = (name: string, comoponentId: string, passProps: any = {}, options: any = {}): Promise<any> =>
  Navigation.push(comoponentId, {
    component: {
      name,
      options,
      passProps
    }
  });

// Navigate back to previous view
export const goBack = (componentId?: string): Promise<any> => Navigation.pop(componentId);

// Navigate back to a particular view
export const goBackTo = (componentId?: string): Promise<any> => Navigation.popTo(componentId);

// Set root to a view
export const setRoot = (name: string, passProps: any = {}): Promise<any> => Navigation.setRoot({
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

// Go to the home view
export const setHome = () => Navigation.setRoot({
  root: {
    bottomTabs: {
      children: [
        {
          stack: {
            children: [
              {
                component: {
                  name: 'welcome',
                  options: {
                    bottomTab: {
                      icon: images.homeUnselectedTab,
                      text: 'Home'
                    },
                    topBar: {
                      visible: false
                    }
                  }
                }
              }
            ]
          }
        },
        {
          stack: {
            children: [
              {
                component: {
                  name: 'reservation.list',
                  options: {
                    bottomTab: {
                      icon: images.listUnselectedTab,
                      text: 'Reservations'
                    },
                    topBar: {
                      visible: false
                    }
                  }
                }
              }
            ]
          }
        },
        {
          stack: {
            children: [
              {
                component: {
                  name: 'reservation.add',
                  options: {
                    bottomTab: {
                      icon: images.addUnselectedTab,
                      text: 'Add'
                    },
                    topBar: {
                      visible: false
                    }
                  }
                }
              }
            ]
          }
        }
      ],
      id: 'MainTabsId'
    }
  }
});
