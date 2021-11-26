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

function Breakdown({ route, navigation }) {
    //params passed from Login and Calendar Screens
    const {name, empID, first, last} = route.params;
    const [empInfo, setempInfo] = useState();
    const [lastPeriod, setlastPeriod] = useState();
    const [totalwage, settotalwage] = useState(0.0);
    const [totalhrs, settotalhrs] = useState(0.0);
    const [hourlywage, sethourlywage] = useState(0.0);
    const [storeHrs, setstrhrs] = useState(0.0);
    const [driveHrs, setdrivehrs] = useState(0.0);
    const [miles, setmiles] = useState(0.0);
    const [tips, settips] = useState(0.0);
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

        
        //first calculate beginnning and end dates that were selected from Calendar
        var startPeriod = new Date(first);
        
        //For end date, we need to add an extra day to the date
        var endPeriod = new Date(last);
        endPeriod.setDate(endPeriod.getDate()+1);

        //Set first date selected from Calendar
        setdate1(first);
        
        //Set second date selected from Calendar
        setdate2(last);



        try {
          //finds the document in firestore within date range
          const last = await firestore().collection("Employees").doc(empID).collection("Shifts").where("date", '>=', startPeriod).where("date", '<=', endPeriod)
          last.get().then((querysnapshot) => {
            //temporarily push all docs into list then set lastPeriod
            const tempDoc = []
            querysnapshot.forEach((doc) => {
            //console.log(doc);
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

    //using lastPeriod, calculate all data for the breakdown screen
    //total pay, total hours, average $/hr, store hrs, drive hrs, miles, tips
    const calculate = () => {
        settotalhrs(0);
        var wage_running_total = 0.0;
        var hours_running_total = 0.0;  
        var storeHrs = 0.0;  
        var driveHrs = 0.0;
        var empTips = 0.0;    
        var milesDriven = 0.0;
        
        try {
          lastPeriod.forEach((entry) => {
            
            wage_running_total += entry.drive_hrs*empInfo.drive_rate;
            wage_running_total += entry.store_hrs*empInfo.store_rate;
            wage_running_total += entry.tips;
            storeHrs += entry.store_hrs;
            driveHrs += entry.drive_hrs;
            empTips += entry.tips;
            milesDriven += entry.miles;
            hours_running_total += entry.drive_hrs;
            hours_running_total += entry.store_hrs;
            
          })
          setstrhrs(storeHrs);
          setdrivehrs(driveHrs.toFixed(2));
          setmiles(milesDriven);
          settips(empTips.toFixed(2));
          settotalwage(wage_running_total.toFixed(2));
          settotalhrs(hours_running_total.toFixed(2));
          if(wage_running_total > 0 & hours_running_total >0){
            var avg = wage_running_total/hours_running_total;
            avg = avg.toFixed(2);
            sethourlywage(avg);
          }
        } catch(e){
          console.log(e)
        }
        
    }

    //load all information when screen loads
    useEffect(() => {
      loadData();
    }, []);

    //once lastPeriod is updated with data, calculate
    useEffect(() => {
      calculate()
    });


    return (
      <View style={styles.container}>  
        
        {/* Header Image */}
        <Image style={styles.image} source={require("./assets/pj_simple.png")} />

        {/* Message to show driver which dates were selected */}
        <View style={styles.welcome}> 
                    <Text style={styles.largeBreakdownText}><Text style={{color: '#DA102E'}}>Date(s) Selected:</Text></Text>
                    <Text style={styles.largeBreakdownText}>{first} <Text style={{color: '#DA102E'}}>to</Text> {last}</Text>
        </View>

        {/* Breakdown statistics */}
        <View style={styles.homeBreakdown}>
          <Text style={styles.largeBreakdownText}>Total Wage Earned: <Text style={{color: '#DA102E'}}>${totalwage}</Text></Text>
          <Text style={styles.largeBreakdownText}>Total Hours: <Text style={{color: '#DA102E'}}>{totalhrs}</Text></Text>
          <Text style={styles.largeBreakdownText}>Average Hourly Rate: <Text style={{color: '#DA102E'}}>${hourlywage}</Text></Text>
          <Text style={styles.largeBreakdownText}>In-Store Hours: <Text style={{color: '#DA102E'}}>{storeHrs}</Text></Text>
          <Text style={styles.largeBreakdownText}>On-Road Hours: <Text style={{color: '#DA102E'}}>{driveHrs}</Text></Text>
          <Text style={styles.largeBreakdownText}>Claimed Tips: <Text style={{color: '#DA102E'}}>${tips}</Text></Text>
          <Text style={styles.largeBreakdownText}>Miles Driven: <Text style={{color: '#DA102E'}}>{miles}</Text></Text>          
        </View>

        {/* Navigation Bar with Home Screen button and Calendar Screen Button */}
        <View style={styles.navBar}>
          {/* Home Page Button */}
          <TouchableOpacity 
            style={styles.navBarButtons}
            onPress={() => {
                navigation.navigate('Home', {
                    name: name,  
                    empID: empID,
                  });
          }}>
            <View>
              <Image style={styles.buttonHome} source={require("./assets/home.png")} />
            </View>
          </TouchableOpacity>
          
          
        </View>
          
        {/* Back arrow takes driver to Calendar screen */}
        <StatusBar style="auto" />
        <TouchableOpacity 
                style={styles.menu}
                    onPress={() => {
                    navigation.navigate('Calendar', 
                    {
                    name: name,
                    empID: empID,
                    }); 
                }}
        >
        <Image style={styles.menuIcon} source={require("./assets/back_arrow.png")} />
      </TouchableOpacity>
      </View>
      
    );
  }
  export default Breakdown