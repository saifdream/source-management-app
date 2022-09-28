import React, {Component} from 'react';
import {
  Container,
  Content,
  Header,
  Left,
  Right,
  Body,
  Title,
  Text,
  Button,
  Icon,
  InputGroup,
  Textarea,
  Input,
  Label,
  Form,
  Toast,
} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {StatusBar, StyleSheet} from 'react-native';
import {useScreens} from 'react-native-screens';
import {addUnit, getUnitList, unitSelected, updateUnit} from '../../../actions/product/unit';

useScreens();

class Unit extends Component {
  state = {
    action: 'New',
    id: '',
    name: '',
    description: '',
    isLoading: false,
  };

  componentDidMount() {
    this.setState({
      action: this.props.activeUnit ? 'Edit' : 'New',
      id: this.props.activeUnit ? this.props.activeUnit.id : '',
      name: this.props.activeUnit ? this.props.activeUnit.name : '',
      description: this.props.activeUnit ? this.props.activeUnit.description : '',
    });
  }

  addUnit() {
    const unit = {
      name: this.state.name,
      description: this.state.description,
    };
    this.props.addUnit(unit);
  }

  updateUnit() {
    const unit = {
      name: this.state.name,
      description: this.state.description,
    };
    this.props.updateUnit(unit, this.state.id);
  }

  getAction() {
    if (this.state.action === 'Edit')
      return (
        <Button block warning onPress={() => this.updateUnit()} disabled={this.props.isLoading || !this.state.name}>
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
        <Button block warning onPress={() => this.addUnit()} disabled={this.props.isLoading || !this.state.name}>
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
    //console.log(props, state);
    if (props.addSuccessStatus || props.updateSuccessStatus) {
      Toast.show({
        text: props.addSuccessStatus || props.updateSuccessStatus,
        position: 'bottom',
        duration: 1000,
      });
      props.navigation.goBack();
      setTimeout(() => {
        if (!props.isLoading) {
          props.getUnitList();
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
    const {navigation} = this.props;
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
            <Title>Unit</Title>
          </Body>
          <Right/>
        </Header>
        <Content padder>
          <Form style={styles.form}>
            <InputGroup>
              <Input placeholder="Unit Name" onChangeText={(text) => this.setState({name: text})}
                     value={this.state.name}/>
            </InputGroup>
            <InputGroup>
              <Textarea rowSpan={4} borderd placeholder="Description"
                        onChangeText={(text) => this.setState({description: text})} value={this.state.description}/>
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
    marginBottom: 20,
  },
});

function mapStateToProps(state) {
  //console.log(state)
  return {
    activeUnit: state.units.activeUnit,
    isLoading: state.units.isLoading,
    addSuccessStatus: state.units.addSuccessStatus,
    addErrorStatus: state.units.addErrorStatus,
    updateSuccessStatus: state.units.updateSuccessStatus,
    updateErrorStatus: state.units.updateErrorStatus,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    getUnitList: getUnitList,
    addUnit: addUnit,
    updateUnit: updateUnit,
    unitSelected: unitSelected,
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Unit);