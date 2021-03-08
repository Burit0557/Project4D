/**
 * @format
 */

import { AppRegistry } from 'react-native';

import App from './router';
import connectbluetooth from './Page/connectbluetooth'

// import App from './Page/journey';


//import App from './Page/setting_device';
//import App from './Page/test2';

import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});


AppRegistry.registerHeadlessTask('connectbluetooth', () => connectbluetooth);
AppRegistry.registerComponent(appName, () => App);


