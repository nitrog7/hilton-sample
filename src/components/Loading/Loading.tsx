import * as React from 'react';
import {Image, ImageStyle, StyleSheet, Text, View} from 'react-native';

import {css} from '../../common/css';
import {images} from '../../common/images';
import {LoadingProps} from './Loading.types';

const viewStyles = StyleSheet.create({
  box: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  error: {
    color: '#fff',
    fontFamily: css.baseFont,
    fontSize: 16,
    marginTop: 15,
    textAlign: 'center'
  },
  imgLogo: {
    height: 50,
    width: 61
  },
  page: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0
  }
});

export const Loading = (props: LoadingProps) => {
  const {message = 'Loading...'} = props;

  return (
    <View style={viewStyles.container}>
      <Image style={viewStyles.imgLogo as ImageStyle} source={images.logo} />
      <Text>{message}</Text>
    </View>
  );
};
