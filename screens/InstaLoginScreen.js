import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import {WebView} from 'react-native-webview'


let code = '';
let access_token_retrieved = 0;
let access_token = 0;
let user_id = 0;
let username = null;

let navigateToMain = 0

export default function InstaLoginScreen({ navigation }) {
  navigateToMain = () => {
    navigation.navigate('Main');
  }
  return (
    <WebView style={styles.contentContainer}
       source={{uri:"https://api.instagram.com/oauth/authorize?client_id=523772874878112&redirect_uri=https://abnvar.htmlsave.com/&scope=user_profile,user_media&response_type=code"}}
       onNavigationStateChange={_onNavigationStateChange}
     />
  );
}

async function _onNavigationStateChange(webViewState){
  if (webViewState.url.slice(0,29) == "https://abnvar.htmlsave.net/?") {
    code = webViewState.url.slice(34,-2);

    let form = new FormData();

    form.append('client_id', '523772874878112');
    form.append('client_secret', 'cdff5963e73137c6604e2133611763b1');
    form.append('grant_type', 'authorization_code');
    form.append('redirect_uri', 'https://abnvar.htmlsave.com/');
    form.append('code', code);

    const response = await fetch('https://api.instagram.com/oauth/access_token', {
      method: 'POST',
      body: form,
    }).then(response => response.json()).then(setAccessToken).catch((error) => {console.error('Error:', error);});
  }
}

function setAccessToken(data) {
  if (access_token_retrieved == 0 && data.access_token != undefined) {
    access_token = data.access_token;
    user_id = data.user_id;
    access_token_retrieved = 1;
    getUserData();
  }
}

async function storeUsername() {
  await AsyncStorage.setItem('username', username);
}

async function getUserData() {
  let url = 'https://graph.instagram.com/me?fields=id,username&access_token='+access_token;
  fetch(url, {method: 'GET'}).then(response => response.json()).then((response) => {username = response.username; storeUsername();}).then(navigateToMain()).catch((error) => {console.error('Error:', error);});
}

{/*
function getName() {
  let url = 'https://www.instagram.com/'+username+'/?__a=1';
  fetch(url, {method: 'GET'}).then(response => response.json()).then((response) => {console.log(response);}).catch((error) => {console.error('Error:', error);});
}
*/}

{/*}
let response = fetch('https://api.instagram.com/v1/users/self/?access_token='+code, {
   method: 'GET'
})
console.log(response);
*/}

  {/* return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <OptionButton
        icon="md-school"
        label="Read the Expo documentation"
        onPress={() => WebBrowser.openBrowserAsync('https://docs.expo.io')}
      />

      <OptionButton
        icon="md-compass"
        label="Read the React Navigation documentation"
        onPress={() => WebBrowser.openBrowserAsync('https://reactnavigation.org')}
      />

      <OptionButton
        icon="ios-chatboxes"
        label="Ask a question on the forums"
        onPress={() => WebBrowser.openBrowserAsync('https://forums.expo.io')}
        isLastOption
      />
    </ScrollView>
  ); */}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
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
