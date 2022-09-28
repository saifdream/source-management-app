import React, {Component} from 'react';
import {
  Container, Content, Header, Left, Right, Body, Title, Text, Button, Icon, Input, Item,
  Label, Form, Toast, Picker,
} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {SafeAreaView, StatusBar, Switch} from 'react-native';
import {useScreens} from 'react-native-screens';
import {addShop, getPreRequisiteData, getShopList, shopSelected, updateShop} from '../../actions/shop/shop';
import Geolocation from '@react-native-community/geolocation';
//import Geolocation from 'react-native-geolocation-service';

useScreens();

class Shop extends Component {
  _didFocusSubscription;

  constructor(props) {
    super(props);

    this.state = {
      countries: props.countries,
      states: props.states,
      action: props.activeShop ? 'Edit' : 'New',
      id: props.activeShop ? props.activeShop.id : '',
      name: props.activeShop ? props.activeShop.name : '',
      address: props.activeShop ? props.activeShop.address : '',
      area: props.activeShop ? props.activeShop.area : '',
      contact: props.activeShop ? props.activeShop.contact : '+88',
      email: props.activeShop ? props.activeShop.email : '',
      country: props.activeShop ? props.activeShop.country : '',
      isCollectLocation: props.activeShop ? !!props.activeShop.lat : false,
      lat: props.activeShop ? parseFloat(props.activeShop.lat) : 0,
      lng: props.activeShop ? parseFloat(props.activeShop.lng) : 0,
      web: props.activeShop ? props.activeShop.web : '',
    };

    this._didFocusSubscription = props.navigation.addListener(
      'didFocus',
      payload => {
        this.props.getPreRequisiteData();
      },
    );
  }

