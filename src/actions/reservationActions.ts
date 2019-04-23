import {Flux} from '@nlabs/arkhamjs';
import {toGQL} from '@nlabs/rip-hunter';
import isEmpty from 'lodash/isEmpty';
import {DateTime} from 'luxon';
import md5 from 'md5';

import {HiltonApi} from '../common/api';
import {Config} from '../common/config';
import {ReservationConstants} from '../constants/ReservationConstants';
import {Reservation, ReservationInput} from '../views/reservations/reservations.types';

export const addReservation = async (reservation: ReservationInput): Promise<any> => {
  const {arrivalDate, departureDate, hotelName, name} = reservation;
  const dateFormat: string = Config.get('date.format');
  const updatedReservation: Reservation = {
    // Use Luxon to format the date.
    arrivalDate: DateTime.fromJSDate(new Date(arrivalDate)).toFormat(dateFormat),
    departureDate: DateTime.fromJSDate(new Date(departureDate)).toFormat(dateFormat),
    hotelName,
    // Create a unique reservation id. Usually the hash would be based off of a userId instead of name. Shorten
    // to comply with API string length restrictions
    id: md5(`reservation-${name}${Date.now()}`).toString().substr(0, 16),
    name
  };

  try {
    // Convert the JSON object into a readable format for GraphQL. Also remove the spaces for easier unit tests
    const {data: {createReservation: item = []}} = await HiltonApi.mutation(`{
      createReservation (data: ${toGQL(updatedReservation)}) {
        arrivalDate,
        departureDate,
        hotelName,
        id,
        name
      }
    }`);

    return Flux.dispatch({item, name, type: ReservationConstants.ITEM_ADD_SUCCESS});
  } catch(error) {
    return Flux.dispatch({error, type: ReservationConstants.ITEM_ADD_ERROR});
  }
};

export const getList = async (name?: string): Promise<any> => {
  try {
    let query: string;

    if(isEmpty(name)) {
      query = `{
          reservations(last: 10) {
            arrivalDate,
            departureDate,
            hotelName,
            id
          }
        }`;
    } else {
      query = `{
          reservations(where: {name: ${toGQL(name)}}, last: 10) {
            arrivalDate,
            departureDate,
            hotelName,
            id
          }
        }`;
    }

    const data = await HiltonApi.query(query);
    const {data: {reservations: list = []}} = data;
    return Flux.dispatch({list, name, type: ReservationConstants.LIST_GET_SUCCESS});
  } catch(error) {
    return Flux.dispatch({type: ReservationConstants.LIST_GET_ERROR});
  }
};

export const getReservation = async (id: string): Promise<any> => {
  try {
    const {data: {reservation: item = {}}} = await HiltonApi.query(`{
        reservation (where: {id: ${toGQL(id)}}) {
          arrivalDate,
          departureDate,
          hotelName,
          id,
          name
        }
      }`);
    return Flux.dispatch({item, type: ReservationConstants.ITEM_GET_SUCCESS});
  } catch(error) {
    return Flux.dispatch({type: ReservationConstants.ITEM_GET_ERROR});
  }
};
