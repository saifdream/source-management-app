import React, {Component} from 'react';
import {Body, Button, Container, Content, Form, Header, Icon, Input, Item, Label, Left, Picker, Right, Text, Title,
  Toast, List, ListItem, Spinner, Thumbnail, Grid, Col} from 'native-base';
import {
  ScrollView,
  StyleSheet,
  StatusBar,
  Modal,
  TouchableHighlight,
  View,
  Alert,
  RefreshControl,
  SafeAreaView
} from 'react-native';
import {BASE_URL} from "../../constant";
import {
  getCategoryList,
  getPaginatedCategoryList,
  handleCategorySearch
} from "../../actions/category";
import {bindActionCreators} from "redux";
import {
  addProduct,
  getPreRequisiteData,
  getProductList,
  productSelected,
  updateProduct
} from "../../actions/product/product";
import connect from "react-redux/lib/connect/connect";
const url = require('url');

class Product extends Component {
  //_didFocusSubscription;

  constructor(props) {
    super(props);
    const {activeProduct} = props;
    this.state = {
      modalVisible: false,
      action: activeProduct ? 'Edit' : 'New',
      id: activeProduct ? activeProduct.id : null,
      name: activeProduct ? activeProduct.title : null,
      shortDescription: activeProduct ? activeProduct.short_description : null,
      description: activeProduct ? activeProduct.description : null,
      unit: activeProduct ? activeProduct.unit : null,
      origin: activeProduct ? activeProduct.origin : null,
      category: activeProduct ? activeProduct.category : null,
      categories: activeProduct ? activeProduct.product_categories : [],
      model: activeProduct ? activeProduct.model : null,
      brand: activeProduct ? activeProduct.brand : null,
      unitPrice: activeProduct ? parseFloat(activeProduct.unit_price) : '',
    };

    this.props.getPreRequisiteData();

    /*this._didFocusSubscription = props.navigation.addListener(
      'didFocus',
      payload => {
        this.props.getPreRequisiteData();
      },
    );*/
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
    if(visible) this.props.getCategoryList();
  }

  componentWillUnmount() {
    //this._didFocusSubscription && this._didFocusSubscription.remove();
  }

  addProduct() {
    const {name, shortDescription, description, unit, origin, category, categories, model, brand, unitPrice} = this.state;
    const product = {
      title: name,
      short_description: shortDescription,
      description: description,
      product_categories: categories,
      unit: unit,
      brand: brand,
      origin: origin,
      model: model,
      unit_price: unitPrice,
      is_verified: 'False',
      added_by: global.credential.user_id,
      updated_by: global.credential.user_id,
    };
    this.props.addProduct(product);
  }

  updateProduct() {
    const {name, shortDescription, description, unit, origin, category, categories, model, brand, unitPrice} = this.state;
    const product = {
      title: name,
      short_description: shortDescription,
      description: description,
      product_categories: categories, /*{"product": 2, "category": "Chitra"}*/
      unit: unit,
      origin: origin,
      brand: brand,
      model: model,
      unit_price: unitPrice,
      is_verified: 'False',
      updated_by: global.credential.user_id,
    };
    this.props.updateProduct(product, this.state.id);
  }

  addCategoryItem(category) {
    const newCategory = {product: this.state.id, category: category.name}
    this.setState(prevState => ({
      categories: [...prevState.categories, newCategory]
    }))
  }

