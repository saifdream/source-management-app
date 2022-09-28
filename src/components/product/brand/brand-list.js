import React, {Component} from 'react';
import {SafeAreaView, StatusBar, RefreshControl, ScrollView} from 'react-native';
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  List,
  ListItem,
  Right,
  Spinner,
  Text,
  Title, Toast,
} from 'native-base';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {useScreens} from 'react-native-screens';
import {getBrandList, brandSelected} from '../../../actions/product/brand';

useScreens();

class BrandList extends Component {
  //_didFocusSubscription;
  //_willBlurSubscription;

  state = {
    brandList: [],
    modalVisible: false,
  };

  constructor(props) {
    super(props);
    this.props.getBrandList();

    /*this._didFocusSubscription = props.navigation.addListener(
      'didFocus',
      payload => {
        this.props.getBrandList();
      },
    );*/
  }

  componentDidMount() {
    /*this._willBlurSubscription = this.props.navigation.addListener(
      'willBlur',
      payload => {
      },
    );*/
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

  render() {
    const {brandList, navigation, brandSelected} = this.props;
    return (
      <Container>
        <Header style={{backgroundColor: '#ffbe26', barStyle: 'light-content'}}>
          <StatusBar
            backgroundColor="#ffbe26"
            barStyle="light-content"/>
          <Left>
            <Button transparent onPress={() => navigation.openDrawer()}>
              <Icon name='md-menu'/>
            </Button>
          </Left>
          <Body>
            <Title>Brand List</Title>
          </Body>
          <Right>
            <Button transparent iconLeft onPress={() => {
              navigation.push('Brand');
              brandSelected(null);
            }}>
              <Icon name='md-add'/><Text>New</Text>
            </Button>
          </Right>
        </Header>
        <ScrollView
          refreshControl={
            <RefreshControl colors={['#ffbe26']} progressBackgroundColor="#fff" refreshing={this.props.isLoading} onRefresh={() => this.props.getBrandList()}/>
          }
        >
          {
            brandList.length === 0 ?
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
                  <List dataArray={brandList} renderRow={(brand) =>
                    <ListItem key={brand.name}>
                      <Left><Text>{brand.name}</Text></Left>
                      <Right>
                        <Button transparent onPress={() => {
                          navigation.push('Brand');
                          brandSelected(brand);
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
  //console.log(state);
  return {
    brandList: state.brands.brandList || [],
    isLoading: state.brands.isLoading,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({getBrandList: getBrandList, brandSelected: brandSelected}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(BrandList);