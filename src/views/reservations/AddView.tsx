import {Flux} from '@nlabs/arkhamjs';
import {
  Button,
  DateTimeField,
  DateTimePicker,
  Form,
  InputField,
  SelectField,
  SelectPicker
} from '@nlabs/react-native-form';
import {DateTime} from 'luxon';
import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {errorMessage} from '../../actions/appActions';
import {goto} from '../../actions/navigationActions';
import {addReservation} from '../../actions/reservationActions';
import {appTheme} from '../../common/AppTheme';
import {css} from '../../common/css';
import {images} from '../../common/images';
import {styles} from '../../common/styles';
import {ImageLoader} from '../../components/ImageLoader/ImageLoader';
import {Notification} from '../../components/Notification/Notification';
import {AppConstants} from '../../constants/AppConstants';
import {ReservationConstants} from '../../constants/ReservationConstants';
import {hotelList} from '../../data/hotels';
import {AddViewProps, AddViewState} from './addView.types';
import {ReservationInput} from './reservations.types';

// UI styles
const viewStyles = StyleSheet.create({
  icon: {
    top: 30
  },
  section: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 0
  }
});

export const onUpdate = (state, setState, data): void => {
  const {values, valid} = data;
  setState({...state, valid, values});
};

export const onSubmit = (values: ReservationInput): void => {
  addReservation(values);
};

export const onSuccess = (componentId: string) => (): void => {
  // If reservation was added successfully, return to welcome view
  goto('reservation.list', componentId);
};

export const onError = (): void => {
  // If an error occurs, display an error notification
  errorMessage(
    'There was an error while saving your reservation. Please try again.',
    'Reservation Unsuccessful'
  );
};

export const onNotification = (state, setState) => ({notification}): void => {
  // Show notification
  setState({...state, notification});
};

export const onCloseNotification = (state, setState) => (): void => {
  setState({...state, notification: {}});
};

export const AddView = (props: AddViewProps): JSX.Element => {
  // Props
  const {componentId} = props;

  // If we entered a name previously, lets pull it from the cache.
  const cachedName: string = Flux.getState('reservation.name', '');

  // Initial state
  const [state, setState] = useState({
    hotels: hotelList.map((name) => ({label: name, value: name})),
    notification: {},
    values: {
      arrivalDate: new Date(),
      departureDate: new Date(),
      hotelName: '',
      name: cachedName
    }
  });
  const {hotels, notification, values}: AddViewState = state;

  // References used to focus inputs
  const inputName: MutableRefObject<InputField> = useRef(null);
  const inputHotel: MutableRefObject<SelectField> = useRef(null);
  const inputArrival: MutableRefObject<DateTimeField> = useRef(null);
  const inputDeparture: MutableRefObject<DateTimeField> = useRef(null);

  // Mount effect
  useEffect(() => {
    // Add listeners
    Flux.on(AppConstants.NOTIFICATION, onNotification(state, setState));
    Flux.on(ReservationConstants.ITEM_ADD_ERROR, onError);
    Flux.on(ReservationConstants.ITEM_ADD_SUCCESS, onSuccess(componentId));

    // Focus on the first input, name
    inputName.current.focus();

    // Unmount effect
    return () => {
      // Remove listeners
      Flux.off(AppConstants.NOTIFICATION, onNotification(state, setState));
      Flux.off(ReservationConstants.ITEM_ADD_ERROR, onError);
      Flux.off(ReservationConstants.ITEM_ADD_SUCCESS, onSuccess(componentId));
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', height: '30%', justifyContent: 'center'}} >
        <ImageLoader width={130} height={130} source={images.bed} style={viewStyles.icon} />
      </View>
      <Form
        style={[styles.section, viewStyles.section]}
        values={{...values, name: cachedName}}
        onUpdate={(data) => onUpdate(state, setState, data)}
        onSubmit={(values) => onSubmit(values)}>
        <Text style={styles.h1}>Book today!</Text>
        <Text style={styles.description}>
          Start planning your next getaway with our latest travel packages and exclusive hotel discounts.
        </Text>
        <View style={styles.inputSection}>
          <InputField
            label="Full Name"
            name="name"
            onSubmitEditing={() => inputHotel.current.focus()}
            ref={inputName}
            required
            returnKeyType="next"
            theme={appTheme}
            type="email" />
          <SelectField
            containerStyle={{flex: 0}}
            label="Hotel"
            list={hotels}
            name="hotelName"
            onSubmitEditing={() => inputArrival.current.focus()}
            ref={inputHotel}
            theme={appTheme} />
          <DateTimeField
            label="Arrival Date"
            format="ccc, LLL d, kkkk @ h:mma"
            minimumDate={DateTime.local().set({millisecond: 0, minute: 0, second: 0}).toJSDate()}
            minuteInterval={30}
            name="arrivalDate"
            onSubmitEditing={() => inputDeparture.current.focus()}
            placeholderTextColor={css.primaryColor}
            ref={inputArrival}
            theme={appTheme} />
          <DateTimeField
            label="Departure Date"
            format="ccc, LLL d, kkkk @ h:mma"
            minimumDate={DateTime.local().set({millisecond: 0, minute: 0, second: 0}).toJSDate()}
            minuteInterval={30}
            name="departureDate"
            placeholderTextColor={css.primaryColor}
            ref={inputDeparture}
            theme={appTheme} />
        </View>
        <Button
          btnStyle={styles.buttonLargePrimary}
          labelStyle={styles.buttonLabel}
          isSubmit>Book Reservation</Button>
      </Form>
      <SelectPicker theme={appTheme} selectorStyle={{bottom: 75}} />
      <DateTimePicker theme={appTheme} selectorStyle={{bottom: 75}} />
      <Notification {...notification} onClick={onCloseNotification(state, setState)} />
    </View>
  );
};
