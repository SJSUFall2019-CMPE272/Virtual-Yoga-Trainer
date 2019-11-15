import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View,Alert } from 'react-native';
import * as firebase from 'firebase';
import { Input } from './components/Input';
import { Button } from './components/Button';
import { Home } from './components/Home';
import { Learn } from './components/Learn';
import * as GoogleSignIn from 'expo-google-sign-in';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

class App extends React.Component {
  state = {
    email: '',
    password: '',
    authenticating: false,
    authenticated: false
  }

componentWillMount() {
  const firebaseConfig = {
    apiKey: 'AIzaSyB_6t3KQ59Jdj_g409uqU35fyWr_ja62tI ',
    authDomain: 'virtualtrainer-17743.firebaseapp.com ',
  }

  firebase.initializeApp(firebaseConfig);
}

onPressSignIn() {
  this.setState({
    authenticating: true,
  });
  firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
  .then(() => {
    this.setState({ authenticating: false, authenticated: true });
    const {navigate} = this.props.navigation;
    navigate('Home', {});
  }, (error) => {
    Alert.alert(error.message);
    this.setState({
      authenticating: false
    });
  });
}

onPressSignUp() {
  try {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
  } catch (error) {
    console.log(error.toString(error));
  }
}


signInAsync = async () => {
  try {
    await GoogleSignIn.initAsync({ clientId: '<YOUR_IOS_CLIENT_ID>' });
  } catch ({ message }) {
    alert('GoogleSignIn.initAsync(): ' + message);
  }  
  try {
    await GoogleSignIn.askForPlayServicesAsync();
    const { type, user } = await GoogleSignIn.signInAsync();
    if (type === 'success') {
      this.setState({ authenticated: true });
      const {navigate} = this.props.navigation;
      navigate('Home', {});
    }
  } catch ({ message }) {
    alert('login: Error:' + message);
  }
};

signOutAsync = async () => {
  try {
    await GoogleSignIn.signOutAsync();
    this.setState({ user: null });
  } catch ({ message }) {
    alert('signOutAsync: ' + message);
  }
};


renderCurrentState() {
  if (this.state.authenticating) {
    return (
      <View style={styles.form}>
        <ActivityIndicator size='large' />
      </View> 
    );
  }
    return (
      <View style={styles.form}>
      <Input placeholder='Enter your email...' label='Email' onChangeText={email => this.setState({email})} value={this.state.email}/>
      <Input placeholder='Enter your password...' label='Password' secureTextEntry onChangeText={password => this.setState({password})} value={this.state.password}/>
      <Button onPress={() => this.onPressSignIn()}>Login</Button>
      <Button onPress={() => this.onPressSignUp()}>Signup</Button>
      <Button onPress={() => this.signInAsync()}>Google Login</Button>
      </View>
    );
}

render() {
  return (
    <View style={styles.container}>{this.renderCurrentState()}</View>
  );
}
}

const AppNavigator = createStackNavigator({
  Login: {
    screen: App
  },
  Home: {
    screen: Home,
  },
  Learn: {
    screen: Learn,
  }
},
  {
    initialRouteName: 'Login',
  }
);

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  form: {
    flex: 1
  }
});
