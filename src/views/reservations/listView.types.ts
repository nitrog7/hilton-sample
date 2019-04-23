import {NavigationViewProps} from '../navigation.types';
import {Reservation} from './reservations.types';

export interface ListViewProps extends NavigationViewProps {
}

export interface ListViewState {
  readonly list: Reservation[];
  readonly name: string;
}
