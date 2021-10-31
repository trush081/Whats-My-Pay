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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 'auto'
    },
   
    imageLogin: {
      marginBottom: 0,
    },
  
    menu: {
      position: "absolute",
      top: 35,
      left: 10,
    },
  
    menuIcon: {
      height: 40,
      width: 40,
      tintColor: "#DA102E"
    },
  
    logout: {
      position: "absolute",
      top: 40,
      right: 15
    }, 
  
    logoutText: {
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: 'Roboto', 
      color: '#DA102E'
    },
  
    welcome: {
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: 170
    },
  
    image: {
      position: "absolute",
      top: 40,
      resizeMode: 'contain',
      width: '60%',
      height: '12%',
      flex: 1
    },

  
    navBar: {
      backgroundColor: '#008E6A',
      height: 50,
      width: "100%",
      justifyContent: 'space-evenly',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      flexDirection: "row",
      flexWrap: "wrap",
    },
  
    navBarButtons: {
      justifyContent: "center", 
      height: "100%", 
      flex:1, 
      alignItems: "center"
    },
  
    buttonHome: {
      height: 40,
      width: 40,
      tintColor: "#fff",
      
    },
  
    buttonCalendar: {
      height: 40,
      width: 40,
      tintColor: "#fff"
    },
    
    text: {
      fontSize: 50,
      paddingBottom: 60,
      fontWeight: 'bold',
      fontFamily: 'Roboto', 
      color: '#008E6A'
    },
  
    welcomeText: {
      fontSize: 50,
      fontWeight: 'bold',
      fontFamily: 'Roboto', 
      color: '#008E6A'
    },

    inputView: {
      backgroundColor: "lightgrey",
      borderRadius: 10,
      borderColor: "#008E6A",
      borderWidth: 3,
      width: "70%",
      height: 45,
      marginBottom: 20,
      textAlign: 'left',
    },
   
    TextInput: {
      height: 50,
      flex: 1,
      padding: 10,
      marginLeft: 20,
      color: 'black',
      justifyContent: "center",
    },
   
    forgot_button: {
      height: 30,
      marginBottom: 30,
      fontWeight: 'bold',
      fontSize: 15,
    },
   
    loginBtn: {
      width: "50%",
      color: "white",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 30,
      backgroundColor: "#DA102E",
    },
    signUpBtn: {
      width: "50%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
      marginBottom: 60,
      backgroundColor: "#DA102E",
    },
  
    loginText: {
      color: 'white',
      fontWeight: 'bold',
    },

    homeBreakdown: {
      position: 'absolute',
      top: 350,
      alignItems: "center",
      justifyContent: "center",
    },

    largeBreakdownText: {
      fontSize: 28,
      fontWeight: 'bold',
      fontFamily: 'Roboto', 
      color: '#008E6A',
      marginBottom: 5
    },

    smallBreakdownText: {
      fontSize: 25,
      fontWeight: 'bold',
      fontFamily: 'Roboto',
      color: '#008E6A',
      marginTop: 5
    },
  });

  export default styles