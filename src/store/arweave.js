import { initialState } from '../store/initialState';

export default (state = initialState.Arweave, action) => {
  switch (action.type) {
    case 'SetTxData':
      return Object.assign({}, state, {
        txData: action.data,
      });
    default:
      return state;
  }
};
