/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import SplashScreen from 'react-native-splash-screen'; // Import SplashScreen


AppRegistry.registerComponent(appName, () => App);

SplashScreen.hide();
