import { StatusBar } from "expo-status-bar";
import React, {useState, useEffect} from 'react';
import {
  View, 
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './Style'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';

function SignUpScreen({ navigation }){
  // User credential information
  const [name, setName] = useState('');
  const [ID, setID] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verification, setVerification] = useState('');
  
  const [exists, setExists] = useState(false);

  // Main function to create a user 
  const createUser = () => {
    // Checks inputs
    if (fieldVerification()) {
      // checks password specifications
      var passCheck = verifyPass()
      if (passCheck == 0) {
        //checks firestore ID usage
        if (aCall()) {
          firestore().collection("Employees").doc(ID).onSnapshot(doc => {
            //checks to see if ID has been created by administration
            if (doc.exists){
              // creates user auth and adds info to firestore
              isCreated();
              if (isCreated) {
                //adds data then navigates to login screen
                navigate(addToFirestore());
              }
            } else {
              Alert.alert("Invalid", "Employee ID does not exist.")
            }
          });
        } else {
          Alert.alert("Invalid", "Employee ID is already being used.")
        }
      } else if (passCheck == 1) {
        Alert.alert("Invalid", "Passwords do not match.")
      } else if (passCheck == 2) {
        Alert.alert("Invalid", "Password must contain, capital letter, number, and one special character.")
      }
    } else {
      Alert.alert("Invalid", "All fields must be filled!")
    }
  };
  //Example: <Button title="Create" onPress={() => props.createUser(email, password)} />

  //finds if the ID in firestore is alread being used by other user
  async function aCall(){
    var exist
    return idCheck(exist);
  }

  //checks if the ID is already being used by another user. Continuation of aCall()
  function idCheck(exist) {
    firestore().collection("UsedIDs").doc(ID).onSnapshot(doc => {
      if (!doc.exists){
        exist = true;
      } else {
        exist = false;
      }
    });
  }

  //checks firebase authentication specifications
  const isCreated = () => {
    auth()
      //Creates auth user in firebase
      .createUserWithEmailAndPassword(email, password)
      .catch(error => {
        if(!isCreated){
          //checks if email is in use
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert("Invalid",'User has already created account!');
            console.log(error);
          }
          //checks if email is valid
          if (error.code === 'auth/invalid-email') {
            Alert.alert("Invalid", 'That email address is formatted incorrectly.');
            console.log(error);
          }
          //checks for weak password in firebase
          if (error.code === 'auth/weak-password') {
            Alert.alert("Invalid", 'Password is not strong enough.');
            console.log(error);
          }
        } 
    });
  }

  //Adds the user info into the firestore databases
  //the first one is for login using ID
  //the second is for setting the ID to being used 
  //the third is for getting user info on home/cal pages
  function addToFirestore(){
    firestore().collection('EmployeeIDs').doc(email).set({
      userID: ID,
    }).then(() => {
      firestore().collection('UsedIDs').doc(ID).set({
        used: true,
      }).then(() => {
        firestore().collection('Employees').doc(ID).update({
          Email: email,
          Name: name,
        });
      });
    });
  }

  //navigates to the login page
  function navigate(){
    navigation.navigate('Login');
  }

  //Password security to find if input is correct
  //correct length, special char, and captial
  //passwords must match 
  function verifyPass(){
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    
    if (!strongRegex.test(password)) {
      return 2;
    }

    if (password === verification) {
      return 0;
    } else {
      return 1;
    }
  }

  // checks to see if all inputs are filled
  function fieldVerification () {
    if (!name || !ID || !email || !password || !verification){
      return false;
    } else {
      return true;
    }
  }

  return (
    <View style={styles.container}>
      {/* Back Arrow to Login */}
      <TouchableOpacity 
        style={styles.menu}
        onPress={() => {
          navigation.navigate('Login')    
        }}
      >
        <Image style={styles.menuIcon} source={require("./assets/back_arrow.png")} />
      </TouchableOpacity>

      {/* App Name Header */}
      <Text style={styles.text}>Sign Up</Text>
      
      {/* Name input */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Name*"
          onChangeText={setName}
          value={name}
          underlineColorAndroid="transparent"
        />
      </View>
      {/* Employee ID input */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Employee ID*"
          onChangeText={setID}
          value={ID}
          underlineColorAndroid="transparent"
        />
      </View>
      {/* Email input */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email*"
          onChangeText={setEmail}
          value={email}
          underlineColorAndroid="transparent"
        />
      </View>
      {/* Password input */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          secureTextEntry={true}
          placeholder="Password*"
          onChangeText={setPassword}
          value={password}
          underlineColorAndroid="transparent"
        />
      </View>
      {/* Password Verification input */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          secureTextEntry={true}
          placeholder="Confirm Password*"
          onChangeText={setVerification}
          value={verification}
          underlineColorAndroid="transparent"
        />
      </View>
      {/* Sign Up Button -- Work to be done: Navigation to sign up screen */}
      <TouchableOpacity 
        style={styles.signUpBtn}
        onPress={() => createUser()}
      >
        <Text style={styles.loginText}>SIGN UP</Text>
      </TouchableOpacity>

      {/* Loading notification for development */}
      <StatusBar style="auto" />
    </View>
  );
}

export default SignUpScreen