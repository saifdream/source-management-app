import React, {Component} from 'react';
import {
  Container,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
  Spinner,
  Icon, Toast, Item, Input, Header, Col, Grid, Fab,
} from 'native-base';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import NavigationService from '../../services/navigation-service';
import {BASE_URL} from '../../constant';
import {
    getPaginatedProductList,
    getProductList,
    handleProductSearch,
    productSelected
} from '../../actions/product/product';
import {RefreshControl, ScrollView, StatusBar} from 'react-native';

const url = require('url');

class ProductList extends Component {
    state = {
        productList: [],
        modalVisible: false,
    };

    constructor(props) {
        super(props);
        this.props.getProductList();
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

    handleProductSearch(text) {
        clearTimeout(this.timeout);
        if (text) {
            this.timeout = setTimeout(() => {
                this.props.handleProductSearch(text);
            }, 1000);
        } else this.props.getProductList();
    }

    render() {
        const {navigation, productList, productSelected} = this.props;
        return (
            <Container>
                <Header searchBar rounded style={{backgroundColor: '#ffbe26', barStyle: 'light-content'}}>
                    <StatusBar backgroundColor="#ffbe26" barStyle="light-content"/>
                    <Item>
                        <Icon name="md-menu" onPress={() => navigation.openDrawer()}/>
                        <Input placeholder="Search Product"
                               onChangeText={(text) => this.handleProductSearch(text)}/>
                        {/*<Icon name="ios-search"/>*/}
                    </Item>
                </Header>
                <ScrollView
                    refreshControl={
                        <RefreshControl colors={['#ffbe26']} progressBackgroundColor="#fff"
                                        refreshing={this.props.isLoading}
                                        onRefresh={() => this.props.getProductList()}/>
                    }
                >
                    {
                        productList && productList.length === 0 ?
                            <Content padder contentContainerStyle={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingTop: 40,
                                paddingHorizontal: 10,
                            }}>
                                {
                                    this.props.isLoading ?
                                        <Content padder>
                                            <Text style={{fontSize: 14, fontWeight: 'bold', textAlign: 'center'}}>
                                                Loading Product List, Please wait
                                            </Text>
                                            <Spinner/>
                                        </Content>
                                        :
                                        <Text style={{fontSize: 14, fontWeight: 'bold', textAlign: 'center'}}>No data
                                            found</Text>
                                }
                            </Content>
                            :
                            <Content padder>
                                <List dataArray={productList} renderRow={(product) =>
                                    <ListItem key={product.title} thumbnail onPress={() => {
                                        productSelected(product);
                                        NavigationService.navigate('ProductTabs');
                                    }}>
                                        <Left>
                                            {
                                                product['product_images'] && product['product_images'].length > 0 ?
                                                    <Thumbnail square
                                                               source={{uri: BASE_URL + ((url.parse(product['product_images'][0]['image'])).pathname)}}/>
                                                    :
                                                    <Thumbnail square source={require('../../img/image-icon.png')}/>
                                            }
                                        </Left>
                                        <Body>
                                            <Text>{product.title}</Text>
                                            <Text note numberOfLines={1}>{product.short_description}</Text>
                                        </Body>
                                        <Right>
                                            <Button transparent onPress={() => {
                                                productSelected(product);
                                                NavigationService.navigate('Product');
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
                            </Content>
                    }
                </ScrollView>
              <Fab
                  containerStyle={{fontSize: 8}}
                  style={{backgroundColor: '#ffbe26'}}
                  position="bottomRight"
                  onPress={() => {
                    navigation.push('Product');
                    productSelected(null);
                  }}>
                <Icon name="add"/>
              </Fab>
            </Container>
        );
    }
}


function mapStateToProps(state) {
    console.log(state);
    return {
        productList: state.products.productList || [],
        isLoading: state.products.isLoading,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getProductList: getProductList,
        productSelected: productSelected,
        handleProductSearch: handleProductSearch,
        getPaginatedList: getPaginatedProductList
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ProductList);