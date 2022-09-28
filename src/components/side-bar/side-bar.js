import React, {Component} from 'react';
import {Container, Content, Text, List, ListItem, Toast} from 'native-base';
import {Image, ImageBackground} from 'react-native';
import {bindActionCreators} from 'redux';
import {userActions} from '../../actions/user';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

const routes = [
  {
    component: 'GlobalProductList',
    title: 'Source Of Products',
  }, {
    component: 'CategoryList',
    title: 'Categories',
  }, {
    component: 'AttributeList',
    title: 'Attribute',
  },  {
    component: 'ProductList',
    title: 'Products',
  }, {
    component: 'ShopList',
    title: 'Shop',
  }, {
    component: 'StateList',
    title: 'Area',
  }, {
    component: 'UnitList',
    title: 'Units',
  }, {
    component: 'BrandList',
    title: 'Brands',
  },
];

class SideBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Content>
          <ImageBackground
            /*source={{
              uri: 'https://i.ebayimg.com/images/g/qDoAAOSwmBhaCfEV/s-l300.png',
            }}*/
            style={{
              height: 150,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff5b9'
            }}>
            <Image square style={{height: 80, width: 200}} source={require('../../img/chitra-logo.png')}/>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>Source Management</Text>
          </ImageBackground>
          {/*<Text style={{
            marginLeft: 18,
            marginTop: 10,
            marginBottom: 10,
            fontWeight: 'bold',
            fontSize: 20,
            fontStyle: 'italic',
          }}>Source Management</Text>*/}
          <List dataArray={routes} renderRow={route => {
            return (
              <ListItem
                button
                onPress={() => {
                  this.props.navigation.navigate(route.component);
                  this.props.navigation.closeDrawer();
                }}>
                <Text>{route.title}</Text>
              </ListItem>
            );
          }}
          />
          <List>
            <ListItem button onPress={() => {
              this.props.navigation.closeDrawer();
              AsyncStorage.clear();
              Toast.show({
                text: "Logout successfully!",
                position: 'bottom',
                duration: 1000,
              });
              this.props.logout();
              setTimeout(()=>{this.props.navigation.navigate('Auth');},5)
            }}>
              <Text>Logout</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  //console.log(state);
  return {
    user: state.user,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({logout: userActions.logout}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SideBar);