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
import styles from './Style'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AsyncStorage } from "react-native";
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';

function DetailsScreen({ route, navigation }) {
    /* 2. Get the param */
    const { itemId, otherParam } = route.params;
    const [dailyEarning, setDailyEarning] = React.useState("$132");
    const [user, setUser] = React.useState("Driver");
  
    return (
      <View style={styles.container}>
              
        <TouchableOpacity 
            style={styles.menu}
            onPress={() => {
            alert('Open user profile page!');
            }}
        >
            <Image style={styles.menuIcon} source={require("./assets/profile.png")} />
        </TouchableOpacity>
        
        <Image style={styles.image} source={require("./assets/pj_simple.png")} />
        
        <TouchableOpacity 
            style={styles.logout} 
            onPress={() => {
                auth().signOut(),
                navigation.navigate('Home')    
            }}
        >
            <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.welcome}> 
            <Text style={styles.welcomeText}>Welcome,</Text>
            <Text style={styles.welcomeText}>"{user}"</Text>
        </View>

        <StatusBar style="auto" />

        <View style={styles.homeBreakdown}>
            <Text style={styles.largeBreakdownText}>Last Pay Period: <Text style={{color: '#DA102E'}}>10/20-10/27</Text></Text>
            <Text style={styles.largeBreakdownText}>Total Wage Earned: <Text style={{color: '#DA102E'}}>$96</Text></Text>
            <Text style={styles.largeBreakdownText}>Average Hourly Rate: <Text style={{color: '#DA102E'}}>$15.32</Text></Text>
            <Text style={styles.smallBreakdownText}>Total Hours: <Text style={{color: '#DA102E'}}>6</Text></Text>
            <Text style={styles.smallBreakdownText}>In-Store Hours: <Text style={{color: '#DA102E'}}>2.45</Text></Text>
            <Text style={styles.smallBreakdownText}>On-Road Hours: <Text style={{color: '#DA102E'}}>3.55</Text></Text>
            <Text style={styles.smallBreakdownText}>Total Miles: <Text style={{color: '#DA102E'}}>18</Text></Text>
        </View>
        <View style={styles.navBar}>
            <TouchableOpacity 
            style={styles.navBarButtons}
            onPress={() => {
                alert('Open Home Page!');
            }}
            >
            <View>
                <Image style={styles.buttonHome} source={require("./assets/home.png")} />
            </View>
            </TouchableOpacity>
            <TouchableOpacity 
            style={styles.navBarButtons}
            onPress={() => {
                alert('Open Monthly Breakdown Page!');
            }}
            >
            <View>
            <Image style={styles.buttonHome} source={require("./assets/calendar.png")} />
            </View>
            </TouchableOpacity>
        </View>

      </View>
  
      /*<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        <Button
          title="Go to Details... again"
          onPress={() =>
            navigation.push('Details', {
              itemId: Math.floor(Math.random() * 100),
            })
          }
        />
        <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>*/
    );
  }
  export default DetailsScreen