import React, {Component} from 'react';
import {SafeAreaView, StatusBar, RefreshControl, ScrollView} from 'react-native';
import {
    Body,
    Button,
    Container,
    Content,
    Header,
    Icon,
    Fab,
    Left,
    List,
    ListItem,
    Right,
    Spinner,
    Text,
    Item,
    Input, Col, Grid, Toast, Thumbnail,
} from 'native-base';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {useScreens} from 'react-native-screens';
import {
    getPaginatedCategoryList,
    getCategoryList,
    handleCategorySearch,
    categorySelected
} from '../../actions/category';
import {BASE_URL} from "../../constant";

const url = require('url');

useScreens();

class CategoryList extends Component {
    //_didFocusSubscription;
    //_willBlurSubscription;

    state = {
        categoryList: [],
        modalVisible: false,
    };

    constructor(props) {
        super(props);
        this.props.getCategoryList();

        /*this._didFocusSubscription = props.navigation.addListener('didFocus', payload => {
          this.props.getCategoryList();
        });*/
    }

    componentDidMount() {
        //this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload => {},);
    }

    static getDerivedStateFromProps(props, state) {
        //console.log(props)
        if (props.listErrorStatus)
            Toast.show({
                text: props.listErrorStatus.message || props.listErrorStatus,
                position: 'bottom',
                type: 'danger',
                duration: 3000,
            });
        return {};
    }

    componentWillUnmount() {
        //this._didFocusSubscription && this._didFocusSubscription.remove();
        //this._willBlurSubscription && this._willBlurSubscription.remove();
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
        const {categoryList, navigation, categorySelected} = this.props;
        return (
            <Container>
                <Header searchBar rounded style={{backgroundColor: '#ffbe26', barStyle: 'light-content'}}>
                    <StatusBar backgroundColor="#ffbe26" barStyle="light-content"/>
                    <Item>
                        <Icon name="md-menu" onPress={() => navigation.openDrawer()}/>
                        <Input placeholder="Search Category"
                               onChangeText={(text) => this.handleCategorySearch(text)}/>
                        {/*<Icon name="ios-search"/>*/}
                    </Item>
                </Header>
                <ScrollView
                    refreshControl={
                        <RefreshControl colors={['#ffbe26']} progressBackgroundColor="#fff"
                                        refreshing={this.props.isLoading}
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
                                    this.props.isLoading ?
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
                                                key={category.id.toString()}
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
                                                        categorySelected(category);
                                                        navigation.push('Category');
                                                    }}>
                                                        <Icon name='create' style={{color: '#ffbe26'}}/>
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
                                                            this.props.getPaginatedList(BASE_URL + ((url.parse(this.props.previous)).pathname) + ((url.parse(this.props.previous)).search));
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
                                                            this.props.getPaginatedList(BASE_URL + ((url.parse(this.props.next)).pathname) + ((url.parse(this.props.next)).search));
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
                <Fab
                    containerStyle={{fontSize: 8}}
                    style={{backgroundColor: '#ffbe26'}}
                    position="bottomRight"
                    onPress={() => {
                        navigation.push('Category');
                        categorySelected(null);
                    }}>
                    <Icon name="add"/>
                </Fab>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        categoryList: state.categories.categoryList || [],
        isLoading: state.categories.isLoading,
        next: state.categories.next,
        previous: state.categories.previous,
        listErrorStatus: state.categories.listErrorStatus,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getCategoryList: getCategoryList,
        getPaginatedList: getPaginatedCategoryList,
        categorySelected: categorySelected,
        handleCategorySearch: handleCategorySearch,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(CategoryList);