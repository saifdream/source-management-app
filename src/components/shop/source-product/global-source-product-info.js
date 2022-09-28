import React, {Component} from 'react';
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  Segment,
  Left,
  Button,
  Icon, Title, Right, Header, Badge,
} from 'native-base';
import {connect} from 'react-redux';
import {StatusBar, Image, Linking, Dimensions} from 'react-native';
import {BASE_URL} from '../../../constant';
const url = require('url');

const device = Dimensions.get('window');

class GlobalSourceProductInfo extends Component {

  constructor(props) {
    super(props);
    const {activeProduct, shopDetails} = props;
    this.state = {
      activePage: 1,
      shopDetails: shopDetails,
      id: activeProduct ? activeProduct.id : null,
      name: activeProduct ? activeProduct.local_name : null,
      sourcePrice: activeProduct ? activeProduct.source_price : null,
      isVerified: activeProduct ? activeProduct.is_verified : false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      shopDetails: props.shopDetails,
    };
  }

  getProductView() {
    const {name, sourcePrice, isVerified} = this.state;
    return (
      <Card>
        <CardItem bordered>
          <Body><Text>Name: {name}</Text></Body>
        </CardItem>
        <CardItem bordered>
          <Body><Text>Source Price: {sourcePrice}</Text></Body>
        </CardItem>
        <CardItem bordered>
          <Left>
            <Text>Is Verified?:</Text>
          </Left>
          <Body/>
          <Right>
            {
              isVerified ?
                <Badge success><Text style={{fontSize: 12}}>Verified</Text></Badge>
                :
                <Badge danger><Text style={{fontSize: 12}}>Not Verified</Text></Badge>
            }
          </Right>
        </CardItem>
      </Card>
    );
  }

  getShopView() {
    const {shopDetails} = this.state;
    if (shopDetails && Object.entries(shopDetails).length > 0 && shopDetails.constructor === Object) {
      return (
        <Card>
          <CardItem bordered>
            <Body>
              <Text>Name: {shopDetails.name}</Text>
            </Body>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>Address: {shopDetails.address}</Text>
            </Body>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>Contact: {shopDetails.contact}</Text>
            </Body>
            <Right>
              <Button small warning rounded bordered onPress={() => this.call(shopDetails.contact)}>
                <Icon name='call'/>
              </Button>
            </Right>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>Email: {shopDetails.email}</Text>
            </Body>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>Web: {shopDetails.web}</Text>
            </Body>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>Area: {shopDetails.area}</Text>
            </Body>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>Country: {shopDetails.country}</Text>
            </Body>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>Latitude: {shopDetails.lat}</Text>
            </Body>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>Longitude: {shopDetails.lng}</Text>
            </Body>
          </CardItem>
        </Card>
      );
    }
  }

  call(contact) {
    Linking.openURL(`tel:${contact}`);
  }

  getContactPersonView() {
    const {shopDetails} = this.state;
    if (shopDetails && Object.entries(shopDetails).length > 0 && shopDetails['shop_contact_person'].length > 0 && shopDetails.constructor === Object)
      return (
        shopDetails['shop_contact_person'].map((person, index) => {
          return (
            <Card key={index}>
              <CardItem>
                <Body>
                  <Text>Name: {person.name}</Text>
                  <Text note>{person.designation}</Text>
                  <Text note>{person.email}</Text>
                  <Text note>{person.contact}</Text>
                </Body>
                <Right>
                  <Button small warning rounded bordered onPress={() => this.call(person.contact)}>
                    <Icon name='call'/>
                  </Button>
                </Right>
              </CardItem>
              <CardItem cardBody>
                <Image source={{uri: person.image ? BASE_URL+((url.parse(person.image)).pathname) : ''}} resizeMode="cover"
                       style={{height: 400, width: null, flex: 1, flexDirection: 'row', flexWrap: 'wrap',}}/>
              </CardItem>
            </Card>
          );
        })
      );
    return (
      <CardItem style={{justifyContent: 'center', alignItems: 'center',}}>
        <Text>No contact person found</Text>
      </CardItem>
    );
  }

  selectComponent = (activePage) => () => this.setState({activePage});

  _renderComponent = () => {
    if (this.state.activePage === 1)
      return this.getProductView();
    else if (this.state.activePage === 2)
      return this.getShopView();
    else if (this.state.activePage === 3)
      return (
        this.getContactPersonView()
      );
    else if (this.state.activePage === 4)
      return this.getShopImageView();
    else
      return this.getProductView();
  };

  render() {
    const {name} = this.state;
    return (
      <Container>
        <Header hasSegment style={{backgroundColor: '#ffbe26', barStyle: 'light-content'}}>
          <StatusBar
            backgroundColor="#ffbe26"
            barStyle="light-content"/>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back'/>
            </Button>
          </Left>
          <Body><Title>{name}</Title></Body>
          <Right/>
        </Header>
        <Segment style={{backgroundColor: '#ffbe26', color: '#fff'}}>
          <Button warning first active={this.state.activePage === 1} onPress={this.selectComponent(1)}><Text
            style={{color: this.state.activePage === 1 ? '#000' : '#fff'}}>Product</Text></Button>
          <Button warning active={this.state.activePage === 2} onPress={this.selectComponent(2)}><Text
            style={{color: this.state.activePage === 2 ? '#000' : '#fff'}}>Shop</Text></Button>
          <Button warning active={this.state.activePage === 3} onPress={this.selectComponent(3)}><Text
            style={{color: this.state.activePage === 3 ? '#000' : '#fff'}}>Contact</Text></Button>
          <Button warning last active={this.state.activePage === 4} onPress={this.selectComponent(4)}><Text
            style={{color: this.state.activePage === 4 ? '#000' : '#fff'}}>Shop Image</Text></Button>
        </Segment>
        <Content padder>
          {this._renderComponent()}
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeProduct: state.sourceProducts.activeProduct,
    shopDetails: state.sourceProducts.shopDetails,
    isLoading: state.sourceProducts.isLoading,
  };
}

export default connect(mapStateToProps)(GlobalSourceProductInfo);