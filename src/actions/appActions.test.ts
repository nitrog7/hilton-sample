import {Flux} from '@nlabs/arkhamjs';

import {NotificationType} from '../components/Notification/notification.types';
import {AppConstants} from '../constants/AppConstants';
import {errorMessage, isConnected, loading, warningMessage} from './appActions';

jest.mock('@nlabs/arkhamjs');

describe('appActions', () => {
  afterEach(() => {
    (Flux.dispatch as any).mockReset();
  });

  describe('loading', () => {
    it('should dispatch a loading action', async () => {
      const delay: number = 5;
      const isLoading: boolean = true;
      const message: string = 'Test';

      await loading(isLoading, message, delay);
      expect(Flux.dispatch).toBeCalledWith({delay, isLoading, message, type: AppConstants.LOADING});
    });
  });

  describe('isConnected', () => {
    it('should check device connection', () => {
      Flux.getState = jest.fn(() => 'wifi');
      const connectionStatus: boolean = isConnected();
      expect(connectionStatus).toBe(true);
    });
  });

  describe('errorMessage', () => {
    it('should trigger an error notification', async () => {
      const message: string = 'Test';
      const notification: NotificationType = {alertType: 'error', message, title: 'Error'};

      await errorMessage(message);
      expect(Flux.dispatch).toBeCalledWith({notification, type: AppConstants.NOTIFICATION});
    });
  });

  describe('warningMessage', () => {
    it('should trigger an error notification', async () => {
      const message: string = 'Test';
      const notification: NotificationType = {alertType: 'warning', message, title: 'Warning'};

      await warningMessage(message);
      expect(Flux.dispatch).toBeCalledWith({notification, type: AppConstants.NOTIFICATION});
    });
  });
});
