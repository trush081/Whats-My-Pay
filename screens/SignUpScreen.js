  //saving code here for sign in page
  /*const createUser = (email, password) => {
    try {
      auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
    }
  };
  //Example: <Button title="Create" onPress={() => props.createUser(email, password)} />
  */

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

function SignUpScreen({ navigation }){
  // User credential information
  const [name, setName] = useState('');
  const [ID, setID] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verification, setVerification] = useState('');

  const createUser = () => {
    if (fieldVerification()) {
      if (verifyPass()) {
        firestore().collection("Employees").doc(ID).onSnapshot(doc => {
          if (doc.exists){
            authCreate()
          } else {
            alert("Employee ID does not exist.")
          }
        });
      } else {
        alert("Passwords do not match.")
      }
    } else {
      alert("All fields must be filled!")
    }
  };
  //Example: <Button title="Create" onPress={() => props.createUser(email, password)} />

  function authCreate(){
    try{
      auth().createUserWithEmailAndPassword(email, password).then(() => {
        addToFirestore();
      })
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('User has already created account!');
        console.log(error);
      }
      if (error.code === 'auth/invalid-email') {
        alert('That email address is invalid!');
        console.log(error);
      }
      if (error.code === 'auth/weak-password') {
        alert('Password is not strong enough.');
        console.log(error);
      }
    }
  }

  function addToFirestore(){
    firestore().collection('Employees').doc(ID).update({
      Email: email,
      Name: name,
    }).then(() => {
      navigation.navigate('Home', {
        name: name,
        empID: ID,
      })
      alert('Account successfully created!');
    })
  }

  function verifyPass(){
    if (password === verification) {
      return true;
    } else {
      return false;
    }
  }

  function fieldVerification () {
    if (!name || !ID || !email || !password || !verification){
      return false;
    } else {
      return true;
    }
  }

  return (
    <View style={styles.container}>

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