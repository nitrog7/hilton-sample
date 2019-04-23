import {HiltonApi} from '../common/api';
import {ReservationInput} from '../views/reservations/reservations.types';
import {addReservation, getList, getReservation} from './reservationActions';

jest.mock('../common/api');

describe('reservationActions', () => {
  afterEach(() => {
    (HiltonApi.mutation as any).mockReset();
    (HiltonApi.query as any).mockReset();
  });

  describe('addReservation', () => {
    it('should add a new reservation', async () => {
      const arrivalDate: Date = new Date('04-23-2019');
      const departureDate: Date = new Date('04-25-2019');
      const hotelName: string = 'Hilton';
      const name: string = 'Customer';

      const reservation: ReservationInput = {
        arrivalDate,
        departureDate,
        hotelName,
        name
      };

      await addReservation(reservation);
      expect(HiltonApi.mutation).toBeCalledTimes(1);
    });

    it('should handle errors', async () => {
      const arrivalDate: Date = new Date('04-23-2019');
      const departureDate: Date = new Date('04-25-2019');
      const hotelName: string = 'Hilton';
      const name: string = 'Customer';
      const errorMessage: string = 'Test Error';
      const reservation: ReservationInput = {
        arrivalDate,
        departureDate,
        hotelName,
        name
      };

      HiltonApi.mutation = jest.fn(() => Promise.reject(new Error(errorMessage)));
      expect(addReservation(reservation)).rejects.toThrowError(errorMessage);
    });
  });

  describe('getList', () => {
    it('should get a list of reservations', async () => {
      const name: string = 'Customer';

      await getList(name);
      expect(HiltonApi.query).toBeCalledTimes(1);
    });

    it('should handle errors', async () => {
      const name: string = 'Customer';
      const errorMessage: string = 'Test Error';

      HiltonApi.query = jest.fn(() => Promise.reject(new Error(errorMessage)));
      expect(getList(name)).rejects.toThrowError(errorMessage);
    });
  });

  describe('getReservation', () => {
    it('should get reservation details', async () => {
      const id: string = 'reservationId';

      await getReservation(id);
      expect(HiltonApi.query).toBeCalledTimes(1);
    });

    it('should handle errors', async () => {
      const id: string = 'reservationId';
      const errorMessage: string = 'Test Error';

      HiltonApi.query = jest.fn(() => Promise.reject(new Error(errorMessage)));
      expect(getReservation(id)).rejects.toThrowError(errorMessage);
    });
  });
});
