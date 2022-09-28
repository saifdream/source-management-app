import React, {Component} from 'react';
import {SafeAreaView, ScrollView, Image, RefreshControl} from 'react-native';
import {Right, Button, Container, Content, Spinner, Text, Card, CardItem, Toast} from 'native-base';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {useScreens} from 'react-native-screens';
import {BASE_URL} from '../../../constant';
import NavigationService from '../../../services/navigation-service';
import {getImageList, imageSelected} from '../../../actions/product/image';

const url = require('url');

useScreens();

class ProductImageList extends Component {
  state = {
    imageList: [],
    modalVisible: false,
  };

  constructor(props) {
    super(props);
    this.props.getImageList(this.props.activeProduct.id);
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

  getImageViewList() {
    const {imageList, imageSelected} = this.props;
    return (
      imageList.map((image, index)=>{
        //const uri = BASE_URL+image.image;
        const uri = BASE_URL+((url.parse(image.image)).pathname);
        return(
          <Card>
            <CardItem key={index} cardBody>
              <Image source={{uri: uri}} style={{height: 300, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Right>
                <Button small rounded bordered warning onPress={() => {
                  imageSelected(image);
                  NavigationService.navigate('ProductImage');
                }}>
                  <Text>Change Image</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
        )
      })
    )
  }

  render() {
    const {imageList, isLoading} = this.props;
    return (
      <Container>
        {
          imageList.length === 0 ?
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
                      Loading Image List, Please wait
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
                <ScrollView
                  refreshControl={
                    <RefreshControl colors={['#ffbe26']} progressBackgroundColor="#fff" refreshing={this.props.isLoading} onRefresh={() => this.props.getImageList(this.props.activeProduct.id)}/>
                  }
                >
                  {this.getImageViewList()}
                </ScrollView>
              </SafeAreaView>
            </Content>
        }
      </Container>
    );
  }
}

function mapStateToProps(state) {
  //console.log(state);
  return {
    activeProduct: state.products.activeProduct,
    imageList: state.productImages.imageList || [],
    isLoading: state.productImages.isLoading,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({getImageList: getImageList, imageSelected: imageSelected}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ProductImageList);