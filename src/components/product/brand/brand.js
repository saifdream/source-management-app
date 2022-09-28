import React, { Component } from 'react';
import {Container, Content, Header, Left, Right, Body, Title, Text, Button, Icon, InputGroup, Textarea, Input, Form, Toast} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {StatusBar, StyleSheet} from 'react-native';
import {useScreens} from "react-native-screens";
import {addBrand, brandSelected, getBrandList, updateBrand} from '../../../actions/product/brand';

useScreens();

class Brand extends Component{
  state = {
    action: "New",
    id: "",
    name: "",
    description: "",
  };

  componentDidMount() {
    this.setState({
      action: this.props.activeBrand ? "Edit" : "New",
      id: this.props.activeBrand ? this.props.activeBrand.id : "",
      name: this.props.activeBrand ? this.props.activeBrand.name : "",
      description: this.props.activeBrand ? this.props.activeBrand.description : "",
    })
  }

  addBrand() {
    const brand = {
      name: this.state.name,
      description: this.state.description,
    };
    this.props.addBrand(brand);
  }

  updateBrand() {
    const brand = {
      name: this.state.name,
      description: this.state.description,
    };
    this.props.updateBrand(brand, this.state.id);
  }

  getAction() {
    if(this.state.action === "Edit")
      return (
        <Button block warning onPress={() => this.updateBrand() } disabled={this.props.isLoading || !this.state.name}>
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
        <Button block warning onPress={() => this.addBrand() } disabled={this.props.isLoading || !this.state.name}>
          {
            this.props.isLoading ?
              <Text>Wait ...</Text>
              :
              <Text>Add New</Text>
          }
        </Button>
      );
  }

  static getDerivedStateFromProps(props, state) {
    if(props.addSuccessStatus || props.updateSuccessStatus) {
      Toast.show({
        text: props.addSuccessStatus || props.updateSuccessStatus,
        position: "bottom",
        duration: 3000,
      });
      props.navigation.goBack();
      setTimeout(() => {
        if (!props.isLoading) {
          props.getBrandList();
        }
      }, 5);
    } else if (props.addErrorStatus || props.updateErrorStatus)
      Toast.show({
        text: props.addErrorStatus || props.updateErrorStatus,
        position: "bottom",
        type: "danger",
        duration: 3000,
      });
    return {};
  }

  render(){
    const { navigation } = this.props;
    return(
      <Container>
        <Header style={{backgroundColor:"#ffbe26", barStyle: "light-content"}}>
          <StatusBar
            backgroundColor="#ffbe26"
            barStyle="light-content" />
          <Left>
            <Button transparent onPress= {()=>navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Brand</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Form style={styles.form}>
            <InputGroup>
              <Input placeholder="Brand Name" onChangeText={(text)=>this.setState({name: text})} value={this.state.name}/>
            </InputGroup>
            <InputGroup>
              <Textarea rowSpan={4} borderd placeholder="Description" onChangeText={(text)=>this.setState({description: text})} value={this.state.description} />
            </InputGroup>
            <Content padder style={{marginTop: 25}}>
              {this.getAction()}
            </Content>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  form: {
    margin: 25,
  },
  logo: {
    width: 250,
    height: 100,
    marginTop: 100,
    marginBottom: 20
  }
});

function mapStateToProps(state){
  //console.log(state)
  return {
    activeBrand : state.brands.activeBrand,
    isLoading: state.brands.isLoading,
    addSuccessStatus: state.brands.addSuccessStatus,
    addErrorStatus: state.brands.addErrorStatus,
    updateSuccessStatus: state.brands.updateSuccessStatus,
    updateErrorStatus: state.brands.updateErrorStatus,
  };
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({getBrandList: getBrandList, addBrand: addBrand, updateBrand: updateBrand, brandSelected: brandSelected}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Brand);