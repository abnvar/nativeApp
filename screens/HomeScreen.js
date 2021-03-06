import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Animated, Linking, WebView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>

          <Image
            style={{position:'relative',height:100, width:100, borderRadius:100}}
            source={require("../assets/images/bg.gif")}
          />
        </View>

        <View style={styles.getStartedContainer}>

          <Text style={styles.getStartedText}>
            Hi, welcome to the app.
          </Text>
        </View>

      </ScrollView>

      <TouchableOpacity style={styles.signupBarInfoContainer} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.tabBarInfoText}>Signup</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBarInfoContainer} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.tabBarInfoText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.instaLoginBarInfoContainer} onPress={() => navigation.navigate('Instagram Login')}>
        <Text style={styles.tabBarInfoText}>Login with:  </Text>
        <View style={{width:5}}></View>
        <Image
          style={{width:30, height:30}}
          source={
              require('../assets/images/instagram_logo.png')
          }
        />
        <Text style={styles.tabBarInfoText}> Instagram</Text>
      </TouchableOpacity>
    </View>
  );
}

HomeScreen.navigationOptions = {
  headerMode: 'none',
};

function handleUrl(url) {
  console.log(url);
  WebBrowser.dismissBrowser();
}

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use useful development
        tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 175,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  signupBarInfoContainer: {
    position: 'absolute',
    bottom: 72,
    left: 0,
    right: 0,
    width: '49.5%',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  loginBarInfoContainer: {
    position: 'absolute',
    bottom: 72,
    left: '50.5%',
    right: 0,
    width: '49.5%',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  instaLoginBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
