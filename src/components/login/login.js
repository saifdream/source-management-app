import React, {Component} from 'react';
import {Button, Container, Content, Form, Icon, Input, InputGroup, Text, Toast} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {userActions} from '../../actions/user';
import {Image, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class Login extends Component {
  state = {
    username: 'superadmin',
    password: '@super!admin@chitra',
  };

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    global.credential = JSON.parse(await AsyncStorage.getItem('credential'));
  }

  static async getDerivedStateFromProps(props, state) {
    //console.log(props, state)
    const credential = JSON.parse(await AsyncStorage.getItem('credential'));
    global.credential = credential;
    if (credential && credential.token) {
      props.navigation.navigate('GlobalProductList');
      Toast.show({
        text: 'Successfully logged in.',
        position: 'bottom',
        duration: 1000,
      });
    } else if (props.loginErrorStatus) {
      console.log(props.loginErrorStatus);
      Toast.show({
        text: props.loginErrorStatus,
        position: 'bottom',
        type: 'danger',
        duration: 1000,
      });
      props.resetUser();
    }
    return {};
  }

  login() {
    const credential = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.login(credential);
  }

  render() {
    return (
      <Container>
        <Content style={styles.container}>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Image style={styles.logo} source={require('../../img/chitra-logo.png')}/>
          </View>
          <Form style={styles.form}>
            <InputGroup regular>
              <Icon active style={{color: '#ffbe26'}} name='person'/>
              <Input onChangeText={(text) => this.setState({username: text})} value={this.state.username}
                     placeholder="Username"/>
            </InputGroup>
            <InputGroup regular>
              <Icon active style={{color: '#ffbe26'}} name='key'/>
              <Input secureTextEntry onChangeText={(text) => this.setState({password: text})}
                     value={this.state.password} placeholder="Password"/>
            </InputGroup>
            <Content style={{marginTop: 25}}>
              <Button block warning onPress={() => this.login()}
                      disabled={this.props.isLoading || !this.state.username || !this.state.password}>
                {
                  this.props.isLoading ?
                    <Text>Please Wait ...</Text>
                    :
                    <Text>Login</Text>
                }
              </Button>
            </Content>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  form: {
    marginLeft: 25,
    marginRight: 25,
  },
  logo: {
    width: 250,
    height: 100,
    marginTop: 100,
    marginBottom: 20,
  },
});

function mapStateToProps(state) {
  //console.log(state.user);
  return {
    user: state.user.credential || {},
    isLoading: state.user.isLoading,
    loginErrorStatus: state.user.loginErrorStatus,
    logoutErrorStatus: state.user.logoutErrorStatus,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({login: userActions.login, resetUser: userActions.resetUser}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);