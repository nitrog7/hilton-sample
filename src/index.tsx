import {Navigation} from 'react-native-navigation';

import {setRoot} from './actions/navigationActions';
import {registerViews} from './views';

registerViews();

Navigation.events().registerAppLaunchedListener(() => setRoot('initializing'));
