import {ImageResizeMode, ImageURISource} from 'react-native';

export interface ImageLoaderProps {
  readonly height?: number;
  readonly resizeMode?: ImageResizeMode;
  readonly source?: string | ImageURISource;
  readonly style?: any | any[];
  readonly thumbnail?: string | ImageURISource;
  readonly width?: number;
}
