// In App.js in a new project
import React from 'react';
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

function App() {
  // Boolean to signify that user is signed in
  // -- Work to be done: implementation
  var isLoggedIn = true;

  return (
    // Navigation Implementation:
    // Two Stack groups signify is user is loged in or not upon app loading
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
        <Stack.Group>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen name="Login" component={LoginScreen}/>
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;