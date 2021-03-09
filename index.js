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
import notifee, { EventType } from '@notifee/react-native';

async function onMessageReceived(message) {
  // Do something
  console.log(message)
  if (message.data.notifee) {
      notifee.displayNotification(JSON.parse(message.data.notifee));
  }
  // notifee.displayNotification(JSON.parse(message.data.notifee));
}

messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);

notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;

  if (type === EventType.PRESS) {
      // Update external API
     
      console.log("test in background");
      // Remove the notification
      // await notifee.cancelNotification(notification.id);
  }
});

function HeadlessCheck({ isHeadless }) {
  return isHeadless ? null : router;
}



AppRegistry.registerHeadlessTask('connectbluetooth', () => connectbluetooth);
AppRegistry.registerComponent(appName, () => App);


