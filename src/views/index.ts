import {Navigation} from 'react-native-navigation';

import {WelcomeView} from './home/WelcomeView';
import {InitializingView} from './InitializingView';
import {AddView} from './reservations/AddView';
import {ListView} from './reservations/ListView';

// Register all views used within the navigation. Dot notation is used for the names for organization.
export const registerViews = (): void => {
  Navigation.registerComponent('initializing', () => InitializingView);
  Navigation.registerComponent('welcome', () => WelcomeView);
  Navigation.registerComponent('reservation.add', () => AddView);
  Navigation.registerComponent('reservation.list', () => ListView);
};
