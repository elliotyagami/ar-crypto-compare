import React, { Component } from 'react';
import ConversionTable from './ConversionTable';
import { connect } from 'react-redux';
import { addToConsole } from '../../actions/consoleActions';
import { fetchPrice } from './chainlink';

class ConversionInfo extends Component {
  constructor() {
    super();
    this.state = {
      DISPLAY: {},
      price: 0,
      from: 1,
      to: 0,
      tag: '',
      contractDetails: [],
      lastUpdateTs: 0,
    };
    this.headerRenderer = this.headerRenderer.bind(this);
    this.renderConversionRate = this.renderConversionRate.bind(this);
  }

  componentDidMount() {}

  componentWillReceiveProps(props) {
    if (props.web3 != null) {
      let _this = this;
      fetchPrice(props.web3, props.from, props.to, (data) => {
        _this.setState(data);
      });
    }
  }

  changeTo(e) {
    this.setState({
      to: this.state.price * e.target.value,
      from: e.target.value,
    });
  }
  changeFrom(e) {
    this.setState({
      from: e.target.value / this.state.price,
      to: e.target.value,
    });
  }
  changeTag(e) {
    this.setState({
      tag: e.target.value,
    });
  }

  conversionLog() {
    this.props.addToConsole({
      from: this.props.from,
      to: this.props.to,
      value: `${this.props.from} ${this.state.from} (Price 1 ${this.props.from} = ${this.state.price} ${this.props.to})`,
      tag: this.state.tag,
      date: new Date().getTime() / 1000,
    });
  }

  renderConversionRate() {
    return (
      <div className="darker col paddedContainer">
        <div className="pad" style={{ fontSize: '16px' }}>
          <span className="flexible toggled2">Converter</span>
          <span className="clickable" onClick={this.conversionLog.bind(this)}>
            +
          </span>
        </div>
        <div className="pad" style={{ fontSize: '16px' }}>
          <span className="flexible">{this.props.from}</span>
          <input
            maxLength="25"
            className="extremelyFlexible clickable"
            style={{ fontSize: '16px' }}
            value={this.state.from}
            onChange={this.changeTo.bind(this)}
          />
        </div>
        <div className="pad" style={{ fontSize: '16px' }}>
          <span className="flexible">{this.props.to}</span>
          <input
            maxLength="25"
            className="extremelyFlexible clickable"
            style={{ fontSize: '16px' }}
            value={this.state.to}
            onChange={this.changeFrom.bind(this)}
          />
        </div>
        <div className="pad" style={{ fontSize: '16px' }}>
          <span className="flexible">Tag</span>
          <input
            maxLength="25"
            className="extremelyFlexible clickable"
            style={{ fontSize: '16px' }}
            value={this.state.tag}
            onChange={this.changeTag.bind(this)}
          />
        </div>
      </div>
    );
  }
  renderChainLinkTable() {
    return (
      <div className="darker col paddedContainer">
        <div className="pad" style={{ fontSize: '16px' }}>
          <span className="flexible toggled2">Chainlink contracts</span>
          <span className="highlyFlexible toggled2">Price</span>
          <span className="highlyFlexible toggled2">Last update Timestamp</span>
        </div>
        {this.state.contractDetails.map((contract, ind) => {
          return (
            <div className="pad" style={{ fontSize: '16px' }} key={ind}>
              <span className="flexible">{contract.pairFlipped}</span>
              <span className="highlyFlexible clickable">{contract.price}</span>
              <span className="highlyFlexible clickable">{contract.ts}</span>
              <a
                className="clickable"
                href={`https://etherscan.io/address/${contract.addr}`}
                target="_blank"
                style={{ padding: '0' }}
              >
                <img
                  src="/link.png"
                  style={{ height: '1.5em', width: '1.5em' }}
                />
              </a>
            </div>
          );
        })}
      </div>
    );
  }

  headerRenderer() {
    return (
      <div className="infoDisplayFlex">
        <span className="symbol">{this.props.from}</span>
        <span className="nonSymbol">to</span>
        <span className="symbol">{this.props.to}</span>
      </div>
    );
  }

  render() {
    return (
      <span className="highlyFlexible col limitHeight">
        <div className="pad" style={{ fontSize: '15px' }}>
          <span className="flexible">Currency Info</span>
        </div>
        <div className="flexible paddedContainer">
          {this.headerRenderer()}
          <ConversionTable
            to={this.props.to}
            addToConsole={this.props.addToConsole}
            from={this.props.from}
            state={this.state}
          />
          {this.renderConversionRate()}
          {this.renderChainLinkTable()}
        </div>
      </span>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    to: state.conversion.to,
    from: state.conversion.from,
    web3: state.web3,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToConsole: (k) => {
      dispatch(addToConsole(k));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConversionInfo);
