import {combineReducers} from 'redux';

import UserReducer from './user-reducer';
import CategoryReducer from "./category-reducer";
import AttributeReducer from "./attribute-reducer";
import UnitReducer from './product/unit-reducer';
import BrandReducer from './product/brand-reducer';
import ImageReducer from './shop/image-reducer';
import ProductReducer from "./product/product-reducer";
import ProductImageReducer from './product/image-reducer';
import ProductSpecReducer from './product/spec-reducer';
import ShopReducer from './shop/shop-reducer';
import StateReducer from './shop/state-reducer';
import SourceProductReducer from './shop/source-product/source-product-reducer';
import PersonReducer from './shop/source-product/person-reducer';
import ProductCategoryReducer from "./product/category-reducer";

const rootReducer = combineReducers({
    user: UserReducer,
    categories: CategoryReducer,
    attributes: AttributeReducer,
    shops: ShopReducer,
    shopImages: ImageReducer,
    shopPersons: PersonReducer,
    products: ProductReducer,
    sourceProducts: SourceProductReducer,
    productImages: ProductImageReducer,
    productSpecs: ProductSpecReducer,
    productCategory: ProductCategoryReducer,
    units: UnitReducer,
    brands: BrandReducer,
    states: StateReducer,
});

export default rootReducer;