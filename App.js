import 'react-native-url-polyfill/auto';
import React from 'react';
import { View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import LoginScreen from './screens/LoginScreen'; // Màn hình đăng nhập
import HomeScreen from './screens/HomeScreen'; // Màn hình chính di động
import HomeScreenWeb from './screens/HomeScreenWeb'; // Màn hình chính web

const Stack = createStackNavigator();
const getMQTTClient = () => {
};
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Platform.OS === 'web' ? HomeScreenWeb : HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
