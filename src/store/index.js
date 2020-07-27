import { createStore, combineReducers } from 'redux';
import { initialState } from './initialState';
import changeCurrency from '../reducers';
import console from '../reducers/console';
import arweave from '../reducers/arweave';
import web3 from '../reducers/web3';

const reducer = combineReducers({
  conversion: changeCurrency,
  console,
  arweave,
  web3,
});

let store = createStore(reducer, initialState);

export default store;
