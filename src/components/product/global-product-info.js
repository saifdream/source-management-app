import React, {Component, Fragment} from 'react';
import {
    Container,
    Content,
    Card,
    CardItem,
    Body,
    Text,
    Segment,
    Left,
    Button,
    Icon, Title, Right, Header, Badge, Tabs, Tab
} from 'native-base';
import {connect} from 'react-redux';
import {StatusBar, Image, Linking, Dimensions} from 'react-native';
import {BASE_URL} from '../../constant';

const url = require('url');

const device = Dimensions.get('window');

class GlobalProductInfo extends Component {

    constructor(props) {
        super(props);
        const {activeProduct} = props;
        this.state = {
            activePage: 1,
            shopList: activeProduct ? (activeProduct.source_products ? (activeProduct.source_products || null) : null) : null,
            id: activeProduct ? activeProduct.id : null,
            name: activeProduct ? activeProduct.title : null,
            sku: activeProduct ? activeProduct.sku : null,
            unit: activeProduct ? activeProduct.unit : null,
            origin: activeProduct ? activeProduct.origin : null,
            categories: activeProduct ? activeProduct.product_categories : [],
            model: activeProduct ? activeProduct.model : null,
            brand: activeProduct ? activeProduct.brand : null,
            price: activeProduct ? activeProduct.unit_price : null,
            isVerified: activeProduct ? activeProduct.is_verified : false,
            productAttributes: activeProduct ? activeProduct.product_attributes : null,
            productImages: activeProduct ? activeProduct.product_images : null,
        };
    }

    static getDerivedStateFromProps(props, state) {
        const {activeProduct} = props;
        return {
            shopList: activeProduct ? (activeProduct.source_products ? (activeProduct.source_products || null) : null) : null,
            id: activeProduct ? activeProduct.id : null,
            name: activeProduct ? activeProduct.title : null,
            sku: activeProduct ? activeProduct.sku : null,
            unit: activeProduct ? activeProduct.unit : null,
            origin: activeProduct ? activeProduct.origin : null,
            categories: activeProduct ? activeProduct.product_categories : [],
            model: activeProduct ? activeProduct.model : null,
            brand: activeProduct ? activeProduct.brand : null,
            price: activeProduct ? activeProduct.unit_price : null,
            isVerified: activeProduct ? activeProduct.is_verified : false,
            productAttributes: activeProduct ? activeProduct.product_attributes : null,
            productImages: activeProduct ? activeProduct.product_images : null,
        };
    }

    getSpecView() {
        const {productAttributes} = this.state;
        if (productAttributes && productAttributes.length > 0)
            return (
                productAttributes.map((spec) => {
                    return (
                        <CardItem bordered key={spec.id}>
                            <Body>
                                <Text>{spec.key}: {spec.value}</Text>
                            </Body>
                        </CardItem>
                    );
                })
            );
        return (
            <CardItem style={{justifyContent: 'center', alignItems: 'center',}}>
                <Text style={{textAlign: 'center'}}>No specifications found</Text>
            </CardItem>
        );
    }

    getImageView() {
        const {productImages} = this.state;
        if (productImages && productImages.length > 0)
            return (
                productImages.map((image, index) => {
                    return (
                        <CardItem bordered cardBody key={image.id}>
                            <Image source={{uri: BASE_URL + ((url.parse(image.image)).pathname)}} resizeMode="cover"
                                   style={{height: 400, width: null, flex: 1,}}/>
                        </CardItem>
                    );
                })
            );
        return (
            <CardItem style={{justifyContent: 'center', alignItems: 'center',}}>
                <Text>No image found</Text>
            </CardItem>
        );
    }

    getCategories() {
        const {categories} = this.state;
        return categories.map((item) => {
            return <Text>{item.category}, </Text>
        })
    }

    getProductView() {
        const {name, categories, sku, model, unit, brand, origin, price, isVerified} = this.state;
        return (
            <Card transparent>
                <CardItem header bordered>
                    <Text>Product Information</Text>
                </CardItem>
                <CardItem bordered>
                    <Body><Text>Name: {name}</Text></Body>
                </CardItem>
                <CardItem bordered>
                    <Body>
                        <Text>Categories: { categories.length > 0 && this.getCategories() }</Text>
                    </Body>
                </CardItem>
                <CardItem bordered>
                    <Body><Text>SKU: {sku}</Text></Body>
                </CardItem>
                <CardItem bordered>
                    <Body><Text>Model: {model}</Text></Body>
                </CardItem>
                <CardItem bordered>
                    <Body><Text>Unit: {unit}</Text></Body>
                </CardItem>
                <CardItem bordered>
                    <Body><Text>Brand: {brand}</Text></Body>
                </CardItem>
                <CardItem bordered>
                    <Body><Text>Origin: {origin}</Text></Body>
                </CardItem>
                <CardItem bordered>
                    <Body><Text>Price: {price}</Text></Body>
                </CardItem>
                <CardItem bordered>
                    <Text>Is Verified?:</Text>
                    <Right>
                        {
                            isVerified ?
                                <Badge success><Text style={{fontSize: 12}}>Verified</Text></Badge>
                                :
                                <Badge danger><Text style={{fontSize: 12}}>Not Verified</Text></Badge>
                        }
                    </Right>
                </CardItem>
                <CardItem header bordered><Text>Specification</Text></CardItem>
                {this.getSpecView()}
                <CardItem header bordered><Text>Image</Text></CardItem>
                {this.getImageView()}
            </Card>
        );
    }

