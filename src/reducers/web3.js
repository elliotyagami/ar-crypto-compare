import { initialState } from '../store/initialState';

export default (state = initialState.web3, action) => {
  switch (action.type) {
    case 'InitWeb3':
      return action.instance;
    default:
      return state;
  }
};
