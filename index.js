/**
 * @format
 */

import {AppRegistry} from 'react-native';

import App from './router';

//import App from './Page/setting_device';
//import App from './Page/test2';

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);


