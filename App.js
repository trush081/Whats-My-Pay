// In App.js in a new project
import { StatusBar } from "expo-status-bar";
import React, {useState, useEffect} from 'react';
import {
  Button, 
  View, 
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity 
} from 'react-native';
import LoginScreen from './screens/LoginScreen'
import DetailsScreen from './screens/HomeScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AsyncStorage } from "react-native";
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={LoginScreen}/>
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;