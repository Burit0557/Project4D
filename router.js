import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './Page/home';
import LoginScreen from './Page/login';
import HistoryScreen from './Page/history';

import FamilyScreen from './Page/family';
import FamilyAddScreen from './Page/family-add';
import FamilySettingScreen from './Page/family-setting';
import DeviceScreen from './Page/device';
import JourneyScreen from './Page/journey';
import FamilyLocationScreen from './Page/family-location';

import ForgotPassScreen from './Page/forgotpass';
import SettingScreen from './Page/setting';
import Setting_profileScreen from './Page/setting_profile';
import RegisterScreen from './Page/register';
import Setting_deviceScreen from './Page/setting_device';

import Device_addScreen from './Page/device_add';
import Device_EARScreen from './Page/device_EAR';
import Device_wifiScreen from './Page/device_wifi';

import { MyContext } from './context_api/myContext';

import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';

import RNBluetoothClassic, {
    BluetoothDevice
} from 'react-native-bluetooth-classic';
import { Alert } from 'react-native';

// -------------- Navigation Stack -----------------

const Stack = createStackNavigator();
function router() {
   _checkPermission = async () => {
        const enabled = await messaging().hasPermission();
        if (enabled) {
            const device = await messaging().getToken()
            console.log(device)
        }
        else this._getPermission()
    }

    _getPermission = async () => {
        messaging().requestPermission()
            .then(() => {
                this._checkPermission()
            })
            .catch(error => {
                // User has rejected permissions  
            });
    }
    
    useEffect(() => {
        async function connect() {
            try {
                let bonded = await RNBluetoothClassic.getBondedDevices();
                // console.log('DeviceListScreen::getBondedDevices found', bonded);
                let peripheral = bonded.find(element => element.name === "raspberrypi");
                console.log(peripheral)
                peripheral.connect()
                    .then(res => {
                        peripheral.onDataReceived((data) => onReceivedData(data))
                        peripheral.write(" test 1 ")
                        peripheral.write("end")
                    })
            }
            catch (error) {
                console.log(error)
            }
        }
        connect()
       _checkPermission()
    }, [])

    const onReceivedData = (data) => {
        console.log(data)
        Alert.alert('From Bluetooth', data.data)
    }

    return (
        <MyContext>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="History" component={HistoryScreen} options={{ headerShown: false }} />

                    <Stack.Screen name="Family" component={FamilyScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Family-Add" component={FamilyAddScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Family-Setting" component={FamilySettingScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Device" component={DeviceScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Jouney" component={JourneyScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Family-Location" component={FamilyLocationScreen} options={{ headerShown: false }} />

                    <Stack.Screen name="ForgotPass" component={ForgotPassScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Setting" component={SettingScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Setting_profile" component={Setting_profileScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Setting_device" component={Setting_deviceScreen} options={{ headerShown: false }} />


                    <Stack.Screen name="Device_add" component={Device_addScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Device_EAR" component={Device_EARScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Device_wifi" component={Device_wifiScreen} options={{ headerShown: false }} />

                </Stack.Navigator>
            </NavigationContainer>
        </MyContext>
    )
}

export default router