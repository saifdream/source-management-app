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
  Title,
} from 'native-base';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {useScreens} from 'react-native-screens';
import {getStateList, stateSelected} from '../../../actions/shop/state';

useScreens();

class StateList extends Component {
  //_didFocusSubscription;
  //_willBlurSubscription;

  state = {
    stateList: [],
    modalVisible: false,
  };

  constructor(props) {
    super(props);
    this.props.getStateList();

    /*this._didFocusSubscription = props.navigation.addListener(
      'didFocus',
      payload => {
        this.props.getStateList();
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

  componentWillUnmount() {
    //this._didFocusSubscription && this._didFocusSubscription.remove();
    //this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  render() {
    const {stateList, navigation, stateSelected} = this.props;
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
            <Title>Area List</Title>
          </Body>
          <Right>
            <Button transparent iconLeft onPress={() => {
              navigation.push('State');
              stateSelected(null);
            }}>
              <Icon name='md-add'/><Text>New</Text>
            </Button>
          </Right>
        </Header>
        <ScrollView
          refreshControl={
            <RefreshControl colors={['#ffbe26']} progressBackgroundColor="#fff" refreshing={this.props.isLoading} onRefresh={() => this.props.getStateList()}/>
          }
        >
          {
            stateList.length === 0 ?
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
                        Loading State List, Please wait
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
                  <List dataArray={stateList} renderRow={(state) =>
                    <ListItem key={state.name}>
                      <Left><Text>{state.name}</Text></Left>
                      <Right>
                        <Button transparent onPress={() => {
                          navigation.push('State');
                          stateSelected(state);
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
    stateList: state.states.stateList || [],
    isLoading: state.states.isLoading,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({getStateList: getStateList, stateSelected: stateSelected}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(StateList);