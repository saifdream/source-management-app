import React, {Component} from 'react';
import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';
import App from './src/App';
import Provider from 'react-redux/lib/components/Provider';
import store from './src/store';

export default class SourceManagement extends Component {
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    );
  }
}

//AppRegistry.registerComponent(appName, () => SourceManagement);
AppRegistry.registerComponent(appName, () => SourceManagement, true);