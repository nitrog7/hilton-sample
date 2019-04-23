import {Flux} from '@nlabs/arkhamjs';
import {Form, InputField} from '@nlabs/react-native-form';
import isEmpty from 'lodash/isEmpty';
import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {Navigation} from 'react-native-navigation';

import {errorMessage} from '../../actions/appActions';
import {getList} from '../../actions/reservationActions';
import {appTheme} from '../../common/AppTheme';
import {styles} from '../../common/styles';
import {ReservationItem} from '../../components/ReservationItem/ReservationItem';
import {ReservationConstants} from '../../constants/ReservationConstants';
import {Reservation} from './reservations.types';

export const onSuccess = (setList) => (): void => {
  // When the API successfully returns a list of reservations, update our list.
  const list: Reservation[] = Flux.getState('reservation.list', []);
  setList(list);
};

export const updateList = (state): void => {
  // When the user hits "Enter" and/or submits the form, we will call our API to get a list of reservations filtered
  // by the customer name.
  const {name} = state;
  getList(name);
};

export const onUpdate = (state, setState, data: any): void => {
  // Update TextInput as the user types
  const {values: {name}} = data;
  setState({...state, name});
};

export const onError = (): void => {
  errorMessage('Could not access server. Please try again', 'Server Error');
};

export const onAppear = (state) => ({componentId, componentName}): any => {
  if(componentName !== 'reservation.list') {
    return null;
  }

  const {name} = state;

  if(!isEmpty(name)) {
    return getList(name);
  }

  const cachedName: string = Flux.getState('reservation.name', '');

  if(!isEmpty(cachedName)) {
    return getList(cachedName);
  }

  return null;
};

export const ListView = (): JSX.Element => {
  // If we entered a name previously, lets pull it from the cache.
  const cachedName: string = Flux.getState('reservation.name', '');

  // State of form data. This will be updated when changes to the TextInput are made.
  const [state, setState] = useState({
    name: cachedName
  });
  const {name} = state;

  // State of hotel list. Since this data is async, we will use a separate state to keep track of loaded data.
  const [list, setList] = useState([]);

  // Reference of the name input so we can focus onLoad.
  const inputRef: MutableRefObject<InputField> = useRef(null);

  // Mount effect
  useEffect(() => {
    // Add action listeners
    Flux.on(ReservationConstants.LIST_GET_ERROR, onError);
    Flux.on(ReservationConstants.LIST_GET_SUCCESS, onSuccess(setList));
    const viewEventListener = Navigation.events().registerComponentDidAppearListener(onAppear(state));


    // Set our focus to the first input on load.
    inputRef.current.focus();


    // Unmount
    return () => {
      // Remove action listeners
      Flux.off(ReservationConstants.LIST_GET_ERROR, onError);
      Flux.off(ReservationConstants.LIST_GET_SUCCESS, onSuccess(setList));
      viewEventListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Form
        onSubmit={() => updateList(state)}
        onUpdate={(data) => onUpdate(state, setState, data)}
        style={styles.section}
        values={{name}}>
        <Text style={styles.h1}>Current Reservations</Text>
        <Text style={styles.description}>
          Last 10 reservations by customer name.
        </Text>
        <View style={styles.inputSection}>
          <InputField
            label="Full Name"
            name="name"
            onSubmitEditing={() => updateList(state)}
            ref={inputRef}
            theme={appTheme} />
        </View>
      </Form>
      <FlatList
        data={list}
        keyExtractor={(item: Reservation, index) => `${item.id}${index}`}
        renderItem={({item}) => <ReservationItem {...item as any} />} />
    </View>
  );
};
