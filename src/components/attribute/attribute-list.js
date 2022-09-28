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
    Input, Col, Grid, Toast,
} from 'native-base';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {useScreens} from 'react-native-screens';
import {
    getPaginatedAttributeList,
    getAttributeList,
    handleAttributeSearch,
    attributeSelected
} from '../../actions/attribute';
import {BASE_URL} from "../../constant";

const url = require('url');

useScreens();

class AttributeList extends Component {
    state = {
        attributeList: [],
        modalVisible: false,
    };

    constructor(props) {
        super(props);
        this.props.getAttributeList();
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

    handleAttributeSearch(text) {
        clearTimeout(this.timeout);
        if (text) {
            this.timeout = setTimeout(() => {
                this.props.handleAttributeSearch(text);
            }, 1000);
        } else this.props.getAttributeList();
    }

    render() {
        const {attributeList, navigation, attributeSelected} = this.props;
        return (
            <Container>
                <Header searchBar rounded style={{backgroundColor: '#ffbe26', barStyle: 'light-content'}}>
                    <StatusBar backgroundColor="#ffbe26" barStyle="light-content"/>
                    <Item>
                        <Icon name="md-menu" onPress={() => navigation.openDrawer()}/>
                        <Input placeholder="Search Attribute"
                               onChangeText={(text) => this.handleAttributeSearch(text)}/>
                        {/*<Icon name="ios-search"/>*/}
                    </Item>
                </Header>
                <ScrollView
                    refreshControl={
                        <RefreshControl colors={['#ffbe26']} progressBackgroundColor="#fff"
                                        refreshing={this.props.isLoading}
                                        onRefresh={() => this.props.getAttributeList()}/>
                    }
                >
                    {
                        attributeList.length === 0 ?
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
                                                Loading Attribute List, Please wait
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
                                        dataArray={attributeList}
                                        renderRow={(attribute) =>
                                            <ListItem
                                                key={attribute.key}
                                                keyExtractor={(attribute, index) => index.toString()}
                                            >
                                                <Body>
                                                    <Text>{attribute.key}</Text>
                                                </Body>
                                                <Right>
                                                    <Button transparent onPress={() => {
                                                        attributeSelected(attribute);
                                                        navigation.push('Attribute');
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
                                                            this.props.getPaginatedAttributeList(BASE_URL + ((url.parse(this.props.previous)).pathname) + ((url.parse(this.props.previous)).search));
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
                                                            this.props.getPaginatedAttributeList(BASE_URL + ((url.parse(this.props.next)).pathname) + ((url.parse(this.props.next)).search));
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
                        navigation.push('Attribute');
                        attributeSelected(null);
                    }}>
                    <Icon name="add"/>
                </Fab>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        attributeList: state.attributes.attributeList || [],
        isLoading: state.attributes.isLoading,
        next: state.attributes.next,
        previous: state.attributes.previous,
        listErrorStatus: state.attributes.listErrorStatus,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getAttributeList: getAttributeList,
        getPaginatedAttributeList: getPaginatedAttributeList,
        attributeSelected: attributeSelected,
        handleAttributeSearch: handleAttributeSearch,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AttributeList);