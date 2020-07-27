import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

class ToInput extends Component {
  render() {
    return (
      <div className="flexible paddedContainer darker">
        {this.props.toCurrencies.map((ele, i) => (
          <div className="item darker" key={i}>
            {/* <span style={{ flex: '1 1 0%' }}>
              <span className="clickable">+</span>
            </span> */}
            <span
              style={{ flex: '2 1 0%' }}
              onClick={() => {
                let _this = this;
                if (this.props.web3 != null) {
                  this.props.web3.eth.net.getNetworkType().then((networkID) => {
                    if (networkID == 'main') {
                      _this.props.toCurrency(ele);
                    } else {
                      toast.error('Please switch to mainnet.', {
                        position: 'bottom-right',
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                    }
                  });
                } else {
                  toast.info('Connect with metamask to use.', {
                    position: 'bottom-right',
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                }
              }}
            >
              <span className="clickable">{ele}</span>
            </span>
            <span
              style={{ backgroundColor: 'rgb(43, 8, 8)', flex: '1 1 0%' }}
              onClick={() => this.props.removeToCurrency(i)}
            >
              <span className="clickable">-</span>
            </span>
          </div>
        ))}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    web3: state.web3,
  };
};

const mapDispatchToProps = (dispatch) => {};

export default connect(mapStateToProps, mapDispatchToProps)(ToInput);
