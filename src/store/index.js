import { createStore, applyMiddleware, compose } from 'redux';

// middlewares
import thunkMiddleware from 'redux-thunk';

// Import custom components
import rootReducer from '../reducers';
import AsyncStorage from '@react-native-community/async-storage';


function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state);
        AsyncStorage.setItem('state', serializedState)
    } catch (e) {
        console.log(e);
    }
}

function loadFromLocalStorage() {
    try {
        const serializedState = AsyncStorage.getItem('state');
        console.log(serializedState)
        if (serializedState === null) return undefined;
        return serializedState
    } catch (e) {
        console.log(e)
        return undefined
    }
}

// const persistedState = loadFromLocalStorage();

function logger({ getState }) {
    return next => action => {
        console.log('will dispatch', action)

        // Call the next dispatch method in the middleware chain.
        const returnValue = next(action)

        console.log('state after dispatch', getState())

        // This will likely be the action itself, unless
        // a middleware further in chain changed it.
        return returnValue
    }
}

/**
 * Create a Redux store that holds the app state.
 */
/*const store = createStore(rootReducer, persistedState, compose(
    applyMiddleware(thunkMiddleware),
    applyMiddleware(logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : function (f) {
        return f;
    }
));*/

/*const unsubscribe = store.subscribe(() => {
    const state = store.getState();
    saveToLocalStorage(state);
});*/

const store = createStore(rootReducer, compose(
  applyMiddleware(thunkMiddleware),
  //applyMiddleware(logger),
));

export default store;