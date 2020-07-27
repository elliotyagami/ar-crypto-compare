import BigNumber from 'bignumber.js';
export let contract_details = {
  'EUR/USD': {
    addr: '0x25fa978ea1a7dc9bdc33a2959b9053eae57169b5',
    decimal: 8,
    name: 'EUR/USD',
  },
  'AUD/USD': {
    addr: '0x05cf62c4ba0ccea3da680f9a8744ac51116d6231',
    decimal: 8,
    name: 'AUD/USD',
  },
  'ETH/USD': {
    addr: '0xF79D6aFBb6dA890132F9D7c355e3015f15F3406F',
    decimal: 8,
    name: 'ETH/USD',
  },
  'BTC/USD': {
    addr: '0xF5fff180082d6017036B771bA883025c654BC935',
    decimal: 8,
    name: 'BTC/USD',
  },
  'DAI/USD': {
    addr: '0xa7D38FBD325a6467894A13EeFD977aFE558bC1f0',
    decimal: 8,
    name: 'DAI/USD',
  },
  'CHF/USD': {
    addr: '0x02D5c618DBC591544b19d0bf13543c0728A3c4Ec',
    decimal: 8,
    name: 'CHF/USD',
  },
  'GBP/USD': {
    addr: '0x151445852B0cfDf6A4CC81440F2AF99176e8AD08',
    decimal: 8,
    name: 'GBP/USD',
  },
  'JPY/USD': {
    addr: '0xe1407BfAa6B5965BAd1C9f38316A3b655A09d8A6',
    decimal: 8,
    name: 'JPY/USD',
  },
  'XAG/USD': {
    addr: '0x8946A183BFaFA95BEcf57c5e08fE5B7654d2807B',
    decimal: 8,
    name: 'XAG/USD',
  },
  'XAU/USD': {
    addr: '0xafcE0c7b7fE3425aDb3871eAe5c0EC6d93E01935',
    decimal: 8,
    name: 'XAU/USD',
  },
  'LINK/USD': {
    addr: '0x32dbd3214aC75223e27e575C53944307914F7a90',
    decimal: 8,
    name: 'LINK/USD',
  },
  'XHV/USD': {
    addr: '0xB836ADc21C241b096A98Dd677eD25a6E3EFA8e94',
    decimal: 8,
    name: 'XHV/USD',
  },
  'FTSE/GBP': {
    addr: '0x16924ae9C2ac6cdbC9D6bB16FAfCD38BeD560936',
    decimal: 8,
    name: 'FTSE/GBP',
  },
  'N225/JPY': {
    addr: '0x3f6E09A4EC3811765F5b2ad15c0279910dbb2c04',
    decimal: 8,
    name: 'N225/JPY',
  },
  'BNT/USD': {
    addr: '0x560B06e8897A0E52DbD5723271886BbCC5C1f52a',
    decimal: 8,
    name: 'BNT/USD',
  },
  'OXT/USD': {
    addr: '0x11eF34572CcaB4c85f0BAf03c36a14e0A9C8C7eA',
    decimal: 8,
    name: 'OXT/USD',
  },
  /////
  'TUSD/ETH': {
    addr: '0x73ead35fd6A572EF763B13Be65a9db96f7643577',
    decimal: 18,
    name: 'TUSD/ETH',
  },
  /////
  'LRC/ETH': {
    addr: '0x8770Afe90c52Fd117f29192866DE705F63e59407',
    decimal: 18,
    name: 'LRC/ETH',
  },
  'LEND/ETH': {
    addr: '0x1EeaF25f2ECbcAf204ECADc8Db7B0db9DA845327',
    decimal: 18,
    name: 'LEND/ETH',
  },
  'BTC/ETH': {
    addr: '0x0133Aa47B6197D0BA090Bf2CD96626Eb71fFd13c',
    decimal: 18,
    name: 'BTC/ETH',
  },
  'MKR/ETH': {
    addr: '0xDa3d675d50fF6C555973C4f0424964e1F6A4e7D3',
    decimal: 18,
    name: 'MKR/ETH',
  },
  'MANA/ETH': {
    addr: '0xc89c4ed8f52Bb17314022f6c0dCB26210C905C97',
    decimal: 18,
    name: 'MANA/ETH',
  },
  'KNC/ETH': {
    addr: '0xd0e785973390fF8E77a83961efDb4F271E6B8152',
    decimal: 18,
    name: 'KNC/ETH',
  },
  'LINK/ETH': {
    addr: '0xeCfA53A8bdA4F0c4dd39c55CC8deF3757aCFDD07',
    decimal: 18,
    name: 'LINK/ETH',
  },
  'USDC/ETH': {
    addr: '0xdE54467873c3BCAA76421061036053e371721708',
    decimal: 18,
    name: 'USDC/ETH',
  },
  'REP/ETH': {
    addr: '0xb8b513d9cf440C1b6f5C7142120d611C94fC220c',
    decimal: 18,
    name: 'REP/ETH',
  },
  'ZRX/ETH': {
    addr: '0xA0F9D94f060836756FFC84Db4C78d097cA8C23E8',
    decimal: 18,
    name: 'ZRX/ETH',
  },
  'BAT/ETH': {
    addr: '0x9b4e2579895efa2b4765063310Dc4109a7641129',
    decimal: 18,
    name: 'BAT/ETH',
  },
  'DAI/ETH': {
    addr: '0x037E8F2125bF532F3e228991e051c8A7253B642c',
    decimal: 18,
    name: 'DAI/ETH',
  },
  'USDT/ETH': {
    addr: '0xa874fe207DF445ff19E7482C746C4D3fD0CB9AcE',
    decimal: 18,
    name: 'USDT/ETH',
  },
  'BUSD/ETH': {
    addr: '0x5d4BB541EED49D0290730b4aB332aA46bd27d888',
    decimal: 18,
    name: 'BUSD/ETH',
  },
  'SUSD/ETH': {
    addr: '0x6d626Ff97f0E89F6f983dE425dc5B24A18DE26Ea',
    decimal: 18,
    name: 'SUSD/ETH',
  },
  'SNX/ETH': {
    addr: '0xE23d1142dE4E83C08bb048bcab54d50907390828',
    decimal: 18,
    name: 'SNX/ETH',
  },
  'FastGas/Gwei': {
    addr: '0xA417221ef64b1549575C977764E651c9FAB50141',
    decimal: 9,
    name: 'FastGas/Gwei',
  },
  'REN/ETH': {
    addr: '0xB7B1C8F4095D819BDAE25e7a63393CDF21fd02Ea',
    decimal: 18,
    name: 'REN/ETH',
  },
  'ENJ/ETH': {
    addr: '0x3E0De81e212eB9ECCD23bb3a9B0E1FAC6C8170fc',
    decimal: 18,
    name: 'ENJ/ETH',
  },
};

