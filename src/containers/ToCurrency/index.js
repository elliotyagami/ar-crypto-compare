import React, { Component } from 'react';
import ToDisplay from './ToDisplay';
import { connect } from 'react-redux';
import { toCurrency, addToCurrency, removeToCurrency } from '../../actions';

class MainBlock extends Component {
  constructor() {
    super();
    this.state = {
      to: '',
    };
  }

  getTo(e) {
    this.setState({ to: e.target.value });
  }

  render() {
    return (
      <span className="flexible col limitHeight">
        <div className="pad" style={{ fontSize: '1.1em' }}>
          <span className="flexible">To</span>
          <span className="toggled">A</span>
          <input
            maxLength="8"
            className="clickable highlyFlexible"
            placeholder="Enter to currency..."
            value={this.state.to}
            onChange={this.getTo.bind(this)}
          />
          <span
            className=" clickable"
            onClick={() => {
              this.setState({ to: '' });
              return this.props.addToCurrency(this.state.to);
            }}
          >
            Add
          </span>
        </div>
        <ToDisplay
          toCurrency={this.props.toCurrency}
          removeToCurrency={this.props.removeToCurrency}
          toCurrencies={this.props.toCurrencies}
        />
      </span>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    toCurrencies: state.conversion.toCurrency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCurrency: (id) => {
      dispatch(addToCurrency(id));
    },
    removeToCurrency: (id) => {
      dispatch(removeToCurrency(id));
    },
    toCurrency: (id) => {
      dispatch(toCurrency(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainBlock);
