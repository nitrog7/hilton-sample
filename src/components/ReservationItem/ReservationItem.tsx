import * as React from 'react';
import {StyleSheet, Text, TextStyle, View} from 'react-native';

import {styles} from '../../common/styles';
import {Reservation} from '../../views/reservations/reservations.types';


const viewStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    height: 80,
    justifyContent: 'center'
  }
});

export const ReservationItem = (props: Reservation): JSX.Element => {
  const {arrivalDate, departureDate, hotelName} = props;

  return (
    <View style={viewStyles.container}>
      <Text style={styles.h3 as TextStyle}>{hotelName}</Text>
      <Text style={styles.para as TextStyle}>{arrivalDate} - {departureDate}</Text>
    </View>
  );
};

