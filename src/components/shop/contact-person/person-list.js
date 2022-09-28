import React, {Component} from 'react';
import {ScrollView, Image, RefreshControl} from 'react-native';
import {Button, Container, Content, Spinner, Text, Card, CardItem, Body, Icon, Toast} from 'native-base';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {useScreens} from 'react-native-screens';
import {getPersonList, personSelected} from '../../../actions/shop/source-product/person';
import {BASE_URL} from '../../../constant';
import NavigationService from '../../../services/navigation-service';

const url = require('url');

useScreens();

class ShopPersonList extends Component {
  state = {
    personList: [],
    modalVisible: false,
  };

  constructor(props) {
    super(props);
    this.props.getPersonList(this.props.activeShop.id);
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

  getPersonViewList() {
    return (
      this.props.personList.map((person, index) => {
        //const uri = BASE_URL + person.image;
        let uri = "";
        if(person.image) {
          console.log(person.image)
          uri = BASE_URL + ((url.parse(person.image)).pathname);
        }
        return (
          <Card key={index}>
            <CardItem cardBody>
              <Image source={{uri: uri}} style={{height: 300, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Body>
                <Text>{person.name}</Text>
                <Text>{person.contact}</Text>
                <Text>{person.email}</Text>
                <Text>{person.designation}</Text>
              </Body>
              <Button transparent onPress={() => {
                this.props.personSelected(person);
                NavigationService.navigate('ContactPerson');
              }}>
                <Icon name='create' style={{color: '#ffbe26'}}/>
              </Button>
            </CardItem>
          </Card>
        );
      })
    );
  }

  render() {
    const {personList} = this.props;
    return (
      <Container>
        <ScrollView
          refreshControl={
            <RefreshControl colors={['#ffbe26']} progressBackgroundColor="#fff" refreshing={this.props.isLoading}
                            onRefresh={() => this.props.getPersonList(this.props.activeShop.id)}/>
          }
        >
          {
            personList.length === 0 ?
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
                        Loading Person List, Please wait
                      </Text>
                      <Spinner/>
                    </Content>
                    :
                    <Text style={{fontSize: 14, fontWeight: 'bold', textAlign: 'center'}}>No data found</Text>
                }
              </Content>
              :
              <Content padder>
                {this.getPersonViewList()}
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
    activeShop: state.shops.activeShop,
    personList: state.shopPersons.personList || [],
    isLoading: state.shopPersons.isLoading,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({getPersonList: getPersonList, personSelected: personSelected}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ShopPersonList);