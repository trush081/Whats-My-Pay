import {
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  // General
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 'auto'
  },

  text: {
    fontSize: 50,
    paddingBottom: 60,
    fontWeight: 'bold',
    fontFamily: 'Roboto', 
    color: '#008E6A'
  },
  
  // Home Screen
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

  welcomeText: {
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'Roboto', 
    color: '#008E6A'
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

  //Login Screen
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

  inputViewID: {
    backgroundColor: "lightgrey",
    borderRadius: 10,
    borderColor: "#008E6A",
    borderWidth: 3,
    width: "70%",
    height: 45,
    marginBottom: 20,
    textAlign: 'left',

  },

  inputViewPass: {
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

  forgotButtonText: {
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

  textHeader: {
    fontSize: 50,
    paddingBottom: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto', 
    color: '#008E6A',

  },

  imageLogin: {
    height: '30%'

  },

  //Forgot Password Modal
  centeredModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 30,
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingVertical: 30,
    paddingHorizontal: 50,
    alignItems: "center",
    shadowColor: "#008E6A",
    borderColor: "#008E6A",
    borderWidth: 3,
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 30
  },

  modalArrow: {
    paddingTop: 20,
  },

  modalText: {
    textAlign: "center",
    fontSize: 30,
    paddingBottom: 60,
    fontWeight: 'bold',
    fontFamily: 'Roboto', 
    color: '#008E6A',
    paddingBottom: 30
  },
  modalInput: {
    backgroundColor: "lightgrey",
    borderRadius: 10,
    borderColor: "#008E6A",
    borderWidth: 3,
    width: 200,
    height: 45,
    marginBottom: 20,
    textAlign: 'left',
  },
  forgotModal: {
    width: 150,
    color: "white",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#DA102E",
  },

  //Calendar Screen
  calContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center'
},

  breakdownBtn: {
    width: "50%",
    color: "white",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#008E6A",
    marginTop: 25
  },

  mainview: {
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },

  breakText: {
    paddingTop: 35,
  },

  breakImage: {
    position: "absolute",
    top: 40,
    resizeMode: 'contain',
    width: '60%',
    height: '12%',
    flex: 1,
    paddingBottom: 20
  },

});

export default styles