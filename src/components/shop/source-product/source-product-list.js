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
  Icon, Toast,
} from 'native-base';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import NavigationService from '../../../services/navigation-service';
import {BASE_URL} from '../../../constant';
import {getSourceProductListByShop, sourceProductSelected} from '../../../actions/shop/source-product/source-product';
import {RefreshControl, ScrollView} from 'react-native';

const url = require('url');

class SourceProductList extends Component {
  state = {
    productList: [],
    modalVisible: false,
  };

  constructor(props) {
    super(props);
    this.props.getSourceProductList(this.props.activeShop.id);
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

  render() {
    const {productList, sourceProductSelected} = this.props;

    return (
      <Container>
        <ScrollView
          refreshControl={
            <RefreshControl colors={['#ffbe26']} progressBackgroundColor="#fff" refreshing={this.props.isLoading} onRefresh={() => this.props.getSourceProductList(this.props.activeShop.id)}/>
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
                    <Content padder>
                      <Text style={{fontSize: 14, fontWeight: 'bold', textAlign: 'center'}}>
                        Loading Product List, Please wait
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
                  <ListItem key={product.local_name} thumbnail onPress={() => {
                    sourceProductSelected(product);
                    NavigationService.navigate('ProductTabs');
                  }}>
                    {/*<Left>
                      {
                        product['source_product_images'].length > 0 ?
                          <Thumbnail square source={{uri: BASE_URL+((url.parse(product['source_product_images'][0]['image'])).pathname)}}/>
                          :
                          <Thumbnail square source={require('../../../img/image-icon.png')}/>
                      }
                    </Left>*/}
                    <Body>
                      <Text>{product.local_name}</Text>
                      <Text note numberOfLines={1}>Price: {product.source_price}</Text>
                    </Body>
                    <Right>
                      <Button transparent onPress={() => {
                        sourceProductSelected(product);
                        NavigationService.navigate('SourceProduct');
                      }}>
                        <Icon name='create' style={{color: '#ffbe26'}}/>
                      </Button>
                    </Right>
                  </ListItem>
                }>
                </List>
              </Content>
          }
        </ScrollView>
      </Container>
    );
  }
}


function mapStateToProps(state) {
  console.log(state);
  return {
    activeShop: state.shops.activeShop,
    productList: state.sourceProducts.productList || [],
    isLoading: state.sourceProducts.isLoading,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({getSourceProductList: getSourceProductListByShop, sourceProductSelected: sourceProductSelected}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SourceProductList);