import React, {Component} from 'react';
import {Container, Content, Form, Card, CardItem, Body, Item, Label, Text, Toast,} from 'native-base';
import {connect} from 'react-redux';
import {ScrollView, StyleSheet, StatusBar, Image} from 'react-native';

class SourceProductInfo extends Component {

  constructor(props) {
    super(props);
    const {activeProduct, activeShop} = props;
    //console.log(props)
    this.state = {
      action: activeProduct ? 'Edit' : 'New',
      shop: activeShop.id || null,
      id: activeProduct ? activeProduct.id : null,
      name: activeProduct ? activeProduct.name : null,
      sku: activeProduct ? activeProduct.sku : null,
      unit: activeProduct ? activeProduct.unit : null,
      origin: activeProduct ? activeProduct.origin : null,
      category: activeProduct ? activeProduct.category : null,
      model: activeProduct ? activeProduct.model : null,
      brand: activeProduct ? activeProduct.brand : null,
      sourcePrice: activeProduct ? activeProduct.source_price : null,
      sourceProductSpecs: activeProduct ? activeProduct.source_product_specs : null,
      sourceProductImages: activeProduct ? activeProduct.source_product_images : null,
    };
  }

  render() {
    const {name, category, sku, model, unit, brand, origin, sourcePrice, sourceProductSpecs, sourceProductImages} = this.state;
    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text>Product Information</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>Name: {name}</Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>Category: {category}</Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>SKU: {sku}</Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>Model: {model}</Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>Unit: {unit}</Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>Brand: {brand}</Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>Origin: {origin}</Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>Source Price: {sourcePrice}</Text>
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
    units: state.sourceProducts.preRequisiteList.units || [],
    brands: state.sourceProducts.preRequisiteList.brands || [],
    origins: state.sourceProducts.preRequisiteList.origins || [],
    activeProduct: state.sourceProducts.activeProduct,
    isLoading: state.sourceProducts.isLoading,
  };
}

export default connect(mapStateToProps)(SourceProductInfo);