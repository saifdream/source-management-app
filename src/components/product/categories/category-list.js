import React, {Component} from 'react';
import {RefreshControl, SafeAreaView, ScrollView} from 'react-native';
import {Right, Button, Container, Content, Spinner, Text, List, ListItem, Left, Icon, Toast} from 'native-base';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {useScreens} from 'react-native-screens';
import {getProductCategoryList, productCategorySelected} from '../../../actions/product/category';
import NavigationService from '../../../services/navigation-service';
import {getCategoryList} from "../../../actions/category";

useScreens();

class ProductCategoryList extends Component {
  state = {
    productCategoryList: [],
    modalVisible: false,
  };

  constructor(props) {
    super(props);
    this.props.getProductCategoryList(this.props.activeProduct.id);
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

  render() {
    const {productCategoryList, getCategoryList, productCategorySelected, isLoading} = this.props;
    return (
      <Container>
        <ScrollView
          refreshControl={
            <RefreshControl colors={['#ffbe26']} progressBackgroundColor="#fff" refreshing={this.props.isLoading} onRefresh={() => this.props.getProductCategoryList(this.props.activeProduct.id)}/>
          }
        >
          {
            productCategoryList.length === 0 ?
              <Content padder contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 40,
                paddingHorizontal: 10,
              }}>
                {
                  isLoading ?
                    <Content padder>
                      <Text style={{fontSize: 14, fontWeight: 'bold', textAlign: 'center'}}>
                        Loading Brand List, Please wait
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
                  <List dataArray={productCategoryList} renderRow={(productCategory) =>
                    <ListItem key={productCategory.key}>
                      <Left><Text>{productCategory.key}: {productCategory.value}</Text></Left>
                      <Right>
                        <Button transparent onPress={() => {
                          NavigationService.navigate('ProductCategory');
                          productCategorySelected(productCategory);
                          getCategoryList();
                        }}>
                          <Icon name='create' style={{color: '#ffbe26'}}/>
                        </Button>
                      </Right>
                    </ListItem>
                  }>
                  </List>
                </SafeAreaView>
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
    activeProduct: state.products.activeProduct,
    productCategoryList: state.categories.productCategoryList || [],
    isLoading: state.categories.isLoading,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({getProductCategoryList: getProductCategoryList, productCategorySelected: productCategorySelected, getCategoryListList: getCategoryList}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ProductCategoryList);