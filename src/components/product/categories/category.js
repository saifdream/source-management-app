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
import {addProductCategory, getProductCategoryList, updateProductCategory, getPreRequisiteProductCategoryData} from '../../../actions/product/category';

class ProductCategory extends Component {
    state = {
        action: this.props.activeProductCategory ? 'Edit' : 'New',
        product: this.props.activeProduct.id || null,
        id: this.props.activeProductCategory ? this.props.activeProductCategory.id : null,
        category: this.props.activeProductCategory ? this.props.activeProductCategory.category : null,
    };

    addProductCategory() {
        const {product, category} = this.state;
        const categoryData = {
            product: product,
            category: category,
        };
        this.props.addProductCategory(categoryData);
    }

    updateProductCategory() {
        const {product, category} = this.state;
        const categoryData = {
            product: product,
            category: category,
        };
        this.props.updateProductCategory(categoryData, this.state.id);
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
                    props.getProductCategoryList(props.activeProduct.id);
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
        const {action, category, value} = this.state;
        if (action === 'Edit')
            return (
                <Button transparent onPress={() => this.updateProductCategory()}
                        disabled={isLoading || !category || !value}>
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
                <Button transparent onPress={() => this.addProductCategory()}
                        disabled={isLoading || !category || !value}>
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
        const {navigation, categories} = this.props;
        const {category} = this.state;

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
                        <Title>Product Category</Title>
                    </Body>
                    <Right>
                        {this.getAction()}
                    </Right>
                </Header>
                <Content padder>
                    <Form style={styles.form}>
                        <Item>
                            <Label>Category</Label>
                            <Picker
                                renderHeader={backAction =>
                                    <Header style={{backgroundColor: "#ffbe26"}}>
                                        <Left>
                                            <Button transparent onPress={backAction}>
                                                <Icon name="arrow-back" style={{color: "#fff"}}/>
                                            </Button>
                                        </Left>
                                        <Body style={{flex: 3}}>
                                            <Title style={{color: "#fff"}}>Choose A Category</Title>
                                        </Body>
                                        <Right/>
                                    </Header>}
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down"/>}
                                selectedValue={category}
                                onValueChange={(itemValue, itemPosition) => this.setState({category: itemValue})}
                            >
                                <Picker.Item label="Choose One"/>
                                {
                                    categories && categories.map((category) => {
                                        return (<Picker.Item key={category.id} label={category.name}
                                                             value={category.name}/>)
                                    })
                                }
                            </Picker>
                            <Button small transparent rounded
                                    onPress={() => this.props.navigation.navigate('Category')}>
                                <Icon name="add" style={{color: '#ffbe26'}}/>
                            </Button>
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
        categories: state.categories.categoryList,
        activeProductCategory: state.categories.activeProductCategory,
        isLoading: state.categories.isLoading,
        addSuccessStatus: state.categories.addSuccessStatus,
        addErrorStatus: state.categories.addErrorStatus,
        updateSuccessStatus: state.categories.updateSuccessStatus,
        updateErrorStatus: state.categories.updateErrorStatus,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getProductCategoryList: getProductCategoryList,
        addProductCategory: addProductCategory,
        updateProductCategory: updateProductCategory,
        getPreRequisiteData: getPreRequisiteProductCategoryData
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ProductCategory);