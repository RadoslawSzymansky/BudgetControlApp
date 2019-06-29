import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers/index';

const middleware = [thunk];
const initialState = {};
if (process.env.NODE_ENV === 'production') { 

}



const store = createStore(reducer, initialState, compose(
  applyMiddleware(...middleware),
  process.env.NODE_ENV  === 'production' 
    ? 
    null : 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;

