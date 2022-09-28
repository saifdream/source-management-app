import React, {Component} from 'react';
import {Container, Content, Form, Card, CardItem, Body, Item, Label, Text, Toast,} from 'native-base';
import {connect} from 'react-redux';
import {ScrollView, StyleSheet, StatusBar, Image} from 'react-native';

class ProductInfo extends Component {

  constructor(props) {
    super(props);
    const {activeProduct} = props;
    //console.log(props)
    this.state = {
      action: activeProduct ? 'Edit' : 'New',
      id: activeProduct ? activeProduct.id : null,
      name: activeProduct ? activeProduct.title : null,
      shortDescription: activeProduct ? activeProduct.short_description : null,
      description: activeProduct ? activeProduct.description : null,
      sku: activeProduct ? activeProduct.sku : null,
      unit: activeProduct ? activeProduct.unit : null,
      origin: activeProduct ? activeProduct.origin : null,
      category: activeProduct ? activeProduct.category : null,
      model: activeProduct ? activeProduct.model : null,
      brand: activeProduct ? activeProduct.brand : null,
      unitPrice: activeProduct ? activeProduct.unit_price : null,
    };
  }

  render() {
    const {name, shortDescription, description, category, sku, model, unit, brand, origin, unitPrice} = this.state;
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
                <Text>Short Description: {shortDescription}</Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>Description: {description}</Text>
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
                <Text>Unit Price: {unitPrice}</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    units: state.products.preRequisiteList.units || [],
    brands: state.products.preRequisiteList.brands || [],
    origins: state.products.preRequisiteList.origins || [],
    activeProduct: state.products.activeProduct,
    isLoading: state.products.isLoading,
  };
}

export default connect(mapStateToProps)(ProductInfo);