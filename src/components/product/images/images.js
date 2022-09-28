import React, {Component} from 'react';
import {
  Body,
  Button,
  Container,
  Content,
  Form,
  Header,
  Icon,
  Left,
  Right,
  Text,
  Title,
  Toast,
  Item,
  Fab, CardItem, Card, Label, Input,
} from 'native-base';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import { Image, StatusBar} from 'react-native';
import {BASE_URL} from '../../../constant';
import {addImage, getImageList, updateImage} from '../../../actions/product/image';

let url = require('url');

class ProductImage extends Component {
  state = {
    action: this.props.activeImage ? 'Edit' : 'New',
    product: this.props.activeProduct.id || null,
    id: this.props.activeImage ? this.props.activeImage.id : null,
    title: this.props.activeImage ? this.props.activeImage.title : null,
    image: null,
  };

  addImage() {
    const {product, image, title} = this.state;
    const createImageData = () => {
      const data = new FormData();
      data.append('product', product);
      data.append('title', title);
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
    const {title, image} = this.state;
    const updateImageData = () => {
      const data = new FormData();
      data.append('title', title);
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
          props.getImageList(props.activeProduct.id);
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
                disabled={this.props.isLoading || !this.state.title || !this.state.image}>
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
        <Button transparent onPress={() => this.addImage()}
                disabled={this.props.isLoading || !this.state.title || !this.state.image}>
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
    const {title, image} = this.state;

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
            <Title>Product Image</Title>
          </Body>
          <Right>
            {this.getAction()}
          </Right>
        </Header>
        <Content padder>
          <Form>
            <Item stackedLabel>
              <Label>Title</Label>
              <Input onChangeText={(text) => this.setState({title: text})} value={title}/>
            </Item>
            <Card transparent>
              <CardItem button onPress={() => this.handleChooseImage()}>
                <Text>Choose Image:</Text>
              </CardItem>
              <CardItem button onPress={() => this.handleChooseImage()}>
                {
                  !image && activeImage ?
                        <Image
                            source={{uri: BASE_URL + ((url.parse(activeImage.image)).pathname)}}
                            style={{width: null, height: 400, flex: 1}}
                        />
                      :
                      image && (
                            <Image source={{uri: image.uri}} style={{width: null, height: 400, flex: 1}}/>
                      )
                }
              </CardItem>
            </Card>
          </Form>
        </Content>
        {/*<Fab
          containerStyle={{fontSize: 8}}
          style={{ backgroundColor: '#ffbe26' }}
          position="bottomRight"
          onPress={() => this.handleChooseImage()}>
          <Icon name="attach" />
        </Fab>*/}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  //console.log(state);
  return {
    activeProduct: state.products.activeProduct,
    activeImage: state.productImages.activeImage,
    isLoading: state.productImages.isLoading,
    addSuccessStatus: state.productImages.addSuccessStatus,
    addErrorStatus: state.productImages.addErrorStatus,
    updateSuccessStatus: state.productImages.updateSuccessStatus,
    updateErrorStatus: state.productImages.updateErrorStatus,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({getImageList: getImageList, addImage: addImage, updateImage: updateImage}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ProductImage);