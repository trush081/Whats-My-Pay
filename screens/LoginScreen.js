import { StatusBar } from "expo-status-bar";
import React, {useState, useEffect} from 'react';
import {
  View, 
  Text,
  Image,
  TextInput,
  TouchableOpacity 
} from 'react-native';
import styles from './Style'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';

function LoginScreen({ navigation }){
  // User credential information
  const [ID, setID] = useState('');
  const [password, setPassword] = useState('');

  // Boolean to state if user is signed in -- Work to be done: implementation
  const [authenticated, setAuthenticated] = useState(false);

  // Change authentication status of the user -- Work to be done: implementation
  auth().onAuthStateChanged((user) => {
    if(user) {
      setAuthenticated(true);
    }
  })
  
  // sign in: takes employeeID and password, translated to stored email in firestore,
  // authenticats user using email and password authentication from firebase
  const signin = (ID, password) => {
    try {
      //finds the document in firestore with name of Employee ID
      firestore().collection("EmployeeID").doc(ID).onSnapshot(doc => {
        if (doc.exists){
          // gather email field from firebase
          //firebase user authentication with email and password
          if(auth().signInWithEmailAndPassword(doc.data().Email, password)){
            {
              // Navigate to the Details route with params, User's Name
              navigation.navigate('Home', {
                name: doc.data().Name,
                empID: ID,
              });
            }
          }
        } else {
          // Error if the user does not exist or lack of information
          // -- Work to be done: specify errors for user
          alert("Error");
          
        }
      });
    } catch (error) {
      alert(error);
    }
  };
  //Example: <Button title="signin" onPress={() => props.signin(email, password)} />
  

  return (
    <View style={styles.container}>
      {/* Header Image */}
      <Image style={styles.imageLogin} source={require("./assets/pj.png")} />
      {/* App Name Header */}
      <Text style={styles.text}>What's My Pay?</Text>
      
      {/* Work to be done: Make input field clear apon logout */}
      {/* Employee ID input */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Employee ID"
          onChangeText={setID}
          value={ID}
          underlineColorAndroid="transparent"
        />
      </View>
      {/* Password input */}
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

      {/* Forgot Password -- Work to be done: Implementation */}
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
      {/* Login Button */}
      <TouchableOpacity 
        style={styles.loginBtn}
        onPress={() => signin(ID, password)
      }>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      {/* Sign Up Button -- Work to be done: Navigation to sign up screen */}
      <TouchableOpacity style={styles.signUpBtn}>
        <Text style={styles.loginText}>SIGN UP</Text>
      </TouchableOpacity>

      {/* Loading notification for development */}
      <StatusBar style="auto" />
    </View>
  );
}

export default LoginScreen