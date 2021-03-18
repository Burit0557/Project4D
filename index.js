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
import PushNotification from "react-native-push-notification";

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

async function onMessageReceived(message) {
  // Do something
  console.log('onApp', message)
  if (message) {
    console.log('test in noti')
    await notifee.displayNotification(JSON.parse(message.data.notifee)); 
    console.log('end noti')
  }
  else {

  }
  // notifee.displayNotification(JSON.parse(message.data.notifee));
}

async function BackgroundMessageHandler(message) {
  // Do something
  console.log('onBack', message)

}

messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(BackgroundMessageHandler);

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


