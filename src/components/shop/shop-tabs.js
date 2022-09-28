import React, {Component} from 'react';
import {Container, Header, Tab, Tabs, Text, Left, Button, Icon, Body, Title, Right} from 'native-base';
import {Linking, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import ContactPersonList from './contact-person/person-list';
import ContactPerson from './contact-person/person';
import ShopInfo from './shop-info';
import ShopImageList from './images/image-list';
import SourceProductList from './source-product/source-product-list';
import {bindActionCreators} from 'redux';
import {getImageList, imageSelected} from '../../actions/shop/image';
import {getPersonList, personSelected} from '../../actions/shop/source-product/person';
import {getSourceProductListByShop, sourceProductSelected} from '../../actions/shop/source-product/source-product';

class ShopTabs extends Component {
  //_didFocusSubscription;
  state = {
    tabIndex: 0,
  };

  constructor(props) {
    super(props);
    this.getUpdatedList();

    /*this._didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      payload => {
        this.getUpdatedList();
      },
    );*/
  }

  getUpdatedList() {
    const {tabIndex} = this.state;
    const {getSourceProductList, getPersonList, getImageList, activeShop} = this.props;
    switch (tabIndex) {
      case 0:
        break;
      case 1:
        getSourceProductList(activeShop.id);
        break;
      case 2:
        getPersonList(activeShop.id);
        break;
      case 3:
        getImageList(activeShop.id);
        break;
      default:
        break;
    }
  }

  componentWillUnmount() {
    //this._didFocusSubscription && this._didFocusSubscription.remove();
  }

  call(contact) {
    Linking.openURL(`tel:${contact}`);
  }

  getTabAction() {
    const {navigation, activeShop, getImageList, imageSelected, getPersonList, personSelected, getSourceProductList, sourceProductSelected} = this.props;
    const {tabIndex} = this.state;
    switch (tabIndex) {
      case 0:
        return (
          <Button transparent iconLeft onPress={() => this.call(activeShop.contact)}>
            <Icon name='call'/>
          </Button>
        );
      case 1:
        getSourceProductList(activeShop.id);
        return (
          <Button transparent iconLeft onPress={() => {
            navigation.push('SourceProduct');
            sourceProductSelected(null);
          }}>
            <Icon name='md-add'/><Text>New</Text>
          </Button>
        );
      case 2:
        getPersonList(activeShop.id);
        return (
          <Button transparent iconLeft onPress={() => {
            navigation.push('ContactPerson');
            personSelected(null);
          }}>
            <Icon name='md-add'/><Text>New</Text>
          </Button>
        );
      case 3:
        getImageList(activeShop.id);
        return (
          <Button transparent iconLeft onPress={() => {
            navigation.push('ShopImage');
            imageSelected(null);
          }}>
            <Icon name='md-add'/><Text>New</Text>
          </Button>
        );
      default:
        return;
    }
  }

  render() {
    const {navigation, activeShop} = this.props;
    return (
      <Container>
        <Header hasTabs style={{backgroundColor: '#ffbe26', barStyle: 'light-content'}}>
          <StatusBar
            backgroundColor="#ffbe26"
            barStyle="light-content"/>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name='arrow-back'/>
            </Button>
          </Left>
          <Body>
            <Title>{activeShop.name}</Title>
          </Body>
          <Right>
            {
              this.getTabAction()
            }
          </Right>
        </Header>
        <Tabs onChangeTab={(tab) => {
          this.setState({tabIndex: tab.i});
        }}
              tabBarPosition="bottom">
          <Tab heading="Info" tabStyle={{backgroundColor: '#ffbe26'}} textStyle={{color: '#fff'}}
               activeTabStyle={{backgroundColor: '#ffbe26'}}
               activeTextStyle={{color: '#fff', fontWeight: 'normal'}}><ShopInfo/></Tab>
          <Tab heading="Product's" tabStyle={{backgroundColor: '#ffbe26'}} textStyle={{color: '#fff'}}
               activeTabStyle={{backgroundColor: '#ffbe26'}}
               activeTextStyle={{color: '#fff', fontWeight: 'normal'}}><SourceProductList/></Tab>
          <Tab heading="Contact's" tabStyle={{backgroundColor: '#ffbe26'}} textStyle={{color: '#fff'}}
               activeTabStyle={{backgroundColor: '#ffbe26'}}
               activeTextStyle={{color: '#fff', fontWeight: 'normal'}}><ContactPersonList/></Tab>
          <Tab heading="Images" tabStyle={{backgroundColor: '#ffbe26'}} textStyle={{color: '#fff'}}
               activeTabStyle={{backgroundColor: '#ffbe26'}}
               activeTextStyle={{color: '#fff', fontWeight: 'normal'}}><ShopImageList/></Tab>
        </Tabs>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeShop: state.shops.activeShop,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    getPersonList: getPersonList,
    getImageList: getImageList,
    personSelected: personSelected,
    imageSelected: imageSelected,
    getSourceProductList: getSourceProductListByShop,
    sourceProductSelected: sourceProductSelected,
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ShopTabs);