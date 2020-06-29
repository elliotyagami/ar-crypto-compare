import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTxData } from '../actions/arweave';
import Arweave from 'arweave/web';

const TABLE_FORMATS = [
  'target',
  'reward',
  'quantity',
  'data_size',
  'tags',
  'owner',
];

const label = ['Receiver', 'Reward', 'Quantity', 'Data size', 'Tags', 'Owner'];

const link = {
  target: 'https://viewblock.io/arweave/address/',
};

class Transaction extends Component {
  constructor() {
    super();
    this.state = {
      txID: '',
    };
    this.renderTx = this.renderTx.bind(this);
  }

  getFrom(e) {
    this.setState({ txID: e.target.value });
  }
  searchTx(id) {
    // var arweave = Arweave.init();
    // Or manually specify a host
    var arweave = Arweave.init({
      host: 'arweave.net',
      port: 443,
      protocol: 'https',
    });
    arweave.transactions.get(id).then((transaction) => {
      transaction['tags'] = transaction['tags'].join(', ');
      this.props.setTxData(transaction);
    });
  }
  render() {
    console.log(this.props.txData);
    return (
      <div className="flexible col">
        <div className="pad" style={{ fontSize: '15px', margin: '0 0 10px 0' }}>
          <span className="flexible">Provide Transaction ID</span>
          <input
            width="48"
            className="clickable"
            style={{ fontSize: '15px', flex: '.8' }}
            placeholder="Enter the tx id here..."
            value={this.state.txID}
            onChange={this.getFrom.bind(this)}
          />
          <span
            className="darker clickable"
            onClick={() => {
              this.searchTx(this.state.txID);
            }}
          >
            Search
          </span>
        </div>

        {this.state.txID.length > 0 && this.props.txData['owner']
          ? this.renderTx()
          : ''}
      </div>
    );
  }
  renderTx() {
    return (
      <div className="flexible">
        {TABLE_FORMATS.map((ele, i) => (
          <a
            href={link[ele] ? link[ele] + this.props.txData[ele] : '#'}
            target={link[ele] ? '_blank' : ''}
          >
            <div className="darker logEntry">
              <div
                className="toggled2"
                style={{
                  flex: '1',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <span>{label[i]}</span>
              </div>
              <span className="clickable dominant logEntry">
                <span
                  className="flexible"
                  style={{ wordWrap: 'anywhere', verticalAlign: 'middle' }}
                >
                  {this.props.txData[ele]}
                </span>
              </span>
            </div>
          </a>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    txData: state.arweave.txData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTxData: (data) => {
      dispatch(setTxData(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
