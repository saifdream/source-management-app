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
import {getUnitList, unitSelected} from '../../../actions/product/unit';

useScreens();

class UnitList extends Component {
  //_didFocusSubscription;
  //_willBlurSubscription;

  state = {
    unitList: [],
    modalVisible: false,
  };

  constructor(props) {
    super(props);
    console.log("From Add");
    this.props.getUnitList();

    /*this._didFocusSubscription = props.navigation.addListener(
      'didFocus',
      payload => {
        this.props.getUnitList();
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

  /*static getDerivedStateFromProps(props, state) {
    console.log(props)
    return {}
  }*/

  render() {
    const {unitList, navigation, unitSelected} = this.props;
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
            <Title>Unit List</Title>
          </Body>
          <Right>
            <Button transparent iconLeft onPress={() => {
              navigation.push('Unit');
              unitSelected(null);
            }}>
              <Icon name='md-add'/><Text>New</Text>
            </Button>
          </Right>
        </Header>
        <ScrollView
          refreshControl={
            <RefreshControl colors={['#ffbe26']} progressBackgroundColor="#fff" refreshing={this.props.isLoading} onRefresh={() => this.props.getUnitList()}/>
          }
        >
          {
            unitList.length === 0 ?
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
                        Loading Unit List, Please wait
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
                  {/*<FlatList
                  data={unitList}
                  renderItem={({item}) =>
                    <ListItem key={item.id.toString()}>
                      <Left><Text>{item.name}</Text></Left>
                      <Right>
                        <Button small rounded bordered warning onPress={() => {navigation.push('Unit');unitSelected(item);}}>
                          <Text>Edit</Text>
                        </Button>
                      </Right>
                    </ListItem>
                  }
                  keyExtractor={item => item.id}
                  ItemSeparatorComponent={this.renderSeparator}
                />*/}
                  <List dataArray={unitList} renderRow={(unit) =>
                    <ListItem key={unit.name}>
                      <Left><Text>{unit.name}</Text></Left>
                      <Right>
                        <Button transparent onPress={() => {
                          navigation.push('Unit');
                          unitSelected(unit);
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
    unitList: state.units.unitList || [],
    isLoading: state.units.isLoading,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({getUnitList: getUnitList, unitSelected: unitSelected}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(UnitList);