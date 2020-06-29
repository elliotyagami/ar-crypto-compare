import { createStore, combineReducers } from 'redux';
import { initialState } from './initialState';
import changeCurrency from '../reducers';
import console from '../reducers/console';
import arweave from '../reducers/arweave';

const reducer = combineReducers({
  conversion: changeCurrency,
  console,
  arweave,
});

let store = createStore(reducer, initialState);

export default store;
