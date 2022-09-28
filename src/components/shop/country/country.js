import React, { Component } from 'react';
import {Container, Content, Header, Left, Right, Body, Title, Text, Button, Icon, InputGroup, Textarea, Input, Form, Toast} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {StatusBar, StyleSheet} from 'react-native';
import {useScreens} from "react-native-screens";
import {addCountry, countrySelected, getCountryList, updateCountry} from '../../../actions/shop/country';

useScreens();

class Country extends Component{
  state = {
    action: "New",
    id: "",
    name: "",
    description: "",
  };

  componentDidMount() {
    this.setState({
      action: this.props.activeCountry ? "Edit" : "New",
      id: this.props.activeCountry ? this.props.activeCountry.id : "",
      name: this.props.activeCountry ? this.props.activeCountry.name : "",
    })
  }

  addCountry() {
    const country = {
      name: this.state.name,
      description: this.state.description,
    };
    this.props.addCountry(country);
  }

  updateCountry() {
    const country = {
      name: this.state.name,
    };
    this.props.updateCountry(country, this.state.id);
  }

  getAction() {
    if(this.state.action === "Edit")
      return (
        <Button block warning onPress={() => this.updateCountry() } disabled={this.props.isLoading || !this.state.name}>
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
        <Button block warning onPress={() => this.addCountry() } disabled={this.props.isLoading || !this.state.name}>
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
          props.getCountryList();
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
            <Title>Country</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Form style={styles.form}>
            <InputGroup>
              <Input placeholder="Country Name" onChangeText={(text)=>this.setState({name: text})} value={this.state.name}/>
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
    activeCountry : state.countries.activeCountry,
    isLoading: state.countries.isLoading,
    addSuccessStatus: state.countries.addSuccessStatus,
    addErrorStatus: state.countries.addErrorStatus,
    updateSuccessStatus: state.countries.updateSuccessStatus,
    updateErrorStatus: state.countries.updateErrorStatus,
  };
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({getCountryList: getCountryList, addCountry: addCountry, updateCountry: updateCountry, countrySelected: countrySelected}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Country);