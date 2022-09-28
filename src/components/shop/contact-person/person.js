import React, {Component} from 'react';
import {Body, Button, Container, Content, Form, Header, Icon, Input, Item, Label, Left, Right, Text, Title, Toast, Fab} from 'native-base';
import {bindActionCreators} from 'redux';
import {addPerson, getPersonList, personSelected, updatePerson} from '../../../actions/shop/source-product/person';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import {Image, ScrollView, StatusBar} from 'react-native';
import {BASE_URL} from '../../../constant';
const url = require('url');

class ContactPerson extends Component {
  state = {
    action: this.props.activePerson ? 'Edit' : 'New',
    shop: this.props.activeShop.id || null,
    id: this.props.activePerson ? this.props.activePerson.id : null,
    name: this.props.activePerson ? this.props.activePerson.name : null,
    contact: this.props.activePerson ? this.props.activePerson.contact : "+88",
    email: this.props.activePerson ? this.props.activePerson.email : null,
    designation: this.props.activePerson ? this.props.activePerson.designation : null,
    image: null,
  };

  addPerson() {
    const {shop, name, contact, email, designation, image} = this.state;
    const createPersonData = () => {
      const data = new FormData();
      data.append('shop', shop);
      data.append('name', name);
      data.append('contact', contact);
      data.append('email', email);
      data.append('designation', designation);
      data.append('added_by', global.credential.user_id);
      data.append('image', {
        name: image.fileName,
        type: image.type,
        uri: Platform.OS === 'android' ? image.uri : image.uri.replace('file://', ''),
      });
      return data;
    };
    this.props.addPerson(createPersonData());
  }

  updatePerson() {
    const {shop, name, contact, email, designation, image} = this.state;
    const updatePersonData = () => {
      const data = new FormData();
      data.append('shop', shop);
      data.append('name', name);
      data.append('contact', contact);
      data.append('email', email);
      data.append('designation', designation);
      data.append('updated_by', global.credential.user_id);
      if (image)
        data.append('image', {
          name: image.fileName,
          type: image.type,
          uri: Platform.OS === 'android' ? image.uri : image.uri.replace('file://', ''),
        });
      return data;
    };
    this.props.updatePerson(updatePersonData(), this.state.id);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.addSuccessStatus || props.updateSuccessStatus) {
      Toast.show({
        text: props.addSuccessStatus || props.updateSuccessStatus,
        position: 'bottom',
        duration: 3000,
      });
      props.navigation.goBack();
      setTimeout(() => {
        if (!props.isLoading) {
          props.getPersonList(props.activeShop.id);
        }
      }, 5);
    } else if (props.addErrorStatus || props.updateErrorStatus)
      Toast.show({
        text: props.addErrorStatus || props.updateErrorStatus,
        position: 'bottom',
        type: 'danger',
        duration: 3000,
      });
    return {};
  }

  /*handleUploadPhoto = () => {
    const {shop, name, contact, email, designation, image} = this.state;
    const createFormData = () => {
      const data = new FormData();
      data.append('shop', shop);
      data.append('name', name);
      data.append('contact', contact);
      data.append('email', email);
      data.append('designation', designation);
      data.append('image', {
        name: image.fileName,
        type: image.type,
        uri: Platform.OS === 'android' ? image.uri : image.uri.replace('file://', ''),
      });

      /!*Object.keys(body).forEach(key => {
        data.append(key, body[key]);
      });*!/

      return data;
    };

    fetch(`${API}shop-contact-persons/`, {
      method: 'POST',
      headers: authFormHeader(),
      body: createFormData(),
    })
      .then(response => response.json())
      .then(response => {
        //console.log('upload success', response);
        alert('Upload success!');
        this.setState({photo: null});
      })
      .catch(error => {
        //console.log('upload error', error);
        alert('Upload failed!');
      });
  };*/

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };

    ImagePicker.launchImageLibrary(options, response => {
      //console.log(response);
      if (response.uri) {
        this.setState({image: response});
      }
    });
  };

  getAction() {
    if (this.state.action === 'Edit')
      return (
        <Button transparent onPress={() => this.updatePerson()}
                disabled={this.props.isLoading || !this.state.name || !this.state.contact}>
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
        <Button transparent onPress={() => this.addPerson()}
                disabled={this.props.isLoading || !this.state.name || !this.state.contact}>
          {
            this.props.isLoading ?
              <Text>Wait ...</Text>
              :
              <Text>Save</Text>
          }
        </Button>
      );
  }

  render() {
    const {activePerson} = this.props;
    const {image} = this.state;
    return (
      <Container>
        <Header style={{backgroundColor: '#ffbe26', barStyle: 'light-content'}}>
          <StatusBar
            backgroundColor="#ffbe26"
            barStyle="light-content"/>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back'/>
            </Button>
          </Left>
          <Body>
            <Title>Shop Person</Title>
          </Body>
          <Right>
            {this.getAction()}
          </Right>
        </Header>
        <Content padder>
          <ScrollView>
            <Form>
              <Item stackedLabel>
                <Label>Person Name</Label>
                <Input onChangeText={(text) => this.setState({name: text})} value={this.state.name}/>
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
                <Label>Designation</Label>
                <Input onChangeText={(text) => this.setState({designation: text})}
                       value={this.state.designation}/>
              </Item>
              <Content style={{margin: 10}}>
                {
                  !image && activePerson ?
                    <Image
                      source={{uri: `${BASE_URL}${activePerson.image}`}}
                      style={{width: null, height: 400, flex: 1}}
                    />
                    :
                    image && (
                      <Image
                        source={{uri: image.uri}}
                        style={{width: null, height: 400, flex: 1}}
                      />
                    )
                }
              </Content>
            </Form>
          </ScrollView>
        </Content>
        <Fab
          containerStyle={{fontSize: 8}}
          style={{ backgroundColor: '#ffbe26' }}
          position="bottomRight"
          onPress={() => this.handleChoosePhoto()}>
          <Icon name="attach" />
        </Fab>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  //console.log(state);
  return {
    activeShop: state.shops.activeShop,
    activePerson: state.shopPersons.activePerson,
    isLoading: state.shopPersons.isLoading,
    addSuccessStatus: state.shopPersons.addSuccessStatus,
    addErrorStatus: state.shopPersons.addErrorStatus,
    updateSuccessStatus: state.shopPersons.updateSuccessStatus,
    updateErrorStatus: state.shopPersons.updateErrorStatus,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    getPersonList: getPersonList,
    addPerson: addPerson,
    updatePerson: updatePerson,
    personSelected: personSelected,
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ContactPerson);