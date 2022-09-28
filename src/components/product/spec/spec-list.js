import React, {Component} from 'react';
import {RefreshControl, SafeAreaView, ScrollView} from 'react-native';
import {Right, Button, Container, Content, Spinner, Text, List, ListItem, Left, Icon, Toast} from 'native-base';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {useScreens} from 'react-native-screens';
import {getSpecList, specSelected} from '../../../actions/product/spec';
import NavigationService from '../../../services/navigation-service';
import {getAttributeList} from "../../../actions/attribute";

useScreens();

class ProductSpecList extends Component {
  state = {
    specList: [],
    modalVisible: false,
  };

  constructor(props) {
    super(props);
    this.props.getSpecList(this.props.activeProduct.id);
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
    const {specList, getAttributeList, specSelected, isLoading} = this.props;
    return (
      <Container>
        <ScrollView
          refreshControl={
            <RefreshControl colors={['#ffbe26']} progressBackgroundColor="#fff" refreshing={this.props.isLoading} onRefresh={() => this.props.getSpecList(this.props.activeProduct.id)}/>
          }
        >
          {
            specList.length === 0 ?
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
                  <List dataArray={specList} renderRow={(spec) =>
                    <ListItem key={spec.key}>
                      <Left><Text>{spec.key}: {spec.value}</Text></Left>
                      <Right>
                        <Button transparent onPress={() => {
                          NavigationService.navigate('ProductSpec');
                          specSelected(spec);
                          getAttributeList();
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
    specList: state.productSpecs.specList || [],
    isLoading: state.productSpecs.isLoading,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({getSpecList: getSpecList, specSelected: specSelected, getAttributeList: getAttributeList}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ProductSpecList);