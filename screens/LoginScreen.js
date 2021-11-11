import { StatusBar } from "expo-status-bar";
import React, {useState, useEffect} from 'react';
import {
  View, 
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  // sign in: takes employeeID and password, translated to stored email in firestore,
  // authenticats user using email and password authentication from firebase
  const signin = (ID, password) => {
    try {
      if (ID == "" || password == ""){
        Alert.alert("Invalid", "Employee ID or Password are incorrect")
      } else {
        //finds the document in firestore with name of Employee ID
        firestore().collection("Employees").doc(ID).onSnapshot(doc => {
          if (doc.exists){
            // gather email field from firebase
            //firebase user authentication with email and password
            var user = auth().signInWithEmailAndPassword(doc.data().Email, password);
            if (user){
              {
                // Navigate to the Details route with params, User's Name
                navigation.navigate('Home', {
                  name: doc.data().Name,
                  empID: ID,
                });
                setID('');
                setPassword('');
              }
            }
          } else {
            // Error if the user does not exist or lack of information
            // -- Work to be done: specify errors for user
            Alert.alert("Oops", "Incorrect Email or Password.");
            
          }
        });
      }
    } catch (error) {
      alert(error);
    }
  };
  //Example: <Button title="signin" onPress={() => props.signin(email, password)} />


  // Password Reset function
  const passwordReset = () => {
    if (email === ""){
      Alert.alert("Invalid", "No email submitted.")
    }else{
      auth().sendPasswordResetEmail(email).then(
      setModalVisible(!modalVisible),
      Alert.alert("Email Sent", "Check your inbox for a link to reset your password."),
      ).catch(error => 
        Alert.alert("Check Email", "The email you submitted might not exist.") 
      )
    }
  };

  // Auto Loggin
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('user is logged');
        firestore().collection("EmployeeIDs").doc(user.email).onSnapshot(doc => {
          if (doc){
            firestore().collection("Employees").doc(doc.data().userID).onSnapshot(page =>{
              {
                // Navigate to the Details route with params, User's Name
                navigation.navigate('Home', {
                  name: page.data().Name,
                  empID: doc.data().userID,
                });
              }
            });
          }
        });
      }
    });
  }, []);



  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredModal}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Password Reset</Text>
            <View style={styles.modalInput}>
              <TextInput
                style={styles.TextInput}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                underlineColorAndroid="transparent"
              />
            </View>
            <TouchableOpacity 
              style={styles.forgotModal}
              onPress={() => {
                passwordReset();
              }}
            >
              <Text style={styles.loginText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Header Image */}
      <Image style={styles.imageLogin} source={require("./assets/pj.png")} />
      {/* App Name Header */}
      <Text style={styles.textHeader}>What's My Pay?</Text>
      
      {/* Work to be done: Make input field clear apon logout */}
      {/* Employee ID input */}
      <View style={styles.inputViewID}>
        <TextInput
          style={styles.TextInput}
          placeholder="Employee ID"
          onChangeText={setID}
          value={ID}
          underlineColorAndroid="transparent"
        />
      </View>
      {/* Password input */}
      <View style={styles.inputViewPass}>
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
      <TouchableOpacity style={styles.forgotButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.forgotButtonText}>Forgot Password?</Text>
      </TouchableOpacity>
      {/* Login Button */}
      <TouchableOpacity 
        style={styles.loginBtn}
        onPress={() => signin(ID, password)}
        >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      {/* Sign Up Button -- Work to be done: Navigation to sign up screen */}
      <TouchableOpacity 
        style={styles.signUpBtn}
        onPress={() => {
          navigation.navigate('SignUp')    
        }}
      >
        <Text style={styles.loginText}>SIGN UP</Text>
      </TouchableOpacity>

      {/* Loading notification for development */}
      <StatusBar style="auto" />
    </View>
  );
}

export default LoginScreen