  removeCategoryItem(removeIndex) {
    this.setState(state => {
      const categories = state.categories.filter((item, index) => index !== removeIndex);
      return {
        categories,
      };
    });

    /*let array = [...this.state.people];
    let index = array.indexOf(e.target.value);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({people: array});
    }*/
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
          props.getProductList();
        }
      }, 5);
    } else if (addErrorStatus || updateErrorStatus)
      Toast.show({
        text: addErrorStatus || updateErrorStatus,
        position: 'bottom',
        type: 'danger',
        duration: 3000,
      });
    else if (props.listErrorStatus)
      Toast.show({
        text: props.listErrorStatus.message || props.listErrorStatus,
        position: 'bottom',
        type: 'danger',
        duration: 3000,
      });
    return {};
  }

  getAction() {
    const {isLoading} = this.props;
    const {name, category, unitPrice} = this.state;
    if (this.state.action === 'Edit')
      return (
        <Button transparent onPress={() => this.updateProduct()} disabled={isLoading || !name || !unitPrice}>
          {
            isLoading ? <Text>Wait ...</Text> : <Text>Update</Text>
          }
        </Button>
      );
    else
      return (
        <Button transparent onPress={() => this.addProduct()} disabled={isLoading || !name || !unitPrice}>
          {
            isLoading ? <Text>Wait ...</Text> : <Text>Save</Text>
          }
        </Button>
      );
  }

  handleCategorySearch(text) {
    clearTimeout(this.timeout);
    if (text) {
      this.timeout = setTimeout(() => {
        this.props.handleCategorySearch(text);
      }, 1000);
    } else this.props.getCategoryList();
  }

  render() {
    const {navigation, units, brands, origins, categoryList} = this.props;
    const {name, shortDescription, description, model, unit, brand, origin, unitPrice} = this.state;
    return (
      <Container>
        <Header style={{backgroundColor: '#FF9501', barStyle: 'light-content'}}>
          <StatusBar
            backgroundColor="#FF9501"
            barStyle="light-content"/>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name='arrow-back'/>
            </Button>
          </Left>
          <Body>
            <Title>Product</Title>
          </Body>
          <Right>
            {this.getAction()}
          </Right>
        </Header>
        <Content padder>
          <ScrollView>
            <Form style={styles.form}>
              <Item stackedLabel>
                <Label>Name</Label>
                <Input onChangeText={(text) => this.setState({name: text})} value={name}/>
              </Item>
              <Item stackedLabel>
                <Label>Short Description</Label>
                {/*<Input onChangeText={(text) => this.setState({shortDescription: text})} value={shortDescription}/>*/}
                {/*<Textarea rowSpan={3}  onChangeText={(text) => this.setState({shortDescription: text})} value={shortDescription}/>*/}
                <Input multiline={true} numberOfLines={2} onChangeText={(text) => this.setState({shortDescription: text})} value={shortDescription}/>
              </Item>
              <Item stackedLabel>
                <Label>Description</Label>
                {/*<Input onChangeText={(text) => this.setState({description: text})} value={description}/>*/}
                <Input multiline={true} numberOfLines={5} onChangeText={(text) => this.setState({description: text})} value={description}/>
                {/*<Textarea rowSpan={5} onChangeText={(text) => this.setState({description: text})} value={description}/>*/}
              </Item>
              <Item stackedLabel>
                <Label>Unit Price</Label>
                <Input keyboardType='numeric' returnKeyType="go" onChangeText={(text) => this.setState({unitPrice: parseFloat(text)})}
                       value={`${unitPrice}`}/>
              </Item>
              {/*<Item>
                <Label>Category</Label>
                <Picker
                    renderHeader={backAction =>
                        <Header style={{ backgroundColor: "#FF9501" }}>
                          <Left>
                            <Button transparent onPress={backAction}>
                              <Icon name="arrow-back" style={{ color: "#fff" }} />
                            </Button>
                          </Left>
                          <Body style={{ flex: 3 }}>
                            <Title style={{ color: "#fff" }}>Choose A Category</Title>
                          </Body>
                          <Right />
                        </Header>}
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    selectedValue={category}
                    onValueChange={(itemValue, itemPosition) => this.setState({category: itemValue})}
                >
                  <Picker.Item label="Choose One"/>
                  {
                    categories && categories.map((category)=>{
                      return (<Picker.Item key={category.id} label={category.name} value={category.id} />)
                    })
                  }
                </Picker>
                <Button small transparent rounded onPress={()=>this.props.navigation.navigate('Category')}>
                  <Icon name="add" style={{color: '#FF9501'}}/>
                </Button>
              </Item>*/}

              <Item stackedLabel>
                <Label>Model</Label>
                <Input onChangeText={(text) => this.setState({model: text})} value={model}/>
              </Item>
              <Item>
                <Label>Units</Label>
                <Picker
                  renderHeader={backAction =>
                    <Header style={{ backgroundColor: "#FF9501" }}>
                      <Left>
                        <Button transparent onPress={backAction}>
                          <Icon name="arrow-back" style={{ color: "#fff" }} />
                        </Button>
                      </Left>
                      <Body style={{ flex: 3 }}>
                        <Title style={{ color: "#fff" }}>Choose A Unit</Title>
                      </Body>
                      <Right />
                    </Header>}
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  selectedValue={unit}
                  onValueChange={(itemValue, itemPosition) => this.setState({unit: itemValue})}
                >
                  <Picker.Item label="Choose One"/>
                  {
                    units && units.map((unit)=>{
                      return (<Picker.Item key={unit.id} label={unit.name} value={unit.name} />)
                    })
                  }
                </Picker>
                <Button small transparent rounded onPress={()=>this.props.navigation.navigate('Unit')}>
                  <Icon name="add" style={{color: '#FF9501'}}/>
                </Button>
              </Item>
              <Item>
                <Label>Brands</Label>
                <Picker
                  renderHeader={backAction =>
                    <Header style={{ backgroundColor: "#FF9501" }}>
                      <Left>
                        <Button transparent onPress={backAction}>
                          <Icon name="arrow-back" style={{ color: "#fff" }} />
                        </Button>
                      </Left>
                      <Body style={{ flex: 3 }}>
                        <Title style={{ color: "#fff" }}>Choose A Brand</Title>
                      </Body>
                      <Right />
                    </Header>}
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  selectedValue={brand}
                  onValueChange={(itemValue, itemPosition) => this.setState({brand: itemValue})}
                >
                  <Picker.Item label="Choose One"/>
                  {
                    brands && brands.map((brand)=>{
                      return (<Picker.Item key={brand.id} label={brand.name} value={brand.name} />)
                    })
                  }
                </Picker>
                <Button small transparent rounded onPress={()=>this.props.navigation.navigate('Brand')}>
                  <Icon name="add" style={{color: '#FF9501'}}/>
                </Button>
              </Item>
              <Item>
                <Label>Origins</Label>
                <Picker
                  renderHeader={backAction =>
                    <Header style={{ backgroundColor: "#FF9501" }}>
                      <Left>
                        <Button transparent onPress={backAction}>
                          <Icon name="arrow-back" style={{ color: "#fff" }} />
                        </Button>
                      </Left>
                      <Body style={{ flex: 3 }}>
                        <Title style={{ color: "#fff" }}>Choose A Origin</Title>
                      </Body>
                      <Right />
                    </Header>}
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  selectedValue={origin}
                  onValueChange={(itemValue, itemPosition) => this.setState({origin: itemValue})}
                >
                  <Picker.Item label="Choose One"/>
                  {
                    origins && origins.map((origin)=>{
                      return (<Picker.Item key={origin.id} label={origin.name} value={origin.id} />)
                    })
                  }
                </Picker>
                <Button small transparent rounded onPress={()=>this.props.navigation.navigate('Origin')}>
                  <Icon name="add" style={{color: '#FF9501'}}/>
                </Button>
              </Item>
              <List>
                <ListItem itemDivider icon>
                  <Left><Text>Categories</Text></Left>
                  <Body/>
                  <Right>
                    <Button small transparent rounded onPress={()=>this.setModalVisible(true)}>
                      <Icon name="add" style={{color: '#FF9501'}}/>
                    </Button>
                  </Right>
                </ListItem>
                {
                  this.state.categories.map((item, index)=>{
                    return <ListItem>
                      <Text>{item.category}</Text>
                      <Body/>
                      {
                        !item.hasOwnProperty("id") ?
                            <Right>
                              <Button small transparent rounded onPress={()=>this.removeCategoryItem(index)}>
                                <Icon name="remove" style={{color: '#FF9501'}}/>
                              </Button>
                            </Right>
                            :
                            <Right/>
                      }
                    </ListItem>
                  })
                }
              </List>
            </Form>
          </ScrollView>
        </Content>

        <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              console.log('Modal has been closed.');
            }}>
          <Container>
            <Header style={{backgroundColor: '#FF9501', barStyle: 'light-content'}}>
              <StatusBar
                  backgroundColor="#FF9501"
                  barStyle="light-content"/>
              <Body>
                <Title>Category</Title>
              </Body>
              <Right>
                <Button transparent onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                  <Icon name='close'/>
                </Button>
              </Right>
            </Header>
            <View>
              <ScrollView
                  refreshControl={
                    <RefreshControl colors={['#ffbe26']} progressBackgroundColor="#fff"
                                    refreshing={this.props.isCategoryLoading}
                                    onRefresh={() => this.props.getCategoryList()}/>
                  }
              >
                {
                  categoryList.length === 0 ?
                      <Content padder contentContainerStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: 40,
                        paddingHorizontal: 10,
                      }}>
                        {
                          this.props.isCategoryLoading ?
                              <Content>
                                <Text style={{fontSize: 14, fontWeight: 'bold', textAlign: 'center'}}>
                                  Loading Category List, Please wait
                                </Text>
                                <Spinner/>
                              </Content>
                              :
                              <Text style={{fontSize: 14, fontWeight: 'bold', textAlign: 'center'}}>No data
                                found</Text>
                        }
                      </Content>
                      :
                      <Content padder>
                        <SafeAreaView>
                          <List
                              dataArray={categoryList}
                              renderRow={(category) =>
                                  <ListItem
                                      key={category.name}
                                      keyExtractor={(category, index) => index.toString()}
                                      thumbnail
                                  >
                                    <Left>
                                      {
                                        category['image'] ?
                                            <Thumbnail square
                                                       source={{uri: BASE_URL + ((url.parse(category['image'])).pathname)}}/>
                                            :
                                            <Thumbnail square
                                                       source={require('../../img/image-icon.png')}/>
                                      }
                                    </Left>
                                    <Body>
                                      <Text>{category.name}</Text>
                                      <Text note numberOfLines={1}>{category.description}</Text>
                                    </Body>
                                    <Right>
                                      <Button transparent onPress={() => {
                                        this.addCategoryItem(category);
                                        this.setModalVisible(!this.state.modalVisible);
                                      }}>
                                        <Icon name='add' style={{color: '#ffbe26'}}/>
                                      </Button>
                                    </Right>
                                  </ListItem>
                              }>
                          </List>
                          <Grid style={{marginTop: 25}}>
                            <Col>
                              {
                                this.props.previous ?
                                    <Left>
                                      <Button transparent onPress={() => {
                                        this.props.getPaginatedList(this.props.previous);
                                      }}>
                                        <Text style={{color: '#ffbe26'}}>Prev</Text>
                                      </Button>
                                    </Left>
                                    :
                                    <Left/>
                              }
                            </Col>
                            <Col>
                              {
                                this.props.next ?
                                    <Right>
                                      <Button transparent onPress={() => {
                                        this.props.getPaginatedList(this.props.next);
                                      }}>
                                        <Text style={{color: '#ffbe26'}}>Next</Text>
                                      </Button>
                                    </Right>
                                    :
                                    <Right/>
                              }
                            </Col>
                          </Grid>
                        </SafeAreaView>
                      </Content>
                }
              </ScrollView>

              {/*<TouchableHighlight
                  onPress={() => {
                    this.addCategoryItem({product: this.state.id, category: "Chitra"});
                    setTimeout(()=>{console.log(this.state.categories)}, 2000);
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>*/}
            </View>
          </Container>
        </Modal>
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
    categoryList: state.categories.categoryList || [],
    isCategoryLoading: state.categories.isLoading,
    next: state.categories.next,
    previous: state.categories.previous,
    listErrorStatus: state.categories.listErrorStatus,


    categories: state.products.preRequisiteList.categories || [],
    units: state.products.preRequisiteList.units || [],
    brands: state.products.preRequisiteList.brands || [],
    origins: state.products.preRequisiteList.origins || [],
    activeProduct: state.products.activeProduct,
    isLoading: state.products.isLoading,
    addSuccessStatus: state.products.addSuccessStatus,
    addErrorStatus: state.products.addErrorStatus,
    updateSuccessStatus: state.products.updateSuccessStatus,
    updateErrorStatus: state.products.updateErrorStatus,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    getProductList: getProductList,
    addProduct: addProduct,
    updateProduct: updateProduct,
    productSelected: productSelected,
    getPreRequisiteData: getPreRequisiteData,

    getCategoryList: getCategoryList,
    getPaginatedList: getPaginatedCategoryList,
    handleCategorySearch: handleCategorySearch,
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Product);