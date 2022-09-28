import React, {Component} from 'react';
import {Body, Button, Container, Content, Form, Header, Icon, Input, Item, Label, Left, Picker, Right, Text, Title, Toast,} from 'native-base';
import {bindActionCreators} from 'redux';
import {
  getPreRequisiteSourceData, sourceProductSelected, getSourceProductListByShop, addSourceProduct, updateSourceProduct,
} from '../../../actions/shop/source-product/source-product';
import {connect} from 'react-redux';
import {ScrollView, StyleSheet, StatusBar} from 'react-native';
const url = require('url');

class SourceProduct extends Component {
  //_didFocusSubscription;

  constructor(props) {
    super(props);
    const {activeProduct, activeShop} = props;
    this.state = {
      action: activeProduct ? 'Edit' : 'New',
      shop: activeShop.id || null,
      product: activeProduct ? (activeProduct.product.product || null) : null,
      id: activeProduct ? activeProduct.id : null,
      name: activeProduct ? activeProduct.local_name : null,
      sourcePrice: activeProduct ? parseFloat(activeProduct.source_price) : '',
    };

    this.props.getPreRequisiteData();

    /*this._didFocusSubscription = props.navigation.addListener(
      'didFocus',
      payload => {
        this.props.getPreRequisiteData();
      },
    );*/
  }

  componentWillUnmount() {
    //this._didFocusSubscription && this._didFocusSubscription.remove();
  }

  addProduct() {
    const {shop, name, product, sourcePrice} = this.state;
    const sourceProduct = {
      shop: shop,
      product: product,
      local_name: name,
      source_price: sourcePrice,
      source_by: global.credential.user_id,
      is_verified: 'False',
      added_by: global.credential.user_id,
      //updated_by: global.credential.user_id,
    };
    this.props.addProduct(sourceProduct);
  }

  updateProduct() {
    const {shop, name, product, sourcePrice} = this.state;
    const sourceProduct = {
      shop: shop,
      product: product,
      name: name,
      source_price: sourcePrice,
      is_verified: 'False',
      //source_by: global.credential.user_id,
      updated_by: global.credential.user_id,
    };
    this.props.updateProduct(sourceProduct, this.state.id);
  }

  static getDerivedStateFromProps(props, state) {
    const {navigation, updateSuccessStatus, addSuccessStatus, addErrorStatus, updateErrorStatus} = props;
    if (addSuccessStatus || updateSuccessStatus) {
      Toast.show({
        text: addSuccessStatus || updateSuccessStatus,
        position: 'bottom',
        duration: 3000,
      });
      navigation.goBack();
      setTimeout(() => {
        if (!props.isLoading) {
          props.getProductList(props.activeShop.id);
        }
      }, 5);
    } else if (addErrorStatus || updateErrorStatus)
      Toast.show({
        text: addErrorStatus || updateErrorStatus,
        position: 'bottom',
        type: 'danger',
        duration: 3000,
      });
    return {};
  }

  getAction() {
    const {isLoading} = this.props;
    const {name, sourcePrice} = this.state;
    if (this.state.action === 'Edit')
      return (
        <Button transparent onPress={() => this.updateProduct()} disabled={isLoading || !name || !sourcePrice}>
          {
            isLoading ? <Text>Wait ...</Text> : <Text>Update</Text>
          }
        </Button>
      );
    else
      return (
        <Button transparent onPress={() => this.addProduct()} disabled={isLoading || !name || !sourcePrice}>
          {
            isLoading ? <Text>Wait ...</Text> : <Text>Save</Text>
          }
        </Button>
      );
  }

  render() {
    const {navigation, products} = this.props;
    const {name, product, sourcePrice} = this.state;
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
            <Title>Shop Product</Title>
          </Body>
          <Right>
            {this.getAction()}
          </Right>
        </Header>
        <Content padder>
          <ScrollView>
            <Form style={styles.form}>
              <Item>
                <Label style={{fontWeight: 'bold'}}>Product</Label>
                <Picker
                    renderHeader={backAction =>
                        <Header style={{ backgroundColor: "#ffbe26" }}>
                          <Left>
                            <Button transparent onPress={backAction}>
                              <Icon name="arrow-back" style={{ color: "#fff" }} />
                            </Button>
                          </Left>
                          <Body style={{ flex: 3 }}>
                            <Title style={{ color: "#fff" }}>Choose A Product</Title>
                          </Body>
                          <Right />
                        </Header>}
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    selectedValue={product}
                    onValueChange={(itemValue, itemPosition) => this.setState({product: itemValue})}
                >
                  <Picker.Item label="Choose One"/>
                  {
                    products && products.map((product)=>{
                      return (<Picker.Item key={product.id} label={product.title} value={product.id} />)
                    })
                  }
                </Picker>
                <Button small transparent rounded onPress={()=>this.props.navigation.navigate('SourceProduct')}>
                  <Icon name="add" style={{color: '#ffbe26'}}/>
                </Button>
              </Item>
              <Item stackedLabel>
                <Label>Local Name</Label>
                <Input onChangeText={(text) => this.setState({name: text})} value={name}/>
              </Item>
              <Item stackedLabel>
                <Label>Source Price</Label>
                <Input keyboardType='numeric' returnKeyType="go" onChangeText={(text) => this.setState({sourcePrice: parseFloat(text)})}
                       value={`${sourcePrice}`}/>
              </Item>
            </Form>
          </ScrollView>
        </Content>
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
  console.log(state);
  return {
    activeShop: state.shops.activeShop,
    products: state.sourceProducts.preRequisiteList.products || [],
    activeProduct: state.sourceProducts.activeProduct,
    isLoading: state.sourceProducts.isLoading,
    addSuccessStatus: state.sourceProducts.addSuccessStatus,
    addErrorStatus: state.sourceProducts.addErrorStatus,
    updateSuccessStatus: state.sourceProducts.updateSuccessStatus,
    updateErrorStatus: state.sourceProducts.updateErrorStatus,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    getProductList: getSourceProductListByShop,
    addProduct: addSourceProduct,
    updateProduct: updateSourceProduct,
    productSelected: sourceProductSelected,
    getPreRequisiteData: getPreRequisiteSourceData
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SourceProduct);