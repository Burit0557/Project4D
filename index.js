/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './router';
// import App from './Page/family-add';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
