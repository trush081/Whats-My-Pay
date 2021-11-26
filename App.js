// In App.js in a new project
import React, {useState, useEffect} from 'react';
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import SignUpScreen from './screens/SignUpScreen'
import CalendarScreen from './screens/CalendarScreen'
import BreakdownScreen from './screens/BreakdownScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

function App() {

  return (
    // Navigation Implementation:
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen}/>
        <Stack.Screen name="Calendar" component={CalendarScreen}/>
        <Stack.Screen name="Breakdown" component={BreakdownScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;