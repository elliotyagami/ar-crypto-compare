export const initialState = {
  conversion: {
    from: 'AR',
    to: 'USDT',
    fromCurrency: [
      'AR',
      'BTC',
      'ETC',
      'XRP',
      'DOGE',
      'STR',
      'BCH',
      'MAID',
      'DASH',
      'BCN',
      'XEM',
    ],
    toCurrency: ['USDT', 'BTC', 'ETH', 'AR'],
  },
  console: [
    // {from: 'BTC', to: 'USDT', label: '24HOUR', value: '12345'},
    // {from: 'BTC', to: 'USDT', value: 'a->123'}
  ],
  arweave: {
    txData: {},
  },
};
