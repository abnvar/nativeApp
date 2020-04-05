import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import {WebView} from 'react-native-webview'

import firebase from 'firebase'

let config = {
    databaseURL: "https://t-estproject.firebaseio.com/",
    projectId: "t-estproject",
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}


function writeUserData(email,fname,lname){
    firebase.database().ref('Users/').set({
        email,
        fname,
        lname
    }).then((data)=>{
        //success callback
        console.log('data ' , data)
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    })
}

writeUserData('hello@yo.com', 'mera naam', 'chin chin chu');

let navigateToMain = 0

export default function SignupScreen({ navigation }) {
  navigateToMain = () => {
    navigation.navigate('Main');
  }
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>

          <Text style={styles.getStartedText}>
            This is signup screen.
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 0,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});