    getShopView() {
        const {shopList} = this.state;
        if (shopList && shopList.length > 0)
            return shopList.map((shop, index) => {
                const shopDetails = shop.shop;
                return (
                    <Card key={shopDetails.id} transparent>
                        {/* Source Product Info */}
                        <CardItem header bordered>
                            <Text>{index + 1}. Source Product</Text>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Text>Local Name: {shop.local_name}</Text>
                            </Body>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Text>Source Price: {shop.source_price}</Text>
                            </Body>
                        </CardItem>
                        <CardItem bordered>
                            <Text>Is Verified?:</Text>
                            <Right>
                                {
                                    shop.is_verified ?
                                        <Badge success><Text style={{fontSize: 12}}>Verified</Text></Badge>
                                        :
                                        <Badge danger><Text style={{fontSize: 12}}>Not Verified</Text></Badge>
                                }
                            </Right>
                        </CardItem>

                        {/* Shop Info */}
                        <CardItem header bordered>
                            <Text>Shop</Text>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Text>Shop Name: {shopDetails.name}</Text>
                            </Body>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Text>Address: {shopDetails.address}</Text>
                            </Body>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Text>Contact: {shopDetails.contact}</Text>
                            </Body>
                            <Right>
                                <Button small warning rounded bordered onPress={() => this.call(shopDetails.contact)}>
                                    <Icon name='call'/>
                                </Button>
                            </Right>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Text>Email: {shopDetails.email}</Text>
                            </Body>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Text>Web: {shopDetails.web}</Text>
                            </Body>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Text>Area: {shopDetails.area}</Text>
                            </Body>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Text>Country: {shopDetails.country}</Text>
                            </Body>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Text>Latitude: {shopDetails.lat}</Text>
                            </Body>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Text>Longitude: {shopDetails.lng}</Text>
                            </Body>
                        </CardItem>

                        {/* Contact Person */}
                        <CardItem header bordered>
                            <Text>Contact Persons</Text>
                        </CardItem>
                        {
                            shopDetails && shopDetails.hasOwnProperty('shop_contact_person') && shopDetails['shop_contact_person'].map((person, index) => {
                                return (
                                    <Fragment key={index}>
                                        <CardItem>
                                            <Body>
                                                <Text>{index + 1}. Name: {person.name}</Text>
                                                <Text note>{person.designation}</Text>
                                                <Text note>{person.email}</Text>
                                                <Text note>{person.contact}</Text>
                                            </Body>
                                            <Right>
                                                <Button small warning rounded bordered
                                                        onPress={() => this.call(person.contact)}>
                                                    <Icon name='call'/>
                                                </Button>
                                            </Right>
                                        </CardItem>
                                        <CardItem cardBody>
                                            <Image
                                                source={{uri: person.image ? BASE_URL + ((url.parse(person.image)).pathname) : ''}}
                                                resizeMode="cover"
                                                style={{
                                                    height: 400,
                                                    width: null,
                                                    flex: 1,
                                                    flexDirection: 'row',
                                                    flexWrap: 'wrap',
                                                }}/>
                                        </CardItem>
                                    </Fragment>
                                );
                            })
                        }

                        {/* Shop Image */}
                        <CardItem header bordered>
                            <Text>Shop Images</Text>
                        </CardItem>
                        {
                            shopDetails && shopDetails.hasOwnProperty('shop_images') && shopDetails['shop_images'].map((image, index) => {
                                return (
                                    <CardItem bordered cardBody key={image.id}>
                                        <Image source={{uri: BASE_URL + ((url.parse(image.image)).pathname)}}
                                               resizeMode="cover"
                                               style={{height: 400, width: null, flex: 1,}}/>
                                    </CardItem>
                                );
                            })
                        }
                    </Card>
                );
            });
        else return (
            <CardItem style={{justifyContent: 'center', alignItems: 'center',}}>
                <Text>No shop found</Text>
            </CardItem>
        );
    }

    call(contact) {
        Linking.openURL(`tel:${contact}`);
    }

