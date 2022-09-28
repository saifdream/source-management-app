import React, {Component} from 'react';
import {
  Body,
  Button,
  Container,
  Content, Fab,
  Form,
  Header,
  Icon,
  Left,
  Right,
  Text,
  Title, Toast,
} from 'native-base';
import {bindActionCreators} from 'redux';
import {addImage, getImageList, imageSelected, updateImage} from '../../../actions/shop/image';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import {View, Image, ScrollView, StyleSheet, StatusBar} from 'react-native';
import {BASE_URL} from '../../../constant';

const url = require('url');

class ShopImage extends Component {
  state = {
    action: this.props.activeImage ? 'Edit' : 'New',
    shop: this.props.activeShop.id || null,
    id: this.props.activeImage ? this.props.activeImage.id : null,
    image: null,
  };

  addImage() {
    const {shop, image} = this.state;
    const createImageData = () => {
      const data = new FormData();
      data.append('shop', shop);
      data.append('image', {
        name: image.fileName,
        type: image.type,
        uri: Platform.OS === 'android' ? image.uri : image.uri.replace('file://', ''),
      });
      return data;
    };
    //console.log(createImageData())
    this.props.addImage(createImageData());
  }

  updateImage() {
    const {image} = this.state;
    const updateImageData = () => {
      const data = new FormData();
      data.append('image', {
        name: image.fileName,
        type: image.type,
        uri: Platform.OS === 'android' ? image.uri : image.uri.replace('file://', ''),
      });
      return data;
    };
    this.props.updateImage(updateImageData(), this.state.id);
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
          props.getImageList(props.activeShop.id);
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

  /*handleUploadImage = () => {
    const {shop, image} = this.state;
    const createFormData = () => {
      const data = new FormData();
      data.append('shop', shop);
      data.append('image', {
        name: image.fileName,
        type: image.type,
        uri: Platform.OS === 'android' ? image.uri : image.uri.replace('file://', ''),
      });
      return data;
    };

    fetch(`${API}shop-images/`, {
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

  handleChooseImage = () => {
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
        <Button transparent onPress={() => this.updateImage()}
                disabled={this.props.isLoading || !this.state.image}>
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
        <Button transparent onPress={() => this.addImage()} disabled={this.props.isLoading || !this.state.image}>
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
    const {activeImage} = this.props;
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
            <Title>Shop Image</Title>
          </Body>
          <Right>
            {this.getAction()}
          </Right>
        </Header>
        <Content padder>
          <Form style={styles.form}>
            <Text>Choose Image:</Text>
            <Content>
              {
                !image && activeImage ?
                  <Image
                    source={{uri: `${BASE_URL}${activeImage.image}`}}
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
        </Content>
        <Fab
          containerStyle={{fontSize: 8}}
          style={{ backgroundColor: '#ffbe26' }}
          position="bottomRight"
          onPress={() => this.handleChooseImage()}>
          <Icon name="attach" />
        </Fab>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    margin: 5,
  },
});

function mapStateToProps(state) {
  //console.log(state);
  return {
    activeShop: state.shops.activeShop,
    activeImage: state.shopImages.activeImage,
    isLoading: state.shopImages.isLoading,
    addSuccessStatus: state.shopImages.addSuccessStatus,
    addErrorStatus: state.shopImages.addErrorStatus,
    updateSuccessStatus: state.shopImages.updateSuccessStatus,
    updateErrorStatus: state.shopImages.updateErrorStatus,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({getImageList: getImageList, addImage: addImage, updateImage: updateImage}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ShopImage);