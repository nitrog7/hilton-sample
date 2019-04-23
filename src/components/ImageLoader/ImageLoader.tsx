import isString from 'lodash/isString';
import * as React from 'react';
import {Image, ImageURISource} from 'react-native';
import FastImage from 'react-native-fast-image';

import {ImageLoaderProps} from './ImageLoader.types';

export const ImageLoader = (props: ImageLoaderProps): JSX.Element => {
  const {
    height = 100,
    resizeMode = 'contain',
    source,
    style,
    width = 100
  } = props;

  if(isString(source)) {
    const uri: string = source as string;

    return (
      <FastImage
        source={{
          priority: FastImage.priority.normal,
          uri
        }}
        style={[style, {height, width}]} />
    );
  }

  return (
    <Image
      resizeMode={resizeMode}
      source={source as ImageURISource}
      style={[style, {height, width}]} />
  );
};
