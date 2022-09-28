import React, {Component} from 'react';
import {Container, Header, Tab, Tabs, Text, Left, Button, Icon, Body, Title, Right} from 'native-base';
import {StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SourceProductInfo from './source-product-info';
import {productSelected} from '../../../actions/shop/source-product/source-product';

class SourceProductTabs extends Component {
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

      },
    );*/
  }

  getUpdatedList() {
    const {tabIndex} = this.state;
    const {getSpecList, getImageList, activeProduct} = this.props;
    switch (tabIndex) {
      case 0:
        break;
      case 1:
        getSpecList(activeProduct.id);
        break;
      case 2:
        getImageList(activeProduct.id);
        break;
      default:
        break;
    }
  }

  componentWillUnmount() {
    //this._didFocusSubscription && this._didFocusSubscription.remove();
  }

  getTabAction() {
    const {navigation, getSpecList, getImageList, specSelected, imageSelected, activeProduct} = this.props;
    const {tabIndex} = this.state;
    switch (tabIndex) {
      case 0:
        break;
      case 1:
        getSpecList(activeProduct.id);
        return (
          <Button transparent iconLeft onPress={() => {
            navigation.push('ProductSpec');
            specSelected(null);
          }}>
            <Icon name='md-add'/><Text>New</Text>
          </Button>
        );
      case 2:
        getImageList(activeProduct.id);
        return (
          <Button transparent iconLeft onPress={() => {
            navigation.push('ProductImage');
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
    const {navigation, activeProduct} = this.props;
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
            <Title>{activeProduct.name}</Title>
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
          <Tab heading="Info" tabStyle={{backgroundColor: '#ffbe26'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#ffbe26'}} activeTextStyle={{color: '#fff', fontWeight: 'normal'}}><SourceProductInfo/></Tab>
        </Tabs>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  //console.log(state)
  return {
    activeShop: state.shops.activeShop,
    activeProduct: state.sourceProducts.activeProduct,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    getSpecList: getSpecList,
    getImageList: getImageList,
    specSelected: specSelected,
    imageSelected: imageSelected,
    productSelected: productSelected
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SourceProductTabs);