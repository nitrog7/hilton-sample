import {Flux} from '@nlabs/arkhamjs';
import {NativeStorage} from '@nlabs/arkhamjs-storage-native';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

import {setHome} from '../actions/navigationActions';
import {Loading} from '../components/Loading/Loading';
import {ReservationStore} from '../stores/ReservationStore';

// UI styles
const viewStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center'
  }
});

// Initialize App
export const init = (): void => {
  setHome();
};

export const InitializingView = (): JSX.Element => {
  // We will call this effect once (using an empty array as the second parameter
  useEffect(() => {
    // Start App after Flux framework is initialzed
    Flux.onInit(init);

    // Initialize Flux framework
    Flux.init({
      // Set the name of the app. This is also the object key in session storage
      name: 'reservations',
      // Where and how the cached data will be stored. In our case, we will be using the React Native AsyncStorage
      storage: new NativeStorage(),
      // Reducers to store our data. We just have one. This will store our user as well as the list of reservations
      stores: [ReservationStore]
    });

    return () => {
      // Remove initialze listener when unmounting
      Flux.offInit(init);
    };
  }, []);

  // Since Flux initializes so quickly, we will not actually see the view below.
  return (
    <View style={viewStyles.container}>
      <Loading message="Initializing..." />
    </View>
  );
};
