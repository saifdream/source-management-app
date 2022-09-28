import React, {Component} from 'react';
import {
    Body,
    Button,
    Container,
    Content,
    Form,
    Header,
    Icon,
    Input,
    InputGroup, Item,
    Label,
    Left, Picker,
    Right,
    Text,
    Textarea,
    Title,
    Toast,
} from 'native-base';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {StyleSheet, StatusBar} from 'react-native';
import {addSpec, getSpecList, updateSpec, getPreRequisiteSpecData} from '../../../actions/product/spec';

class ProductSpec extends Component {
    state = {
        action: this.props.activeSpec ? 'Edit' : 'New',
        product: this.props.activeProduct.id || null,
        id: this.props.activeSpec ? this.props.activeSpec.id : null,
        key: this.props.activeSpec ? this.props.activeSpec.key : null,
        value: this.props.activeSpec ? this.props.activeSpec.value : null,
    };

    addSpec() {
        const {product, key, value} = this.state;
        const spec = {
            product: product,
            key: key,
            value: value,
        };
        this.props.addSpec(spec);
    }

    updateSpec() {
        const {product, key, value} = this.state;
        const spec = {
            product: product,
            key: key,
            value: value,
        };
        this.props.updateSpec(spec, this.state.id);
    }

    static getDerivedStateFromProps(props, state) {
        const {navigation, addSuccessStatus, updateSuccessStatus, addErrorStatus, updateErrorStatus} = props;
        if (addSuccessStatus || updateSuccessStatus) {
            Toast.show({
                text: addSuccessStatus || updateSuccessStatus,
                position: 'bottom',
                duration: 1000,
            });
            navigation.goBack();
            setTimeout(() => {
                if (!props.isLoading) {
                    props.getSpecList(props.activeProduct.id);
                }
            }, 5);
        } else if (addErrorStatus || updateErrorStatus)
            Toast.show({
                text: addErrorStatus || updateErrorStatus,
                position: 'bottom',
                type: 'danger',
                duration: 2000,
            });
        return {};
    }

    getAction() {
        const {isLoading} = this.props;
        const {action, key, value} = this.state;
        if (action === 'Edit')
            return (
                <Button transparent onPress={() => this.updateSpec()}
                        disabled={isLoading || !key || !value}>
                    {
                        isLoading ?
                            <Text>Wait ...</Text>
                            :
                            <Text>Update</Text>
                    }
                </Button>
            );
        else
            return (
                <Button transparent onPress={() => this.addSpec()}
                        disabled={isLoading || !key || !value}>
                    {
                        isLoading ?
                            <Text>Wait ...</Text>
                            :
                            <Text>Save</Text>
                    }
                </Button>
            );
    }

    render() {
        const {navigation, attributes} = this.props;
        const {key, value} = this.state;

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
                        <Title>Product Spec</Title>
                    </Body>
                    <Right>
                        {this.getAction()}
                    </Right>
                </Header>
                <Content padder>
                    <Form style={styles.form}>
                        <Item>
                            <Label>Attribute</Label>
                            <Picker
                                renderHeader={backAction =>
                                    <Header style={{backgroundColor: "#ffbe26"}}>
                                        <Left>
                                            <Button transparent onPress={backAction}>
                                                <Icon name="arrow-back" style={{color: "#fff"}}/>
                                            </Button>
                                        </Left>
                                        <Body style={{flex: 3}}>
                                            <Title style={{color: "#fff"}}>Choose A Attribute</Title>
                                        </Body>
                                        <Right/>
                                    </Header>}
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down"/>}
                                selectedValue={key}
                                onValueChange={(itemValue, itemPosition) => this.setState({key: itemValue})}
                            >
                                <Picker.Item label="Choose One"/>
                                {
                                    attributes && attributes.map((attribute) => {
                                        return (<Picker.Item key={attribute.id} label={attribute.key}
                                                             value={attribute.key}/>)
                                    })
                                }
                            </Picker>
                            <Button small transparent rounded
                                    onPress={() => this.props.navigation.navigate('Attribute')}>
                                <Icon name="add" style={{color: '#ffbe26'}}/>
                            </Button>
                        </Item>
                        {/*<InputGroup>
                            <Input placeholder="Specification" onChangeText={(text) => this.setState({key: text})}
                                   value={key}/>
                        </InputGroup>*/}
                        {/*<InputGroup>
                            <Input placeholder="Value" onChangeText={(text) => this.setState({value: text})}
                                   value={value}/>
                        </InputGroup>*/}
                      <Item stackedLabel>
                        <Label>Value</Label>
                        <Input onChangeText={(text) => this.setState({value: text})} value={value}/>
                      </Item>
                    </Form>
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
    //console.log(state);
    return {
        activeProduct: state.products.activeProduct,
        attributes: state.attributes.attributeList,
        activeSpec: state.productSpecs.activeSpec,
        isLoading: state.productSpecs.isLoading,
        addSuccessStatus: state.productSpecs.addSuccessStatus,
        addErrorStatus: state.productSpecs.addErrorStatus,
        updateSuccessStatus: state.productSpecs.updateSuccessStatus,
        updateErrorStatus: state.productSpecs.updateErrorStatus,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getSpecList: getSpecList,
        addSpec: addSpec,
        updateSpec: updateSpec,
        getPreRequisiteData: getPreRequisiteSpecData
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ProductSpec);