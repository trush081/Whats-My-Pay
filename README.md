# What's My Pay

What's My Pay is a mobile application that is used to help delivery drivers for Papa John's see their paycheck data broken down based on various information inlcuing in-store hours verses driving hours with tips. 

## Setting Up Development Environment

Use the React-Native [Setting Up The Development Environment](https://reactnative.dev/docs/environment-setup) to get a development environment set up.

Using the Expo Client is not recommended. There is a lot more that would need to be done with navigation and Firebase in order to get this to work.
To get the application running quickly and save some time later, it is recommended that an Android development environment is used. 

## Usage

Start by running the Metro Bundler:
```bash
npx react-native start
```

In a seperate terminal, run:
```bash
npx react-native run-android
```
# Future Development

The [/screens](https://github.com/trush081/Whats-My-Pay/tree/master/screens) folder is where each page is found along with included assets and stylesheet on Style.js.

App.js is where navigation references are found for each page. For more information on the navigation used within the application, visit the [React Navigation](https://reactnavigation.org/docs/getting-started) website.

What's My Pay uses Firebase Authentication for login credentials through email and password. 
  --
  
