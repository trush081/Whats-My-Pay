// In App.js in a new project
import { StatusBar } from "expo-status-bar";
import React, {useState, useEffect} from 'react';
import {
  Button, 
  View, 
  Text,
  Image,
  TextInput,
  TouchableOpacity 
} from 'react-native';
import styles from './Style'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AsyncStorage } from "react-native";
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';

function LoginScreen({ navigation }){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const createUser = (email, password) => {
    try {
      auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
    }
  };
  //<Button title="Create" onPress={() => props.createUser(email, password)} />
  
  auth().onAuthStateChanged((user) => {
    if(user) {
      setAuthenticated(true);
    }
  })
  
  const signin = (email, password) => {
    try {
      if(auth().signInWithEmailAndPassword(email, password)){
        {
          
          // 1. Navigate to the Details route with params 
          navigation.navigate('Details', {
            itemId: 86,
            otherParam: "user here",
          });
        }
      }
    } catch (error) {
      alert(error);
    }
  };
  //<Button title="signin" onPress={() => props.signin(email, password)} />
  

  return (
    <View style={styles.container}>
        <StatusBar style="auto" />
        <Image style={styles.imageLogin} source={require("./assets/pj.png")} />
        
        
        <Text style={styles.text}>What's My Pay?</Text>
        <View style={styles.inputView}>
        <TextInput
            style={styles.TextInput}
            placeholder="E-mail or phone number"
            onChangeText={setEmail}
            value={email}
            underlineColorAndroid="transparent"
        />
        </View>

        <View style={styles.inputView}>
        <TextInput
            style={styles.TextInput}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            underlineColorAndroid="transparent"
        />
        </View>

        <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={styles.loginBtn}
        onPress={() => signin(email, password)
        }>
        <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signUpBtn}>
        <Text style={styles.loginText}>SIGN UP</Text>
        </TouchableOpacity>
    </View>


    /*<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
        title="Go to Details"
        onPress={() => {
            // 1. Navigate to the Details route with params 
            navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
            });
        }}
        />
    </View>
    */
    );
}

export default LoginScreen