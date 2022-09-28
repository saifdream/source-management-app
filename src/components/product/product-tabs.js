import React, {Component} from 'react';
import {Container, Header, Tab, Tabs, Text, Left, Button, Icon, Body, Title, Right} from 'native-base';
import {StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ProductInfo from './product-info';
import ProductSpecList from './spec/spec-list';
import ProductCategoryList from './categories/category-list';
import ProductImageList from './images/image-list';
import {productSelected} from '../../actions/product/product';
import {getImageList} from '../../actions/product/image';
import {getSpecList, specSelected} from '../../actions/product/spec';
import {imageSelected} from '../../actions/product/image';
import {getAttributeList} from "../../actions/attribute";
import {getProductCategoryList, productCategorySelected} from "../../actions/product/category";
import {getCategoryList} from "../../actions/category";

class ProductTabs extends Component {
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
    const {getSpecList, getImageList, getProductCategoryList, activeProduct} = this.props;
    switch (tabIndex) {
      case 0:
        break;
      case 1:
        getSpecList(activeProduct.id);
        break;
      case 2:
        getImageList(activeProduct.id);
        break;
      /*case 3:
        getProductCategoryList(activeProduct.id);
        break;*/
      default:
        break;
    }
  }

  componentWillUnmount() {
    //this._didFocusSubscription && this._didFocusSubscription.remove();
  }

  getTabAction() {
    const {navigation, getSpecList, getAttributeList, getImageList, specSelected, imageSelected, getProductCategoryList, productCategorySelected, getCategoryList, activeProduct} = this.props;
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
            getAttributeList();
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
      /*case 3:
        getProductCategoryList(activeProduct.id);
        return (
          <Button transparent iconLeft onPress={() => {
            navigation.push('ProductCategory');
            productCategorySelected(null);
            getCategoryList();
          }}>
            <Icon name='md-add'/><Text>New</Text>
          </Button>
        );*/
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
            <Title>{activeProduct.title}</Title>
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
          <Tab heading="Info" tabStyle={{backgroundColor: '#ffbe26'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#ffbe26'}} activeTextStyle={{color: '#fff', fontWeight: 'normal'}}><ProductInfo/></Tab>
          <Tab heading="Specification" tabStyle={{backgroundColor: '#ffbe26'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#ffbe26'}} activeTextStyle={{color: '#fff', fontWeight: 'normal'}}><ProductSpecList/></Tab>
          <Tab heading="Images" tabStyle={{backgroundColor: '#ffbe26'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#ffbe26'}} activeTextStyle={{color: '#fff', fontWeight: 'normal'}}><ProductImageList/></Tab>
          {/*<Tab heading="Categories" tabStyle={{backgroundColor: '#ffbe26'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#ffbe26'}} activeTextStyle={{color: '#fff', fontWeight: 'normal'}}><ProductCategoryList/></Tab>*/}
        </Tabs>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
    activeProduct: state.products.activeProduct,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    getAttributeList: getAttributeList,
    getProductCategoryList: getProductCategoryList,
    getCategoryListL: getCategoryList,
    getSpecList: getSpecList,
    getImageList: getImageList,
    specSelected: specSelected,
    productCategorySelected: productCategorySelected,
    imageSelected: imageSelected,
    productSelected: productSelected
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ProductTabs);