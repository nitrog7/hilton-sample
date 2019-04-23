import {Store} from '@nlabs/arkhamjs';

import {ReservationConstants} from '../constants/ReservationConstants';

export class ReservationStore extends Store {
  constructor() {
    super('reservation');
  }

  initialState(): object {
    return {
      item: {},
      list: [],
      name: ''
    };
  }

  onAction(type: string, data: any, state: any): object {
    switch(type) {
      case ReservationConstants.ITEM_ADD_SUCCESS: {
        const {name} = data;
        return {...state, name};
      }
      case ReservationConstants.ITEM_GET_ERROR: {
        return {...state, item: {}};
      }
      case ReservationConstants.ITEM_GET_SUCCESS: {
        const {item} = data;
        return {...state, item};
      }
      case ReservationConstants.LIST_GET_ERROR: {
        return {...state, list: []};
      }
      case ReservationConstants.LIST_GET_SUCCESS: {
        const {list, name} = data;
        return {...state, list, name};
      }
      default: {
        return state;
      }
    }
  }
}
