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
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AsyncStorage } from "react-native";
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';

function LoginScreen({ navigation }){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const createUser = (email, password) => {
    try {
      auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
    }
  };
  //<Button title="Create" onPress={() => props.createUser(email, password)} />
  
  auth().onAuthStateChanged((user) => {
    if(user) {
      setAuthenticated(true);
    }
  })
  
  const signin = (email, password) => {
    try {
      if(auth().signInWithEmailAndPassword(email, password)){
        {
          // 1. Navigate to the Details route with params 
          navigation.navigate('Details', {
            itemId: 86,
            otherParam: "user here",
          });
        }
      }
    } catch (error) {
      alert(error);
    }
  };
  //<Button title="signin" onPress={() => props.signin(email, password)} />
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image style={styles.imageLogin} source={require("./assets/pj.png")} />
      
      
      <Text style={styles.text}>What's My Pay?</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="E-mail or phone number"
          onChangeText={setEmail}
          value={email}
          underlineColorAndroid="transparent"
        />
      </View>

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

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity 
      style={styles.loginBtn}
      onPress={() => signin(email, password)
      }>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signUpBtn}>
        <Text style={styles.loginText}>SIGN UP</Text>
      </TouchableOpacity>
    </View>


    /*<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          // 1. Navigate to the Details route with params 
          navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          });
        }}
      />
    </View>
    */
  );
}

function DetailsScreen({ route, navigation }) {
  /* 2. Get the param */
  const { itemId, otherParam } = route.params;
  const [dailyEarning, setDailyEarning] = React.useState("$132");
  const [user, setUser] = React.useState("Driver");

  auth().onAuthStateChanged((user) => {
    if(user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  })

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
                onPress={() => auth().signOut()}
                //onPress={() => navigation.navigate('Home')}
            >
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>

            <View style={styles.welcome}> 
                <Text style={styles.text}>Welcome,</Text>
                <Text style={styles.text}>"{user}"</Text>
            </View>

            <StatusBar style="auto" />

            <Text style={styles.dailyPrice}>{dailyEarning}</Text>

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

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={LoginScreen}/>
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

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

  dailyPrice: {
    fontSize: 80,
    position: "absolute",
    top: 320,
    fontWeight: 'bold',
    fontFamily: 'Roboto', 
    color: '#8f8f8f',
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
});

export default App;