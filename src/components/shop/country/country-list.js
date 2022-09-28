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
import {getCountryList, countrySelected} from '../../../actions/shop/country';

useScreens();

class CountryList extends Component {
  //_didFocusSubscription;
  //_willBlurSubscription;

  state = {
    countryList: [],
    modalVisible: false,
  };

  constructor(props) {
    super(props);
    this.props.getCountryList();

    /*this._didFocusSubscription = props.navigation.addListener(
      'didFocus',
      payload => {
        this.props.getCountryList();
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
    const {countryList, navigation, countrySelected} = this.props;
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
            <Title>Country List</Title>
          </Body>
          <Right>
            <Button transparent iconLeft onPress={() => {
              navigation.push('Country');
              countrySelected(null);
            }}>
              <Icon name='md-add'/><Text>New</Text>
            </Button>
          </Right>
        </Header>
        <ScrollView
          refreshControl={
            <RefreshControl colors={['#ffbe26']} progressBackgroundColor="#fff" refreshing={this.props.isLoading} onRefresh={() => this.props.getCountryList()}/>
          }
        >
          {
            countryList.length === 0 ?
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
                        Loading Country List, Please wait
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
                  <List dataArray={countryList} renderRow={(country) =>
                    <ListItem key={country.name}>
                      <Left><Text>{country.name}</Text></Left>
                      <Right>
                        <Button transparent onPress={() => {
                          navigation.push('Country');
                          countrySelected(country);
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
    countryList: state.countries.countryList || [],
    isLoading: state.countries.isLoading,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({getCountryList: getCountryList, countrySelected: countrySelected}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(CountryList);