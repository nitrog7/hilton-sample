// import {SelectOptionType} from '@nlabs/react-native-form/lib/select/select.types';
import {NotificationType} from '../../components/Notification/notification.types';
import {NavigationViewProps} from '../navigation.types';
import {ReservationInput} from './reservations.types';


export interface AddViewProps extends NavigationViewProps {
}

export interface AddViewState {
  readonly hotels: any[];
  readonly notification: NotificationType;
  readonly values: ReservationInput;
}
