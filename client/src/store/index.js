import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers/index';

const middleware = [thunk];
const initialState = {};
if (process.env.NODE_ENV === 'production') { 
  
}

function chooseStore() {
  if (process.env.NODE_ENV === 'production') {
     return createStore(reducer, initialState, compose(
      applyMiddleware(...middleware),
    ));
  } else {
    return createStore(reducer, initialState, compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));
  };
};

const store = chooseStore();

export default store;

