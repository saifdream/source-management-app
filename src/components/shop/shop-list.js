import React, {Component} from 'react';
import {SafeAreaView, StatusBar, RefreshControl, ScrollView} from 'react-native';
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Fab,
  Left,
  List,
  ListItem,
  Right,
  Spinner,
  Text,
  Item,
  Input, Col, Grid, Toast,
} from 'native-base';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {useScreens} from 'react-native-screens';
import {getPaginatedShopList, getShopList, handleShopSearch, shopSelected} from '../../actions/shop/shop';
import {BASE_URL} from "../../constant";

let url = require('url');

useScreens();

class ShopList extends Component {
  //_didFocusSubscription;
  //_willBlurSubscription;

  state = {
    shopList: [],
    modalVisible: false,
  };

  constructor(props) {
    super(props);
    this.props.getShopList();

    /*this._didFocusSubscription = props.navigation.addListener('didFocus', payload => {
      this.props.getShopList();
    });*/
  }

  componentDidMount() {
    //this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload => {},);
  }

  static getDerivedStateFromProps(props, state) {
    //console.log(props)
    if (props.listErrorStatus)
      Toast.show({
        text: props.listErrorStatus.message || props.listErrorStatus,
        position: 'bottom',
        type: 'danger',
        duration: 3000,
      });
    return {};
  }

  componentWillUnmount() {
    //this._didFocusSubscription && this._didFocusSubscription.remove();
    //this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  handleShopSearch(text) {
    clearTimeout(this.timeout);
    if (text) {
      this.timeout = setTimeout(() => {
        this.props.handleShopSearch(text);
      }, 1000);
    } else this.props.getShopList();
  }

  render() {
    const {shopList, navigation, shopSelected} = this.props;
    return (
      <Container>
        <Header searchBar rounded style={{backgroundColor: '#ffbe26', barStyle: 'light-content'}}>
          <StatusBar backgroundColor="#ffbe26" barStyle="light-content"/>
          <Item>
            <Icon name="md-menu" onPress={() => navigation.openDrawer()}/>
            <Input placeholder="Search Shop"
                   onChangeText={(text) => this.handleShopSearch(text)}/>
            {/*<Icon name="ios-search"/>*/}
          </Item>
        </Header>

        {/*<Header style={{backgroundColor: '#ffbe26', barStyle: 'light-content'}}>
          <StatusBar
            backgroundColor="#ffbe26"
            barStyle="light-content"/>
          <Left>
            <Button transparent onPress={() => navigation.openDrawer()}>
              <Icon name='md-menu'/>
            </Button>
          </Left>
          <Body>
            <Title>Shop List</Title>
          </Body>
          <Right>
            <Button transparent iconLeft onPress={() => {
              navigation.push('Shop');
              shopSelected(null);
            }}>
              <Icon name='md-add'/><Text>New</Text>
            </Button>
          </Right>
        </Header>*/}
        <ScrollView
          refreshControl={
            <RefreshControl colors={['#ffbe26']} progressBackgroundColor="#fff" refreshing={this.props.isLoading} onRefresh={() => this.props.getShopList()}/>
          }
        >
          {
            shopList.length === 0 ?
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
                        Loading Shop List, Please wait
                      </Text>
                      <Spinner/>
                    </Content>
                    :
                    <Text style={{fontSize: 14, fontWeight: 'bold', textAlign: 'center'}}>No data found</Text>
                }
              </Content>
              :
              <Content padder>
                <SafeAreaView>
                  <List
                    dataArray={shopList}
                    renderRow={(shop) =>
                      <ListItem
                        key={shop.name}
                        keyExtractor={(shop, index) => index.toString()}
                        onPress={() => {
                          shopSelected(shop);
                          navigation.push('ShopTabs');
                        }}
                      >
                        <Body>
                          <Text>{shop.name}</Text>
                          <Text note numberOfLines={1}>Address: {shop.address}</Text>
                          <Text note numberOfLines={1}>Contact: {shop.contact}</Text>
                        </Body>
                        <Right>
                          <Button transparent onPress={() => {
                            shopSelected(shop);
                            navigation.push('Shop');
                          }}>
                            <Icon name='create' style={{color: '#ffbe26'}}/>
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
                </SafeAreaView>
              </Content>
          }

        </ScrollView>
        <Fab
          containerStyle={{fontSize: 8}}
          style={{backgroundColor: '#ffbe26'}}
          position="bottomRight"
          onPress={() => {
            navigation.push('Shop');
            shopSelected(null);
          }}>
          <Icon name="add"/>
        </Fab>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    shopList: state.shops.shopList || [],
    isLoading: state.shops.isLoading,
    next: state.sourceProducts.next,
    previous: state.sourceProducts.previous,
    listErrorStatus: state.sourceProducts.listErrorStatus,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    getShopList: getShopList,
    getPaginatedList: getPaginatedShopList,
    shopSelected: shopSelected,
    handleShopSearch: handleShopSearch,
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ShopList);