import React, {Component} from 'react';
import {Container, Content, Body, Text, CardItem, Card,} from 'native-base';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {useScreens} from 'react-native-screens';

useScreens();

class ShopInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.activeShop ? props.activeShop.id : '',
      name: props.activeShop ? props.activeShop.name : '',
      address: props.activeShop ? props.activeShop.address : '',
      area: props.activeShop ? props.activeShop.area : '',
      contact: props.activeShop ? props.activeShop.contact : '',
      email: props.activeShop ? props.activeShop.email : '',
      country: props.activeShop ? props.activeShop.country : '',
      lat: props.activeShop ? parseFloat(props.activeShop.lat) : 0,
      lng: props.activeShop ? parseFloat(props.activeShop.lng) : 0,
      web: props.activeShop ? props.activeShop.web : '',
    };
  }

  render() {
    const {name, address, contact, email, web, area, country, lat, lng} = this.state;
    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text>Shop Information</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>Name: {name}</Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>Address: {address}</Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>Contact: {contact}</Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>Email: {email}</Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>Web: {web}</Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>Area: {area}</Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>Country: {country}</Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>Latitude: {lat}</Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>Longitude: {lng}</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  //console.log(state);
  return {
    activeShop: state.shops.activeShop,
  };
}

export default connect(mapStateToProps)(ShopInfo);