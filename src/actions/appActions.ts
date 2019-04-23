import {Flux, FluxAction} from '@nlabs/arkhamjs';

import {NotificationType} from '../components/Notification/notification.types';
import {AppConstants} from '../constants/AppConstants';

// Loading
export const loading = (isLoading, message?, delay?): Promise<FluxAction> =>
  Flux.dispatch({delay, isLoading, message, type: AppConstants.LOADING});

// Network status
export const isConnected = (): boolean => {
  const connection: string = Flux.getState('app.networkType');
  return connection !== 'none';
};

// Notifications
export const errorMessage = (message: string, title: string = 'Error'): Promise<any> => {
  const notification: NotificationType = {alertType: 'error', message, title};
  return Flux.dispatch({notification, type: AppConstants.NOTIFICATION});
};

export const warningMessage = (message: string, title: string = 'Warning'): Promise<any> => {
  const notification: NotificationType = {alertType: 'warning', message, title};
  return Flux.dispatch({notification, type: AppConstants.NOTIFICATION});
};