export let abi = [
  {
    constant: true,
    inputs: [],
    name: 'latestAnswer',
    outputs: [{ name: '', type: 'int256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'latestTimestamp',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

function isPresentInArr(_arr, _ele) {
  return _arr.includes(_ele) ? 1 : 0;
}
export function getPairRelation(_left, _right) {
  if (_left == _right) return [];
  let ethPairs = [
    'TUSD',
    'KNC',
    'MANA',
    'SUSD',
    'LEND',
    'USDC',
    'SNX',
    'USDT',
    'REN',
    'ENJ',
    'BAT',
    'MKR',
    'ZRX',
    'BUSD',
    'REP',
    'LRC',
    'DAI',
    'LINK',
  ];
  let usdPairs = [
    'AUD',
    'OXT',
    'CHF',
    'BNT',
    'EUR',
    'JPY',
    'XHV',
    'GBP',
    'XAG',
    'XAU',
    'BTC',
  ];

  let isOneSideETH = _left == 'ETH' || _right == 'ETH';
  let isOneSideUSD = _left == 'USD' || _right == 'USD';

  let usdKnownPair =
    isPresentInArr(usdPairs, _left) + isPresentInArr(usdPairs, _right);
  let ethKnownPair =
    isPresentInArr(ethPairs, _left) + isPresentInArr(ethPairs, _right);

  //   console.log(_left, _right);
  //   console.log(isOneSideETH, isOneSideUSD);
  //   console.log(ethKnownPair, usdKnownPair);

  let pairRelationArr = [];
  if (usdKnownPair == 2) {
    pairRelationArr.push([`${_left}/USD`, false]);
    pairRelationArr.push([`${_right}/USD`, true]);
  } else if (ethKnownPair == 2) {
    pairRelationArr.push([`${_left}/ETH`, false]);
    pairRelationArr.push([`${_right}/ETH`, true]);
  } else if (isOneSideUSD) {
    let isLeftUSD = _left == 'USD' ? true : false;
    if (usdKnownPair > 0) {
      let pair = isLeftUSD ? `${_right}/USD` : `${_left}/USD`;
      pairRelationArr.push([pair, isLeftUSD]);
    } else if (ethKnownPair > 0) {
      let pair = isLeftUSD ? `${_right}/ETH` : `${_left}/ETH`;
      let ethusd = ['ETH/USD', isLeftUSD];
      if (isLeftUSD) {
        pairRelationArr.push(ethusd);
        pairRelationArr.push([pair, isLeftUSD]);
      } else {
        pairRelationArr.push([pair, isLeftUSD]);
        pairRelationArr.push(ethusd);
      }
    } else if (isOneSideETH) {
      pairRelationArr.push(['ETH/USD', isLeftUSD]);
    }
  } else if (isOneSideETH) {
    let isLeftETH = _left == 'ETH' ? true : false;
    if (ethKnownPair > 0) {
      let pair = isLeftETH ? `${_right}/ETH` : `${_left}/ETH`;
      pairRelationArr.push([pair, isLeftETH]);
    } else if (usdKnownPair > 0) {
      let pair = isLeftETH ? `${_right}/USD` : `${_left}/USD`;
      let ethusd = ['ETH/USD', !isLeftETH];
      if (isLeftETH) {
        pairRelationArr.push(ethusd);
        pairRelationArr.push([pair, isLeftETH]);
      } else {
        pairRelationArr.push([pair, isLeftETH]);
        pairRelationArr.push(ethusd);
      }
    }
  } else if (usdKnownPair == 1 && ethKnownPair == 1) {
    let isLeftUSDPair = usdPairs.includes(_left);

    if (isLeftUSDPair) {
      pairRelationArr.push([`${_left}/USD`, false]);
      pairRelationArr.push([`ETH/USD`, true]);
      pairRelationArr.push([`${_right}/ETH`, true]);
    } else {
      pairRelationArr.push([`${_left}/ETH`, false]);
      pairRelationArr.push([`ETH/USD`, false]);
      pairRelationArr.push([`${_right}/USD`, true]);
    }
  }
  return pairRelationArr;
}

export async function fetchPrice(web3, left, right, callback) {
  let pairRelation = getPairRelation(left, right);
  let price = 1;
  let contractDetails = [];
  let len = pairRelation.length;
  let minTs = Infinity;
  for (let i = 0; i < len; i++) {
    let relation = pairRelation[i];
    let pair = relation[0];
    let pairPrice = await getPrice(web3, pair);
    let ts = await getTimestamp(web3, pair);
    let elePrice = !relation[1] ? pairPrice : 1 / pairPrice;
    price *= elePrice;
    let pairEle = pair.split('/');
    let flippedPairEle = !relation[1] ? pairEle : pairEle.reverse();

    minTs = minTs > ts ? ts : minTs;

    contractDetails.push({
      pairFlipped: flippedPairEle.join('/'),
      pair,
      addr: contract_details[pair].addr,
      price: elePrice,
      ts: getDate(ts),
    });
  }
  let data = {
    price,
    to: price,
    contractDetails,
    lastUpdateTs: minTs != Infinity ? getDate(minTs) : 0,
  };
  console.log(data);
  callback(data);
}
function getDate(ts) {
  var theDate = new Date(ts * 1000);
  return theDate.toLocaleString();
}
async function getPrice(web3, pair) {
  let contract = contract_details[pair];
  var priceContract = new web3.eth.Contract(abi, contract.addr);
  let response = await priceContract.methods.latestAnswer().call();
  let price = response / BigNumber(`1e+${contract.decimal}`);
  return price;
}

async function getTimestamp(web3, pair) {
  let contract = contract_details[pair];
  var priceContract = new web3.eth.Contract(abi, contract.addr);
  let ts = await priceContract.methods.latestTimestamp().call();
  return ts;
}
