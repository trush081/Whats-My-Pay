import { StatusBar } from "expo-status-bar";
import React, {useState, useEffect} from 'react';
import { 
  View, 
  Text,
  Image,
  TouchableOpacity 
} from 'react-native';
import styles from './Style'
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';

function HomeScreen({ route, navigation }) {
    //params passed from Login
    const { userID } = route.params; 
    //contains basic user information
    const [user, setUser] = React.useState("Driver");
  
    return (
      <View style={styles.container}>  
        
        {/* Button to open user profile menu */}
        <TouchableOpacity 
          style={styles.menu}
          onPress={() => {
          alert('Open user profile page!');
        }}>
          <Image style={styles.menuIcon} source={require("./assets/profile.png")} />
        </TouchableOpacity>
        
        {/* Header Image */}
        <Image style={styles.image} source={require("./assets/pj_simple.png")} />
        
        {/* Button to logout -- Work to be done: specify the user with logout function */}
        <TouchableOpacity 
          style={styles.logout} 
          onPress={() => {
            auth().signOut(),
            navigation.navigate('Login')    
        }}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* Welcome Message for user -- Work to be done: Integrate changing welcome messages */}
        <View style={styles.welcome}> 
          <Text style={styles.welcomeText}>Welcome,</Text>
          <Text style={styles.welcomeText}>"{user}"</Text>
        </View>

        {/* Breakdown statistics -- Work to be done: change from dummy data to Firestore data */}
        <View style={styles.homeBreakdown}>
          <Text style={styles.largeBreakdownText}>Last Pay Period: <Text style={{color: '#DA102E'}}>10/20-10/27</Text></Text>
          <Text style={styles.largeBreakdownText}>Total Wage Earned: <Text style={{color: '#DA102E'}}>$96</Text></Text>
          <Text style={styles.largeBreakdownText}>Average Hourly Rate: <Text style={{color: '#DA102E'}}>$15.32</Text></Text>
          <Text style={styles.smallBreakdownText}>Total Hours: <Text style={{color: '#DA102E'}}>6</Text></Text>
          <Text style={styles.smallBreakdownText}>In-Store Hours: <Text style={{color: '#DA102E'}}>2.45</Text></Text>
          <Text style={styles.smallBreakdownText}>On-Road Hours: <Text style={{color: '#DA102E'}}>3.55</Text></Text>
          <Text style={styles.smallBreakdownText}>Total Miles: <Text style={{color: '#DA102E'}}>18</Text></Text>
        </View>

        {/* Navigation Bar with Home Screen button and Calendar Screen Button
            -- Work to be done: link navigation to new pages */}
        <View style={styles.navBar}>
          {/* Home Page Button */}
          <TouchableOpacity 
            style={styles.navBarButtons}
            onPress={() => {
              alert('Open Home Page!');
          }}>
            <View>
              <Image style={styles.buttonHome} source={require("./assets/home.png")} />
            </View>
          </TouchableOpacity>
          {/* Monthly Breakdown Page Button */}
          <TouchableOpacity 
            style={styles.navBarButtons}
            onPress={() => {
              alert('Open Monthly Breakdown Page!');
          }}>
            <View>
              <Image style={styles.buttonHome} source={require("./assets/calendar.png")} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Loading notification for development */}
        <StatusBar style="auto" />
      </View>
    );
  }
  export default HomeScreen