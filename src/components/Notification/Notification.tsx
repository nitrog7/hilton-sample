import isEmpty from 'lodash/isEmpty';
import React from 'react';
import {StyleSheet, Text, TextStyle, TouchableHighlight, View} from 'react-native';

import {css} from '../../common/css';
import {NotificationProps} from './notification.types';

const viewStyles = StyleSheet.create({
  container: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0
  },
  error: {
    color: css.errorColor
  },
  notificationBar: {
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    flexDirection: 'column',
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 40
  },
  notificationHeader: {
    color: css.secondaryColor,
    fontFamily: css.baseFont,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 3
  },
  notificationMessage: {
    color: '#fff',
    fontFamily: css.baseFont,
    fontSize: 16,
    fontWeight: '400'
  }
});

// When user presses the toast notification
export const onClick = (props: NotificationProps): void => {
  const {onClick} = props;

  if(onClick) {
    onClick();
  }
};

// Render a title if one is passed
export const renderTitle = (title: string, type: string): JSX.Element => {
  if(title) {
    let errorStyle: TextStyle;

    if(type === 'error') {
      errorStyle = viewStyles.error;
    }

    return <Text style={[viewStyles.notificationHeader, errorStyle]}>{title}</Text>;
  }

  return null;
};

export const Notification = (props: NotificationProps): JSX.Element => {
  const {
    alertType,
    message = '',
    title
  } = props;

  // Only display notification if there is a message
  if(!isEmpty(message)) {
    return (
      <TouchableHighlight onPress={() => onClick(props)} style={viewStyles.container}>
        <View style={viewStyles.notificationBar}>
          {renderTitle(title, alertType)}
          <Text style={viewStyles.notificationMessage}>{message}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  return null;
};
