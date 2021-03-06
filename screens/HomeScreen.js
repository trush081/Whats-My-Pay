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
    const {user, name, empID} = route.params;
    const [empInfo, setempInfo] = useState();
    const [lastPeriod, setlastPeriod] = useState();
    const [totalwage, settotalwage] = useState(0.0);
    const [totalhrs, settotalhrs] = useState(0.0);
    const [hourlywage, sethourlywage] = useState(0.0);
    const [date1, setdate1] = useState("");
    const [date2, setdate2] = useState("");

    
    const loadData = async () => {
        //first get employee info - wage rates
        try {
          //finds the document in firestore with name of Employee ID
          firestore().collection("Employees").doc(empID).onSnapshot(doc => {
            if (doc.exists){
              setempInfo(doc.data());
            } else {
              // Error if the user does not exist or lack of information
              // -- Work to be done: specify errors for user
              alert("Error");
            }
          });
        } catch (error) {
          alert(error);
          console.log(error)
        }

        //now get info for shifts from past pay period
        //first calculate beginnning and end dates
        var tempdate = new Date();
        var startPeriod = new Date(tempdate.getFullYear(), tempdate.getMonth(), tempdate.getDate());
        // set to Sunday of this week
        startPeriod.setDate(startPeriod.getDate() - startPeriod.getDay());
        // set to previous Sunday
        startPeriod.setDate(startPeriod.getDate() - 7);
        // create new date for end of period
        var endPeriod = new Date(startPeriod.getFullYear(), startPeriod.getMonth(), startPeriod.getDate() + 7);
        var temp = startPeriod.getMonth()+1 + "/" + startPeriod.getDate();
        setdate1(temp);
        temp = endPeriod.getMonth()+1 + "/" + (endPeriod.getDate()-1);
        setdate2(temp);
        //set end date time to 23:59:59
        endPeriod.setMilliseconds(endPeriod.getMilliseconds()-1)
        try {
          //finds the document in firestore within date range
          const last = await firestore().collection("Employees").doc(empID).collection("Shifts").where("date", '>=', startPeriod).where("date", '<=', endPeriod)
          last.get().then((querysnapshot) => {
            //temporarily push all docs into list then set lastPeriod
            const tempDoc = []
            querysnapshot.forEach((doc) => {
              tempDoc.push(
                {drive_hrs:doc.data().drive_hrs,
                  store_hrs:doc.data().store_hrs,
                  tips:doc.data().tips,
                  miles:doc.data().miles,
                });   
              setlastPeriod(tempDoc);               
              })       
            })
            .catch((error) =>{
              console.log("error gettin doc");
            })
        } catch (error) {
          console.log("Get Last Period error");
          alert(error);
        }
    }

    //using lastPeriod, calculate all data for the homescreen
    //total pay, total hours, average $/hr
    const calculate = () => {
        settotalhrs(0);
        var wage_running_total = 0.0;
        var hours_running_total = 0.0;        
        try {
          lastPeriod.forEach((entry) => {
            wage_running_total += entry.drive_hrs*empInfo.drive_rate;
            wage_running_total += entry.store_hrs*empInfo.store_rate;
            wage_running_total += entry.tips;
            hours_running_total += entry.drive_hrs;
            hours_running_total += entry.store_hrs;
          })
          settotalwage(wage_running_total.toFixed(2));
          settotalhrs(hours_running_total.toFixed(2));
          if(wage_running_total > 0 & hours_running_total >0){
            var avg = wage_running_total/hours_running_total;
            avg = avg.toFixed(2);
            sethourlywage(avg);
          }
        } catch(e){}
    }

    //load all information when screen loads
    useEffect(() => {
      loadData()   
    }, []);

    //calculate statistics using data from lastPeriod
    useEffect(() => {
      calculate()
    });
  

    return (
      <View style={styles.container}>  
        
        {/* Header Image */}
        <Image style={styles.image} source={require("./assets/pj_simple.png")} />
        
        {/* Button to logout */}
        <TouchableOpacity 
          style={styles.logout} 
          onPress={() => {
            auth().signOut(user),
            console.log("User is no longer logged"),
            navigation.navigate('Login')    
        }}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* Welcome Message for user -- Work to be done: Integrate changing welcome messages */}
        <View style={styles.welcome}> 
          <Text style={styles.welcomeText}>Welcome,</Text>
          <Text style={styles.welcomeText}>{name}</Text>
        </View>

        {/* Breakdown statistics -- Work to be done: change from dummy data to Firestore data */}
        <View style={styles.homeBreakdown}>
          <Text style={styles.largeBreakdownText}>Last Pay Period: <Text style={{color: '#DA102E'}}>{date1}-{date2}</Text></Text>
          <Text style={styles.largeBreakdownText}>Total Wage Earned: <Text style={{color: '#DA102E'}}>${totalwage}</Text></Text>
          <Text style={styles.largeBreakdownText}>Total Hours: <Text style={{color: '#DA102E'}}>{totalhrs}</Text></Text>
          <Text style={styles.largeBreakdownText}>Average Hourly Rate: <Text style={{color: '#DA102E'}}>${hourlywage}</Text></Text>
        </View>

        {/* Navigation Bar with Home Screen button and Calendar Screen Button
            -- Work to be done: link navigation to new pages */}
        <View style={styles.navBar}>
          {/* Home Page Button */}
          <TouchableOpacity 
            style={styles.navBarButtons}
            onPress={() => {
              //do nothing, already on the home page
          }}>
            <View>
              <Image style={styles.buttonHome} source={require("./assets/home.png")} />
            </View>
          </TouchableOpacity>
          {/* Monthly Breakdown Page Button */}
          <TouchableOpacity 
            style={styles.navBarButtons}
            onPress={() => {
              navigation.navigate('Calendar', {
                name: name,
                empID: empID,
              });
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