  componentDidMount() {
    this.props.getPreRequisiteData();
  }

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
  }

  getLocation() {
    let geoOptions = {
      enableHighAccuracy: false,
      timeOut: 20000,
      maximumAge: 3600000
    };

    Geolocation.getCurrentPosition(this.geoSuccess, this.geoFailure, geoOptions);
  }

  geoSuccess = (position) => {
    this.setState({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  };

  geoFailure = (err) => {
    Toast.show({
      text: err.message,
      position: 'bottom',
      type: 'danger',
      duration: 2000,
    });
  };

  addShop() {
    let shop = {
      name: this.state.name,
      address: this.state.address,
      area: this.state.area,
      contact: this.state.contact,
      email: this.state.email,
      country: this.state.country,
      //lat: this.state.lat,
      //lng: this.state.lng,
      web: this.state.web,
      added_by: global.credential.user_id,
    };

    if (this.state.isCollectLocation) {
      shop.lat = this.state.lat;
      shop.lng = this.state.lng;
    }

    this.props.addShop(shop);
  }

  updateShop() {
    let shop = {
      name: this.state.name,
      address: this.state.address,
      area: this.state.area,
      contact: this.state.contact,
      email: this.state.email,
      country: this.state.country,
      //lat: this.state.lat,
      //lng: this.state.lng,
      web: this.state.web,
      updated_by: global.credential.user_id,
    };

    if (this.state.isCollectLocation) {
      shop.lat = this.state.lat;
      shop.lng = this.state.lng;
    }

    this.props.updateShop(shop, this.state.id);
  }

  getAction() {
    if (this.state.action === 'Edit')
      return (
        <Button transparent onPress={() => this.updateShop()}
                disabled={this.props.isLoading || !this.state.name || !this.state.address || !this.state.contact}>
          {
            this.props.isLoading ?
              <Text>Wait ...</Text>
              :
              <Text>Update</Text>
          }
        </Button>
      );
    else
      return (
        <Button transparent onPress={() => this.addShop()}
                disabled={this.props.isLoading || !this.state.name || !this.state.address || !this.state.contact}>
          {
            this.props.isLoading ?
              <Text>Wait ...</Text>
              :
              <Text>Save</Text>
          }
        </Button>
      );
  }

  static getDerivedStateFromProps(props, state) {
    if (props.addSuccessStatus || props.updateSuccessStatus) {
      Toast.show({
        text: props.addSuccessStatus || props.updateSuccessStatus,
        position: 'bottom',
        duration: 1000,
      });
      props.navigation.goBack();
      setTimeout(() => {
        if (!props.isLoading) {
          props.getShopList();
        }
      }, 5);
    } else if (props.addErrorStatus || props.updateErrorStatus)
      Toast.show({
        text: props.addErrorStatus || props.updateErrorStatus,
        position: 'bottom',
        type: 'danger',
        duration: 2000,
      });
    return {};
  }

  render() {
    const {navigation, countries, states} = this.props;
    return (
      <Container>
        <Header style={{backgroundColor: '#ffbe26', barStyle: 'light-content'}}>
          <StatusBar
            backgroundColor="#ffbe26"
            barStyle="light-content"/>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name='arrow-back'/>
            </Button>
          </Left>
          <Body>
            <Title>Shop</Title>
          </Body>
          <Right>
            {this.getAction()}
          </Right>
        </Header>
        <Content padder>
          <SafeAreaView>
            <Form>
              <Item stackedLabel>
                <Label>Shop Name</Label>
                <Input onChangeText={(text) => this.setState({name: text})} value={this.state.name}/>
              </Item>
              <Item stackedLabel>
                <Label>Address</Label>
                <Input multiline={true} rowSpan={4} onChangeText={(text) => this.setState({address: text})}
                       value={this.state.address}/>
              </Item>
              <Item stackedLabel>
                <Label>Contact Number</Label>
                <Input keyboardType={'phone-pad'} onChangeText={(text) => this.setState({contact: text})}
                       value={`${this.state.contact}`}/>
              </Item>
              <Item stackedLabel>
                <Label>Email</Label>
                <Input keyboardType={'email-address'} onChangeText={(text) => this.setState({email: text})}
                       value={this.state.email}/>
              </Item>
              <Item stackedLabel>
                <Label>Web</Label>
                <Input onChangeText={(text) => this.setState({web: text})} value={this.state.web}/>
              </Item>
              <Item>
                <Label style={{fontWeight: 'bold'}}>Area</Label>
                <Picker
                  renderHeader={backAction =>
                    <Header style={{backgroundColor: '#ffbe26'}}>
                      <Left>
                        <Button transparent onPress={backAction}>
                          <Icon name="arrow-back" style={{color: '#fff'}}/>
                        </Button>
                      </Left>
                      <Body style={{flex: 3}}>
                        <Title style={{color: '#fff'}}>Choose A Area</Title>
                      </Body>
                      <Right/>
                    </Header>}
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down"/>}
                  selectedValue={this.state.area}
                  onValueChange={(itemValue, itemPosition) => this.setState({area: itemValue})}
                >
                  <Picker.Item label="Choose One"/>
                  {
                    states && states.map((area) => {
                      return (<Picker.Item key={area.id} label={area.name} value={area.id}/>);
                    })
                  }
                </Picker>
                <Button small transparent rounded onPress={() => this.props.navigation.navigate('State')}>
                  <Icon name="add" style={{color: '#ffbe26'}}/>
                </Button>
              </Item>
              <Item>
                <Label style={{fontWeight: 'bold'}}>Country</Label>
                <Picker
                  renderHeader={backAction =>
                    <Header style={{backgroundColor: '#ffbe26'}}>
                      <Left>
                        <Button transparent onPress={backAction}>
                          <Icon name="arrow-back" style={{color: '#fff'}}/>
                        </Button>
                      </Left>
                      <Body style={{flex: 3}}>
                        <Title style={{color: '#fff'}}>Choose A Country</Title>
                      </Body>
                      <Right/>
                    </Header>}
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down"/>}
                  selectedValue={this.state.country}
                  onValueChange={(itemValue, itemPosition) => this.setState({country: itemValue})}
                >
                  <Picker.Item label="Choose One"/>
                  {
                    countries && countries.map((country) => {
                      return (<Picker.Item key={country.id} label={country.name} value={country.id}/>);
                    })
                  }
                </Picker>
                {/*<Button small transparent rounded onPress={() => this.props.navigation.navigate('Country')}>
                  <Icon name="add" style={{color: '#ffbe26'}}/>
                </Button>*/}
              </Item>
              <Item style={{paddingTop: 20, paddingBottom: 5}}>
                <Left>
                  <Text>Collect Location?</Text>
                </Left>
                <Body/>
                <Right>
                  <Switch trackColor={{
                    true: '#ffbe26',
                    false: '#d3d3d3',
                    borderColor: '#ffbe26',
                    thumbColor: '#ffbe26',
                  }} onValueChange={() => {
                    this.setState({isCollectLocation: !this.state.isCollectLocation});
                    this.getLocation();
                  }} value={this.state.isCollectLocation}/>
                </Right>
              </Item>
              {
                this.state.isCollectLocation ?
                  <Content padder>
                    <Item style={{paddingTop: 20, paddingBottom: 5}}>
                      <Label style={{fontWeight: 'bold'}}>Latitude </Label>
                      <Text>{this.state.lat}</Text>
                    </Item>
                    <Item style={{paddingTop: 20, paddingBottom: 5}}>
                      <Label style={{fontWeight: 'bold'}}>Longitude </Label>
                      <Text>{this.state.lng}</Text>
                    </Item>
                  </Content>
                  :
                  <Text/>
              }
            </Form>
          </SafeAreaView>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  //console.log(state);
  return {
    activeShop: state.shops.activeShop,
    countries: state.shops.preRequisiteList.countries || [],
    states: state.shops.preRequisiteList.states || [],
    isLoading: state.shops.isLoading,
    addSuccessStatus: state.shops.addSuccessStatus,
    addErrorStatus: state.shops.addErrorStatus,
    updateSuccessStatus: state.shops.updateSuccessStatus,
    updateErrorStatus: state.shops.updateErrorStatus,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    getShopList: getShopList,
    addShop: addShop,
    updateShop: updateShop,
    shopSelected: shopSelected,
    getPreRequisiteData: getPreRequisiteData,
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Shop);