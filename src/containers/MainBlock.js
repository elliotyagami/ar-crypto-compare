import React, { Component } from 'react';
import ControlPanel from './ControlPanel';
import Console from './Console';
import Transaction from './Transaction';

class MainBlock extends Component {
  render() {
    return (
      <div>
        <div class="pad" style={{ fontSsize: '18px' }}>
          <span class="flexible">AR-Crypto-Compare</span>
          <a class="clickable" href="https://www.arweave.org/" target="_blank">
            About Arweave
          </a>
        </div>
        <div class="paddedContainer flexible">
          <div className="flexible col">
            <ControlPanel />
            <Console />
            <Transaction />
          </div>
        </div>
      </div>
    );
  }
}

export default MainBlock;
