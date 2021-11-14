import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import moment from 'moment';
import * as React from 'react';

import {Calendar} from 'react-native-calendars';
import styles from './Style';

export default class CalendarPage extends React.Component {
  state = {
      markedDates: {},
      isStartDatePicked: false,
      isEndDatePicked: false,
      startDate: '',
      maxDate: '',
      first: '',
      last: ''
  }

  /* OnDayPress  - Called on every click in the calendar */
  onDayPress = (day) => {
      if (this.state.isStartDatePicked == false) {
          let markedDates = {}
          markedDates[day.dateString] = { startingDay: true, color: '#DA102E', textColor: '#FFFFFF' };
          this.setState({
              markedDates: markedDates,
              isStartDatePicked: true,
              isEndDatePicked: false,
              startDate: day.dateString,
              first: day.dateString,
              last: ''
          });
      } else {
          let markedDates = this.state.markedDates
          let startDate = moment(this.state.startDate);
          let endDate = moment(day.dateString);
          let range = endDate.diff(startDate, 'days')
          if (range > 0) {
              for (let i = 1; i <= range; i++) {
                  let tempDate = startDate.add(1, 'day');
                  tempDate = moment(tempDate).format('YYYY-MM-DD')
                  if (i < range) {
                      markedDates[tempDate] = { color: '#DA102E', textColor: '#FFFFFF' };
                  } else {
                      markedDates[tempDate] = { endingDay: true, color: '#DA102E', textColor: '#FFFFFF' };
                  }
              }
              this.setState({
                  markedDates: markedDates,
                  isStartDatePicked: false,
                  isEndDatePicked: true,
                  startDate: '',
                  last: day.dateString
              });
          } else if (range ==0){
              let markedDates = {}
              markedDates[day.dateString] = { selected: true, startingDay: false, endingDay: false, color: '#DA102E', textColor: '#FFFFFF' };
              this.setState({
                  markedDates: markedDates,
                  isStartDatePicked: false,
                  isEndDatePicked: true,
                  startDate: '',
                  last: day.dateString
              })
          }
          else{
              alert('Select an upcoming date!');
          }
      }
  }

  render() {
      //calculate date of last saturday, which is the last pay period
      var curr = new Date();
      curr.setDate(curr.getDate() - (curr.getDay()+1));
      this.state.maxDate = curr;
      const { navigation } = this.props;
      const  { name, empID } = this.props.route.params;

      return (

          <View style={styles.mainview}>
              {/* Header Image */}
              <Image style={styles.breakImage} source={require("./assets/pj_simple.png")} />
              <Text style={styles.breakText}>Select a date range and hit the breakdown button!</Text>
              <Text>To view a single day breakdown, tap the same day twice.</Text>
              {/*Calendar component of the page */}
              <Calendar
                  maxDate={(this.state.maxDate)}
                  monthFormat={"MMMM yyyy"}
                  markedDates={this.state.markedDates}
                  markingType="period"
                  hideExtraDays={false}
                  hideDayNames={true}
                  onDayPress={this.onDayPress}
              />
              {/* Breakdown Button - sends user to breakdown screen*/}
              <TouchableOpacity 
                  style={styles.breakdownBtn}
                  onPress={() => {
                    //make sure that user selected a complete date range
                    if(this.state.first == '' || this.state.last == '')
                      alert("Please select a start date and end date.")
                    else{
                      //dates will be sent to the breakdown page in format YYYY-MM-DD
                    console.log(this.state.first)
                    console.log(this.state.last) 
                    }  
                  }}
                >
                <Text style={styles.loginText}>BREAKDOWN</Text>
              </TouchableOpacity>
              {/* Navigation Bar with Home Screen button and Calendar Screen Button
            -- Work to be done: link navigation to new pages */}
            <View style={styles.navBar}>
              {/* Home Page Button - navigate back to home screen*/}
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
              {/* Monthly Breakdown Page Button */}
              <TouchableOpacity 
                style={styles.navBarButtons}
                onPress={() => {
                  //do nothing because you are already on the calendar screen
                }}>
                <View>
                  <Image style={styles.buttonHome} source={require("./assets/calendar.png")} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
      );
  }
} 