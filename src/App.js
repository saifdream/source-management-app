import React, {Component, Fragment} from 'react';
import {SafeAreaView, View, StatusBar, ActivityIndicator, StyleSheet} from 'react-native';
import {Root} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import SideBar from './components/side-bar/side-bar';
import {AppStackNavigator} from './components/app-navigations';
import {LoginStackNavigator} from './components/login/login-navigations';
import NavigationService from './services/navigation-service';

class AuthLoadingScreen extends Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    let credential = JSON.parse(await AsyncStorage.getItem('credential'));
    //console.log(credential);
    global.credential = credential;

    this.props.navigation.navigate(credential && credential.token ? 'App' : 'Auth');
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator/>
        <StatusBar barStyle="default"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class App extends Component {
  render() {
    return (
      <Root>
        <Fragment>
          <StatusBar style={{backgroundColor: '#ffbe26', barStyle: 'light-content'}}/>
          <AppContainer ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}/>
        </Fragment>
      </Root>
    );
  }
}

const AppDrawerNavigator = createDrawerNavigator({
  Stack: {
    screen: AppStackNavigator,
  },
  /*Plain: {
    screen: Login,
  },*/
}, {
  initialRouteName: 'Stack',
  contentComponent: props => <SideBar {...props} />,
});

const AppNavigator = createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  App: AppDrawerNavigator,
  Auth: LoginStackNavigator,
}, {
  initialRouteName: 'AuthLoading',
});

const AppContainer = createAppContainer(AppNavigator);

/*const MainNavigator = createStackNavigator({
    Welcome: {screen: Welcome},
    RepoList: {screen: RepoList},
    RepoInfo: {screen: RepoInfo},
});*/

/*const App = HomeScreen;

export default App;*/
