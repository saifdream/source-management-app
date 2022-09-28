import React, {Component} from 'react';
import {
  Container,
  Content,
  List,
  ListItem,
  Item,
  Input,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
  Spinner,
  Icon,
  Header, Toast, Grid, Col
} from 'native-base';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import NavigationService from '../../../services/navigation-service';
import {
  getPaginatedSourceProductList,
  getSourceProductList,
  getShopDetails,
  handleSourceProductSearch,
  sourceProductSelected,
} from '../../../actions/shop/source-product/source-product';
import {StatusBar, ScrollView, RefreshControl} from 'react-native';
import {BASE_URL} from '../../../constant';

const url = require('url');

class GlobalSourceProductList extends Component {
  //_didFocusSubscription;
  state = {};

  constructor(props) {
    super(props);
    this.props.getSourceProductList();
  }

  componentDidMount() {
    /*this._didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      payload => {
        this.props.getSourceProductList();
      },
    );*/
  }

  static getDerivedStateFromProps(props, state) {
    if (props.listErrorStatus) {
      Toast.show({
        text: props.listErrorStatus.message || props.listErrorStatus,
        position: 'bottom',
        type: 'danger',
        duration: 2000,
      });
    }
    return {};
  }

  componentWillUnmount() {
    //this._didFocusSubscription && this._didFocusSubscription.remove();
  }

  handleSourceProductSearch(text) {
    clearTimeout(this.timeout);
    if (text) {
      //console.log(text);
      this.timeout = setTimeout(() => {
        this.props.handleSourceProductSearch(text);
      }, 1000);
    } else this.props.getSourceProductList();
  }

  /*getUrl(image) {
    const imagePath = BASE_URL+(url.parse(image)).pathname;
    console.log(imagePath);
    return imagePath;
  }*/

  render() {
    const {productList, sourceProductSelected, navigation, getShopDetails} = this.props;
    //console.log(sourceProductList)
    return (
      <Container>
        <Header searchBar rounded style={{backgroundColor: '#ffbe26', barStyle: 'light-content'}}>
          <StatusBar backgroundColor="#ffbe26" barStyle="light-content"/>
          <Item>
            <Icon name="md-menu" onPress={() => navigation.openDrawer()}/>
            <Input placeholder="Search Source Product"
                   onChangeText={(text) => this.handleSourceProductSearch(text)}/>
            {/*<Icon name="ios-search"/>*/}
          </Item>
        </Header>
        {/*<Header searchBar style={{backgroundColor: '#ffbe26', barStyle: 'light-content'}}>
          <StatusBar backgroundColor="#ffbe26" barStyle="light-content"/>
          <Left style={{flex: null}}>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="md-menu"/>
            </Button>
          </Left>
          <Item>
            <Input placeholder="Search User"/>
            <Icon name="search"/>
          </Item>
        </Header>*/}
        <ScrollView
          refreshControl={
            <RefreshControl colors={['#ffbe26']} progressBackgroundColor="#fff" refreshing={this.props.isLoading}
                            onRefresh={() => this.props.getSourceProductList()}/>
          }
        >
          {
            productList.length === 0 ?
              <Content padder contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 40,
                paddingHorizontal: 10,
              }}>
                {
                  this.props.isLoading ?
                    <Content>
                      <Text style={{fontSize: 14, fontWeight: 'bold', textAlign: 'center'}}>
                        Loading Source Product List, Please wait
                      </Text>
                      <Spinner/>
                    </Content>
                    :
                    <Text style={{fontSize: 14, fontWeight: 'bold', textAlign: 'center'}}>No data found</Text>
                }
              </Content>
              :
              <Content padder>
                <List dataArray={productList} renderRow={(product) =>
                  <ListItem key={product.name} thumbnail>
                    <Left>
                      {
                        product['source_product_images'].length > 0 ?
                          //<Thumbnail square source={{uri: `${product['source_product_images'][0]['image']}`}}/>
                          <Thumbnail square source={{uri: BASE_URL+((url.parse(product['source_product_images'][0]['image'])).pathname)}}/>
                          :
                          <Thumbnail square source={require('../../../img/image-icon.png')}/>
                      }
                    </Left>
                    <Body>
                      <Text>{product.name}</Text>
                      <Text note numberOfLines={5}>{product.category}</Text>
                      {/*{
                        product.is_verified ?
                          <Badge success style={{marginTop: 10}}><Text numberOfLines={1}>Verified</Text></Badge>
                          :
                          <Badge warning style={{marginTop: 10}}><Text numberOfLines={1}>Not Verified</Text></Badge>
                      }*/}
                    </Body>
                    <Right>
                      <Button transparent onPress={() => {
                        sourceProductSelected(product);
                        getShopDetails(product.shop);
                        NavigationService.navigate('GlobalSourceProductInfo');
                      }}>
                        <Icon name='eye' style={{color: '#ffbe26'}}/>
                      </Button>
                    </Right>
                  </ListItem>
                }>
                </List>
                <Grid style={{marginTop: 25}}>
                  <Col>
                    {
                      this.props.previous ?
                        <Left>
                          <Button transparent onPress={() => {
                            this.props.getPaginatedList(BASE_URL + ((url.parse(this.props.previous)).pathname) + ((url.parse(this.props.previous)).search));
                          }}>
                            <Text style={{color: '#ffbe26'}}>Prev</Text>
                          </Button>
                        </Left>
                        :
                        <Left/>
                    }
                  </Col>
                  <Col>
                    {
                      this.props.next ?
                        <Right>
                          <Button transparent onPress={() => {
                            this.props.getPaginatedList(BASE_URL + ((url.parse(this.props.next)).pathname) + ((url.parse(this.props.next)).search));
                          }}>
                            <Text style={{color: '#ffbe26'}}>Next</Text>
                          </Button>
                        </Right>
                        :
                        <Right/>
                    }
                  </Col>
                </Grid>
              </Content>
          }
        </ScrollView>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    productList: state.sourceProducts.productList || [],
    isLoading: state.sourceProducts.isLoading,
    next: state.sourceProducts.next,
    previous: state.sourceProducts.previous,
    listErrorStatus: state.sourceProducts.listErrorStatus,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    getSourceProductList: getSourceProductList,
    getPaginatedList: getPaginatedSourceProductList,
    sourceProductSelected: sourceProductSelected,
    handleSourceProductSearch: handleSourceProductSearch,
    getShopDetails: getShopDetails,
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(GlobalSourceProductList);