    /*getContactPersonView() {
        const {shopList} = this.state;
        if (shopList && shopList.length > 0)
            return shopList.map(shop => {
                if(shop.hasOwnProperty('shop_contact_person')) {
                    console.log(shop)
                    const contactPerson = shop['shop_contact_person'];
                    return (
                        contactPerson.map((person, index) => {
                            return (
                                <Card key={index}>
                                    <CardItem>
                                        <Body>
                                            <Text>Name: {person.name}</Text>
                                            <Text note>{person.designation}</Text>
                                            <Text note>{person.email}</Text>
                                            <Text note>{person.contact}</Text>
                                        </Body>
                                        <Right>
                                            <Button small warning rounded bordered onPress={() => this.call(person.contact)}>
                                                <Icon name='call'/>
                                            </Button>
                                        </Right>
                                    </CardItem>
                                    <CardItem cardBody>
                                        <Image
                                            source={{uri: person.image ? BASE_URL + ((url.parse(person.image)).pathname) : ''}}
                                            resizeMode="cover"
                                            style={{
                                                height: 400,
                                                width: null,
                                                flex: 1,
                                                flexDirection: 'row',
                                                flexWrap: 'wrap',
                                            }}/>
                                    </CardItem>
                                </Card>
                            );
                        })
                    );
                } else return (
                    <CardItem style={{justifyContent: 'center', alignItems: 'center',}}>
                        <Text>No contact person found</Text>
                    </CardItem>
                );
            });
        else return (
            <CardItem style={{justifyContent: 'center', alignItems: 'center',}}>
                <Text>No contact person found</Text>
            </CardItem>
        );
    }*/

    /*getShopImageView() {
        const {shopList} = this.state;
        if (shopList && shopList.length > 0)
            return shopList.map(shop => {
                if(shop.hasOwnProperty('shop_images')) {
                    console.log(shop)
                    const shopImages = shop['shop_images'];
                    return (
                        shopImages.map((image, index) => {
                            return (
                                <CardItem bordered cardBody key={image.id}>
                                    <Image source={{uri: BASE_URL + ((url.parse(image.image)).pathname)}} resizeMode="cover"
                                           style={{height: 400, width: null, flex: 1,}}/>
                                </CardItem>
                            );
                        })
                    );
                } else return (
                    <CardItem style={{justifyContent: 'center', alignItems: 'center',}}>
                        <Text>No image found</Text>
                    </CardItem>
                );
            });
        else return (
            <CardItem style={{justifyContent: 'center', alignItems: 'center',}}>
                <Text>No image found</Text>
            </CardItem>
        );
    }*/

    selectComponent = (activePage) => () => this.setState({activePage});

    _renderComponent = () => {
        if (this.state.activePage === 1)
            return this.getProductView();
        else if (this.state.activePage === 2)
            return this.getShopView();
        /*else if (this.state.activePage === 3)
            return (
                this.getContactPersonView()
            );
        else if (this.state.activePage === 4)
            return this.getShopImageView();*/
        else
            return this.getProductView();
    };

    render() {
        const {name} = this.state;
        return (
            <Container>
                <Header hasSegment style={{backgroundColor: '#ffbe26', barStyle: 'light-content'}}>
                    <StatusBar
                        backgroundColor="#ffbe26"
                        barStyle="light-content"/>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body><Title>{name}</Title></Body>
                    <Right/>
                </Header>
                <Segment style={{backgroundColor: '#ffbe26', color: '#fff'}}>
                    <Button warning first active={this.state.activePage === 1} onPress={this.selectComponent(1)}><Text
                        style={{color: this.state.activePage === 1 ? '#000' : '#fff'}}>Product</Text></Button>
                    <Button warning last active={this.state.activePage === 2} onPress={this.selectComponent(2)}><Text
                        style={{color: this.state.activePage === 2 ? '#000' : '#fff'}}>Source</Text></Button>
                    {/*<Button warning active={this.state.activePage === 3} onPress={this.selectComponent(3)}><Text
                        style={{color: this.state.activePage === 3 ? '#000' : '#fff'}}>Contact</Text></Button>
                    <Button warning last active={this.state.activePage === 4} onPress={this.selectComponent(4)}><Text
                        style={{color: this.state.activePage === 4 ? '#000' : '#fff'}}>Shop Image</Text></Button>*/}
                </Segment>
                <Content padder>
                    {this._renderComponent()}

                    {/*<Tabs tabBarPosition="overlayBottom">
                        <Tab heading="Shop">
                            <Text>Tab 1</Text>
                        </Tab>
                        <Tab heading="Contact">
                            <Text>Tab 2</Text>
                        </Tab>
                        <Tab heading="Image">
                            <Text>Tab 3</Text>
                        </Tab>
                    </Tabs>*/}
                </Content>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        activeProduct: state.products.activeProduct,
        //shopDetails: state.sourceProducts.shopDetails,
        isLoading: state.products.isLoading,
    };
}

export default connect(mapStateToProps)(GlobalProductInfo);