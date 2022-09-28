import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import ShopList from './shop/shop-list';
import Shop from './shop/shop';
import ShopImageList from './shop/images/image-list';
import ShopImage from './shop/images/images';
import ContactPersonList from './shop/contact-person/person-list';
import ContactPerson from './shop/contact-person/person';
import UnitList from './product/unit/unit-list';
import Unit from './product/unit/unit';
import BrandList from './product/brand/brand-list';
import Brand from './product/brand/brand';
import AttributeList from './attribute/attribute-list';
import Attribute from './attribute/attribute';
import CategoryList from './category/category-list';
import Category from './category/category';
import StateList from './shop/state/state-list';
import State from './shop/state/state';
import ShopTabs from './shop/shop-tabs';
import ShopInfo from './shop/shop-info';
import GlobalSourceProductList from './shop/source-product/global-source-product-list';
import GlobalSourceProductInfo from './shop/source-product/global-source-product-info';
import GlobalProductInfo from './product/global-product-info';
import GlobalProductList from './product/global-product-list';
import ProductList from './product/product-list';
import SourceProductList from './shop/source-product/source-product-list';
import Product from './product/product';
import SourceProduct from './shop/source-product/source-product';
import SourceProductTabs from './shop/source-product/source-product-tabs';
import ProductTabs from './product/product-tabs';
import SourceProductInfo from './shop/source-product/source-product-info';
import ProductImageList from './product/images/image-list';
import ProductImage from './product/images/images';
import ProductCategoryList from './product/categories/category-list';
import ProductCategory from './product/categories/category';
import ProductSpecList from './product/spec/spec-list';
import ProductSpec from './product/spec/spec';

export const AppStackNavigator = createStackNavigator(
    {
        /* Category Start */
        CategoryList: {screen: CategoryList, navigationOptions: {header: null}},
        Category: {screen: Category, navigationOptions: {header: null}},
        /* Category End */

        /* Attribute Start */
        AttributeList: {screen: AttributeList, navigationOptions: {header: null}},
        Attribute: {screen: Attribute, navigationOptions: {header: null}},
        /* Attribute End */

        /* Shop Start */
        StateList: {screen: StateList, navigationOptions: {header: null}},
        State: {screen: State, navigationOptions: {header: null}},
        ShopList: {screen: ShopList, navigationOptions: {header: null}},
        Shop: {screen: Shop, navigationOptions: {header: null}},
        ShopInfo: {screen: ShopInfo, navigationOptions: {header: null}},
        ShopImageList: {screen: ShopImageList, navigationOptions: {header: null}},
        ShopImage: {screen: ShopImage, navigationOptions: {header: null}},
        ContactPersonList: {screen: ContactPersonList, navigationOptions: {header: null}},
        ContactPerson: {screen: ContactPerson, navigationOptions: {header: null}},
        ShopTabs: {screen: ShopTabs, navigationOptions: {header: null}},
        /* Shop End */

        /* Source Product Start */
        GlobalSourceProductList: {screen: GlobalSourceProductList, navigationOptions: {header: null}},
        GlobalSourceProductInfo: {screen: GlobalSourceProductInfo, navigationOptions: {header: null}},
        SourceProductList: {screen: SourceProductList, navigationOptions: {header: null}},
        SourceProduct: {screen: SourceProduct, navigationOptions: {header: null}},
        SourceProductInfo: {screen: SourceProductInfo, navigationOptions: {header: null}},
        SourceProductTabs: {screen: SourceProductTabs, navigationOptions: {header: null}},
        /* Source Product End */

        /* Product Start */
        Unit: {screen: Unit, navigationOptions: {header: null}},
        UnitList: {screen: UnitList, navigationOptions: {header: null}},
        BrandList: {screen: BrandList, navigationOptions: {header: null}},
        Brand: {screen: Brand, navigationOptions: {header: null}},
        Product: {screen: Product, navigationOptions: {header: null}},
        GlobalProductInfo: {screen: GlobalProductInfo, navigationOptions: {header: null}},
        GlobalProductList: {screen: GlobalProductList, navigationOptions: {header: null}},
        ProductList: {screen: ProductList, navigationOptions: {header: null}},
        ProductImageList: {screen: ProductImageList, navigationOptions: {header: null}},
        ProductImage: {screen: ProductImage, navigationOptions: {header: null}},
        ProductCategoryList: {screen: ProductCategoryList, navigationOptions: {header: null}},
        ProductCategory: {screen: ProductCategory, navigationOptions: {header: null}},
        ProductSpecList: {screen: ProductSpecList, navigationOptions: {header: null}},
        ProductSpec: {screen: ProductSpec, navigationOptions: {header: null}},
        ProductTabs: {screen: ProductTabs, navigationOptions: {header: null}},
        /* Product End */
    }, {
        initialRouteName: 'GlobalProductList',
    },
);