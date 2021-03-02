import React from "react";
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
// import { MyContext } from './context-api/myContext';
// -------------- Navigation Stack -----------------

const Stack = createStackNavigator();
function router() {
    return (
        // <MyContext>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }}/>
                    <Stack.Screen name="Login" component={LoginScreen}  options={{ headerShown: false }}/>
                    <Stack.Screen name="History" component={HistoryScreen}  options={{ headerShown: false }}/>
                    <Stack.Screen name="Family" component={FamilyScreen}  options={{ headerShown: false }}/>
                    <Stack.Screen name="Family-Add" component={FamilyAddScreen}  options={{ headerShown: false }}/>
                    <Stack.Screen name="Family-Setting" component={FamilySettingScreen}  options={{ headerShown: false }}/>
                    <Stack.Screen name="Device" component={DeviceScreen}  options={{ headerShown: false }}/>
                    <Stack.Screen name="Jouney" component={JourneyScreen}  options={{ headerShown: false }}/>
                    <Stack.Screen name="Family-Location" component={FamilyLocationScreen}  options={{ headerShown: false }}/>
                </Stack.Navigator>
            </NavigationContainer>
        // </MyContext>
    )
}

export default router