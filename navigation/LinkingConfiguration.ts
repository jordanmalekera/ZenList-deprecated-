/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types/navigationTypes';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: 'Home',
          Search: 'Search',
          Lists: 'Lists',
          Profile: 'Profile'
        },
      },
      Details: 'Details',
      Intro: 'Intro',
      Login: 'Login'
    },
  },
};

export default linking;
