/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

import { LinkingOptions } from '@react-navigation/native';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [`${Constants.manifest.scheme}://`],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: 'one',
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'events/:userId',
            },
          },
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
  // async getInitialURL() {
  //   // First, you may want to do the default deep link handling
  //   // Check if app was opened from a deep link

  //   let url = await Linking.getInitialURL();
  //   console.log('get initial url ', url);

  //   if (url != null) {
  //     return url;
  //   }

  //   // Handle URL from expo push notifications
  //   const response = await Notifications.getLastNotificationResponseAsync();
  //   url = response?.notification.request.content.data.url;

  //   console.log('get initial url from expo ', url);

  //   return url;
  // },
};

export default linking;
