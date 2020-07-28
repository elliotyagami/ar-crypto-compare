import React, { Component } from 'react';

const attrToLabel = {
  price: 'Price',
  contractNames: 'Chainlink Contracts',
  lastUpdateTs: 'TimeStamp',
};

class MainBlock extends Component {
  constructor() {
    super();
    this.printConsole = this.printConsole.bind(this);
    this.getContractName = this.getContractName.bind(this);
  }
  printConsole(attr) {
    // this.props.addToConsole({
    //   label: attrToLabel[attr],
    //   value:
    //     attr != 'contractNames'
    //       ? this.props.state[attr]
    //       : this.getContractName(),
    //   from: this.props.from,
    //   to: this.props.to,
    // });
  }
  getContractName() {
    let names = '';
    this.props.state.contractDetails.forEach((val, ind) => {
      names += `${val.pair} `;
    });
    return names;
  }
  render() {
    return (
      <table>
        <tbody>
          {/* {TABLE_FORMATS.map((ele, i) => ( */}
          <tr
            className="darker clickable"
            onClick={() => this.printConsole('price')}
          >
            <th>Price</th>
            <th className="value">
              <b>{this.props.state.price ? this.props.state.price : ''}</b>
            </th>
          </tr>
          <tr
            className="darker clickable"
            onClick={() => this.printConsole('contractNames')}
          >
            <th>Chainlink Contract Names</th>
            <th className="value">
              <b>{this.getContractName()}</b>
            </th>
          </tr>
          <tr
            className="darker clickable"
            onClick={() => this.printConsole('lastUpdateTs')}
          >
            <th>Last Update Timestamp</th>
            <th className="value">
              <b>{this.props.state.lastUpdateTs}</b>
            </th>
          </tr>
          {/* ))} */}
        </tbody>
      </table>
    );
  }
}

export default MainBlock;
