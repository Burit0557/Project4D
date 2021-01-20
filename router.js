import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './Page/home';
import LoginScreen from './Page/login';
import HistoryScreen from './Page/history';
import FamilyScreen from './Page/family';
import AddFamilyScreen from './Page/family-add';

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
                    <Stack.Screen name="Family-Add" component={AddFamilyScreen}  options={{ headerShown: false }}/>
                </Stack.Navigator>
            </NavigationContainer>
        // </MyContext>
    )
}

export default router