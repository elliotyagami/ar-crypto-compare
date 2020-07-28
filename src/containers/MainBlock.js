import React, { Component } from 'react';
import { connect } from 'react-redux';
import ControlPanel from './ControlPanel';
import Console from './Console';
import Transaction from './Transaction';
import { initWeb3 } from '../actions/index';
import Web3 from 'web3';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let toastObj = {
  position: 'bottom-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};
class MainBlock extends Component {
  constructor() {
    super();
    this.connectMetamask = this.connectMetamask.bind(this);
  }
  connectMetamask = () => {
    console.log(this.props.web3);
    if (this.props.web3 == null) {
      let web3 = new Web3(Web3.givenProvider || 'http://kovan.infura.io');
      console.log(web3);
      let _this = this;
      web3.eth.net.getNetworkType().then((networkID) => {
        if (networkID == 'main') {
          _this.props.initWeb3(web3);
          toast.success('Metamask connected.', toastObj);
        } else {
          toast.error('Please switch to mainnet.', toastObj);
        }
      });
    }
  };
  render() {
    return (
      <div>
        <div className="pad" style={{ fontSsize: '18px' }}>
          <span className="flexible">AR-Crypto-Compare</span>
          <span className="clickable" onClick={this.connectMetamask}>
            {this.props.web3 ? 'Connected' : 'Connect to metamask'}
          </span>
        </div>
        <div className="paddedContainer flexible">
          <div className="flexible col">
            <ToastContainer />
            <ControlPanel />
            <Console />
            <Transaction />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    web3: state.web3,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initWeb3: (web3Instance) => {
      dispatch(initWeb3(web3Instance));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainBlock);
