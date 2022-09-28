import React, {Component} from 'react';
import {
    Container, Content, Header, Left, Right, Body, Title, Text, Button, Icon, Input, Item,
    Label, Form, Toast, Picker, Fab, Thumbnail, CardItem, Card
} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Image, SafeAreaView, StatusBar, Switch, View} from 'react-native';
import {useScreens} from 'react-native-screens';
import {addAttribute, getAttributeList, attributeSelected, updateAttribute} from '../../actions/attribute';

useScreens();

class Attribute extends Component {
    constructor(props) {
        super(props);

        this.state = {
            action: props.activeAttribute ? 'Edit' : 'New',
            id: props.activeAttribute ? props.activeAttribute.id : '',
            name: props.activeAttribute ? props.activeAttribute.key : '',
            attributeList: props.attributeList,
        };
    }

    addAttribute() {
        const createAttributeData = () => {
            const {name} = this.state;
            const data = new FormData();
            data.append('key', name);
            return data;
        };
        this.props.addAttribute(createAttributeData());
    }

    updateAttribute() {
        const updateAttributeData = () => {
            const {name} = this.state;
            const data = new FormData();
            data.append('key', name);
            return data;
        };
        this.props.updateAttribute(updateAttributeData(), this.state.id);
    }

    getAction() {
        if (this.state.action === 'Edit')
            return (
                <Button transparent onPress={() => this.updateAttribute()}
                        disabled={this.props.isLoading || !this.state.name}>
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
                <Button transparent onPress={() => this.addAttribute()}
                        disabled={this.props.isLoading || !this.state.name}>
                    {
                        this.props.isLoading ?
                            <Text>Wait ...</Text>
                            :
                            <Text>Save</Text>
                    }
                </Button>
            );
    }

    static getDerivedStateFromProps(props, state) {
        if (props.addSuccessStatus || props.updateSuccessStatus) {
            Toast.show({
                text: props.addSuccessStatus || props.updateSuccessStatus,
                position: 'bottom',
                duration: 1000,
            });
            props.navigation.goBack();
            setTimeout(() => {
                if (!props.isLoading) {
                    props.getAttributeList();
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
        const {name} = this.state;
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
                        <Title>Attribute</Title>
                    </Body>
                    <Right>
                        {this.getAction()}
                    </Right>
                </Header>
                <Content padder>
                    <SafeAreaView>
                        <Form>
                            <Item stackedLabel>
                                <Label>Name</Label>
                                <Input onChangeText={(text) => this.setState({name: text})} value={name}/>
                            </Item>
                        </Form>
                    </SafeAreaView>
                </Content>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    //console.log(state);
    return {
        activeAttribute: state.attributes.activeAttribute,
        attributeList: state.attributes.attributeList || [],
        isLoading: state.attributes.isLoading,
        addSuccessStatus: state.attributes.addSuccessStatus,
        addErrorStatus: state.attributes.addErrorStatus,
        updateSuccessStatus: state.attributes.updateSuccessStatus,
        updateErrorStatus: state.attributes.updateErrorStatus,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getAttributeList: getAttributeList,
        addAttribute: addAttribute,
        updateAttribute: updateAttribute,
        attributeSelected: attributeSelected,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Attribute);