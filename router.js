import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './Page/home';
import LoginScreen from './Page/login';
import HistoryScreen from './Page/history';
import ForgotPassScreen from './Page/forgotpass';
import SettingScreen from './Page/setting';
import Setting_profileScreen from './Page/setting_profile';
import RegisterScreen from './Page/register';
import Device_addScreen from './Page/device_add';
import Device_EARScreen from './Page/device_EAR';


// import { MyContext } from './context-api/myContext';
// -------------- Navigation Stack -----------------

const Stack = createStackNavigator();
function router() {
    return (
        // <MyContext>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }}/>
                    <Stack.Screen name="Login" component={LoginScreen}  options={{ headerShown: false }}/>
                    <Stack.Screen name="History" component={HistoryScreen}  options={{ headerShown: false }}/>
                    <Stack.Screen name="ForgotPass" component={ForgotPassScreen}  options={{ headerShown: false }}/>
                    <Stack.Screen name="Setting" component={SettingScreen}  options={{ headerShown: false }}/>
                    <Stack.Screen name="Setting_profile" component={Setting_profileScreen}  options={{ headerShown: false }}/>
                    <Stack.Screen name="Register" component={RegisterScreen}  options={{ headerShown: false }}/>
                    <Stack.Screen name="Device_add" component={Device_addScreen}  options={{ headerShown: false }}/>
                    <Stack.Screen name="Device_EAR" component={Device_EARScreen}  options={{ headerShown: false }}/>
                </Stack.Navigator>
            </NavigationContainer>
        // </MyContext>
    )
}

export default router