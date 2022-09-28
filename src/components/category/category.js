import React, {Component} from 'react';
import {
    Container, Content, Header, Left, Right, Body, Title, Text, Button, Icon, Input, Item,
    Label, Form, Toast, Picker, Fab, Thumbnail, CardItem, Card
} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Image, SafeAreaView, StatusBar, Switch, View} from 'react-native';
import {useScreens} from 'react-native-screens';
import {addCategory, getCategoryList, categorySelected, updateCategory} from '../../actions/category';
import ImagePicker from "react-native-image-picker";
import {BASE_URL} from "../../constant";

let url = require('url');

useScreens();

class Category extends Component {
    constructor(props) {
        super(props);

        this.state = {
            action: props.activeCategory ? 'Edit' : 'New',
            id: props.activeCategory ? props.activeCategory.id : '',
            name: props.activeCategory ? props.activeCategory.name : '',
            description: props.activeCategory ? props.activeCategory.description : '',
            isActive: props.activeCategory ? props.activeCategory.is_active : false,
            hasParent: props.activeCategory ? props.activeCategory.has_parent : false,
            parent: props.activeCategory ? props.activeCategory.parent : null,
            categoryList: props.categoryList,
            image: null,
        };

        this.handleChooseImage = this.handleChooseImage.bind(this);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    addCategory() {
        const createCategoryData = () => {
            const {name, description, isActive, hasParent, parent, image} = this.state;
            const data = new FormData();
            data.append('name', name);
            data.append('description', description);
            data.append('is_active', isActive);
            data.append('has_parent', hasParent);
            if (parent) data.append('parent', parent);
            else data.append('parent', '');
            data.append('added_by', global.credential.user_id);
            if (image) {
                data.append('image', {
                    name: image.fileName,
                    type: image.type,
                    uri: Platform.OS === 'android' ? image.uri : image.uri.replace('file://', ''),
                });
            }
            return data;
        };
        this.props.addCategory(createCategoryData());
    }

    updateCategory() {
        const updateCategoryData = () => {
            const {name, description, isActive, hasParent, parent, image} = this.state;
            const data = new FormData();
            data.append('name', name);
            data.append('description', description);
            data.append('is_active', isActive);
            data.append('has_parent', hasParent);
            if (parent) data.append('parent', parent);
            else data.append('parent', '');
            data.append('updated_by', global.credential.user_id);
            if (image) {
                data.append('image', {
                    name: image.fileName,
                    type: image.type,
                    uri: Platform.OS === 'android' ? image.uri : image.uri.replace('file://', ''),
                });
            }
            return data;
        };
        this.props.updateCategory(updateCategoryData(), this.state.id);
    }

    handleChooseImage = () => {
        const options = {
            noData: true,
        };

        ImagePicker.launchImageLibrary(options, response => {
            //console.log(response);
            if (response.uri) {
                this.setState({image: response});
            }
        });
    };

    getAction() {
        if (this.state.action === 'Edit')
            return (
                <Button transparent onPress={() => this.updateCategory()}
                        disabled={this.props.isLoading || !this.state.name || (this.state.hasParent && !this.state.parent)}>
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
                <Button transparent onPress={() => this.addCategory()}
                        disabled={this.props.isLoading || !this.state.name || (this.state.hasParent && !this.state.parent)}>
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
                    props.getCategoryList();
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
        const {navigation, categoryList, activeCategory} = this.props;
        const {name, description, isActive, hasParent, parent, image} = this.state;
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
                        <Title>Category</Title>
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
                            <Item stackedLabel>
                                <Label>Description</Label>
                                <Input multiline={true} rowSpan={4}
                                       onChangeText={(text) => this.setState({description: text})}
                                       value={description}/>
                            </Item>
                            <Item style={{paddingTop: 20, paddingBottom: 5}}>
                                <Left>
                                    <Text>Is Active?</Text>
                                </Left>
                                <Body/>
                                <Right>
                                    <Switch trackColor={{
                                        true: '#ffbe26',
                                        false: '#d3d3d3',
                                        borderColor: '#ffbe26',
                                        thumbColor: '#ffbe26',
                                    }} onValueChange={() => {
                                        this.setState(prevState => ({isActive: !prevState.isActive}));
                                    }} value={isActive}/>
                                </Right>
                            </Item>
                            <Item style={{paddingTop: 20, paddingBottom: 5}}>
                                <Left>
                                    <Text>Has Parent?</Text>
                                </Left>
                                <Body/>
                                <Right>
                                    <Switch trackColor={{
                                        true: '#ffbe26',
                                        false: '#d3d3d3',
                                        borderColor: '#ffbe26',
                                        thumbColor: '#ffbe26',
                                    }} onValueChange={() => {
                                        this.setState(prevState => ({hasParent: !prevState.hasParent}));
                                    }} value={hasParent}/>
                                </Right>
                            </Item>
                            {
                                hasParent ?
                                    <Item>
                                        <Label style={{fontWeight: 'bold'}}>Parent Category</Label>
                                        <Picker
                                            renderHeader={backAction =>
                                                <Header style={{backgroundColor: '#ffbe26'}}>
                                                    <Left>
                                                        <Button transparent onPress={backAction}>
                                                            <Icon name="arrow-back" style={{color: '#fff'}}/>
                                                        </Button>
                                                    </Left>
                                                    <Body style={{flex: 3}}>
                                                        <Title style={{color: '#fff'}}>Choose A Parent Category</Title>
                                                    </Body>
                                                    <Right/>
                                                </Header>}
                                            mode="dropdown"
                                            iosIcon={<Icon name="arrow-down"/>}
                                            selectedValue={parent}
                                            onValueChange={(itemValue, itemPosition) => this.setState({parent: itemValue})}
                                        >
                                            <Picker.Item label="Choose One"/>
                                            {
                                                categoryList.length > 0 && categoryList.map((parent) => {
                                                    return (<Picker.Item key={parent.id} label={parent.name}
                                                                         value={parent.name}/>);
                                                })
                                            }
                                        </Picker>
                                    </Item>
                                    :
                                    <Text/>
                            }

                            <Card transparent>
                                <CardItem button onPress={() => this.handleChooseImage()}>
                                    <Left><Text>Choose Image:</Text></Left>
                                    <Body/>
                                    {
                                        !image && activeCategory && activeCategory.image ?
                                            <Right>
                                                <Image
                                                    source={{uri: BASE_URL + ((url.parse(activeCategory.image)).pathname)}}
                                                    style={{height: 100, width: 100,}}
                                                />
                                            </Right>
                                            :
                                            image && (
                                                <Right>
                                                    <Image source={{uri: image.uri}} style={{height: 100, width: 100,}}/>
                                                </Right>
                                            )
                                    }
                                </CardItem>
                            </Card>
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
        activeCategory: state.categories.activeCategory,
        categoryList: state.categories.categoryList || [],
        isLoading: state.categories.isLoading,
        addSuccessStatus: state.categories.addSuccessStatus,
        addErrorStatus: state.categories.addErrorStatus,
        updateSuccessStatus: state.categories.updateSuccessStatus,
        updateErrorStatus: state.categories.updateErrorStatus,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getCategoryList: getCategoryList,
        addCategory: addCategory,
        updateCategory: updateCategory,
        categorySelected: categorySelected,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Category);