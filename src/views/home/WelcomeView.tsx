import {Button} from '@nlabs/react-native-form';
import * as React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

import {goto} from '../../actions/navigationActions';
import {images} from '../../common/images';
import {styles} from '../../common/styles';
import {ImageLoader} from '../../components/ImageLoader/ImageLoader';
import {WelcomeViewProps} from './welcomeView.types';

// UI styles
const viewStyles = StyleSheet.create({
  btnWrapper: {
    alignSelf: 'stretch',
    paddingTop: 15
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center'
  },
  imgBar: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
});

export const WelcomeView = (props: WelcomeViewProps): JSX.Element => {
  const {componentId} = props;
  const addOptions = {
    bottomTab: {
      icon: images.addSelectedTab,
      text: 'Add'
    },
    topBar: {
      visible: false
    }
  };
  const listOptions = {
    bottomTab: {
      icon: images.listSelectedTab,
      text: 'Reservations'
    },
    topBar: {
      visible: false
    }
  };

  return (
    <View style={viewStyles.container}>
      <View style={viewStyles.imgBar as ViewStyle}>
        <ImageLoader width={200} height={75} source={images.logo} />
      </View>
      <View style={styles.btnBar as ViewStyle}>
        <View style={viewStyles.btnWrapper}>
          <Button
            btnStyle={styles.buttonLargePrimary}
            labelStyle={styles.buttonLabel}
            onPress={() => goto('reservation.list', componentId, {}, listOptions)}>Current Reservations</Button>

        </View>
        <View style={viewStyles.btnWrapper}>
          <Button
            btnStyle={styles.buttonLargePrimary}
            labelStyle={styles.buttonLabel}
            onPress={() => goto('reservation.add', componentId, {}, addOptions)}>Book Reservation</Button>
        </View>
      </View>
    </View>
  );
};

