/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './router';
// import App from './Page/journey';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
  

AppRegistry.registerComponent(appName, () => App);
