import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeLog, clearConsole } from '../actions/consoleActions';
import Arweave from 'arweave/web';
import arweave from '../reducers/arweave';
import { toast } from 'react-toastify';
import { addToConsole } from '../actions/consoleActions';
let toastObj = {
  position: 'bottom-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};
function getToastObj(obj) {
  return { ...toastObj, ...obj };
}

function getDate(ts) {
  var theDate = new Date(ts * 1000);
  return theDate.toLocaleString('en-us', { timeZoneName: 'short' });
}

class MainBlock extends Component {
  constructor() {
    super();
    this.state = { info: true, arweave: null, wallet: null, username: '' };
    this.arweaveSaveSession = this.arweaveSaveSession.bind(this);
    this.arweaveLogin = this.arweaveLogin.bind(this);
    this.loadSession = this.loadSession.bind(this);
    this.saveUserName = this.saveUserName.bind(this);
  }
  saveUserName(event) {
    this.setState({ username: event.target.value });
  }
  async arweaveSaveSession() {
    if (this.state.wallet == null) {
      toast.error('Load arweave wallet.', toastObj);
    } else if (!this.state.username) {
      toast.error('Provide a username before saving.', toastObj);
    } else if (this.state.wallet != null) {
      if (this.props.logs.length == 0) {
        console.log('returned');
        return;
      }
      var unixTime = Math.round(new Date().getTime() / 1000);
      var tx = await this.props.arweave.createTransaction(
        {
          data: JSON.stringify(this.props.logs),
        },
        this.state.wallet,
      );
      console.log('TX', tx);
      tx.addTag('App-Name', 'ar-social-trader');
      tx.addTag('Type', 'session');
      tx.addTag('Unix-Time', unixTime);
      tx.addTag('Username', this.state.username);
      toast.info('Saving current session!!', toastObj);
      await this.props.arweave.transactions.sign(tx, this.state.wallet);
      let resp = await this.props.arweave.transactions.post(tx);
      console.log('Tx submission response', resp);
    }
  }
  arweaveLogin(event) {
    if (this.props.arweave != null) {
      event.stopPropagation();
      event.preventDefault();
      const _this = this;
      var fr = new FileReader();
      fr.onload = function (ev) {
        try {
          let wallet = JSON.parse(ev.target.result);

          _this.props.arweave.wallets.jwkToAddress(wallet).then((address) => {
            _this.setState({ wallet, address });
            _this.loadSession(address);
            toast.success(
              `Loaded wallet ${_this.state.address.substring(0, 40)}...`,
              getToastObj({
                position: 'top-center',
                autoClose: 4000,
              }),
            );
          });
        } catch (err) {
          alert('Error logging in: ' + err);
        }
      };
      fr.readAsText(event.target.files[0]);
    }
  }
  async loadSession(address) {
    let query = {
      op: 'and',
      expr1: {
        op: 'equals',
        expr1: 'from',
        expr2: address,
      },
      expr2: {
        op: 'and',
        expr1: {
          op: 'equals',
          expr1: 'App-Name',
          expr2: 'ar-social-trader',
        },
        expr2: {
          op: 'equals',
          expr1: 'Type',
          expr2: 'session',
        },
      },
    };
    const res = await this.props.arweave.arql(query);
    if (res.length == 0) return;
    let txid = res[0];
    let tx_data = null;
    try {
      tx_data = await this.props.arweave.transactions.get(txid);
    } catch (error) {
      // tx_data = [];
      console.log(error);
    }
    if (tx_data == null) return;
    this.setState({ info: false });
    let sessionTs = '';
    let username = '';
    // get unix-time tag
    tx_data.get('tags').forEach((tag) => {
      let key = tag.get('name', {
        decode: true,
        string: true,
      });
      let value = tag.get('value', {
        decode: true,
        string: true,
      });
      if (key === 'Unix-Time') sessionTs = getDate(parseInt(value));
      if (key === 'Username') username = value;
    });
    toast.info(
      `Loaded session ${sessionTs} for ${username}`,
      getToastObj({
        position: 'top-center',
        autoClose: 8000,
      }),
    );
    // parse json data
    let data = tx_data.get('data', { decode: true, string: true });
    console.log(data);
    JSON.parse(data).forEach((row) => {
      this.props.addToConsole(row);
    });
    this.setState({ username });
    // document.getElementById('username').value = username;
    document.getElementById('username').disabled = true;
  }
  render() {
    return (
      <div className="flexible col darker">
        <div className="pad">
          <span className="flexible">Log: Comparsion Between Currencies </span>
          <span
            style={{ margin: 'auto' }}
            className=" clickable"
            onClick={() => {
              // this.setState({ info: false });
              this.arweaveSaveSession();
            }}
          >
            Save session to arweave
          </span>
          <span></span>
          {!this.state.wallet ? (
            <span>
              <label for="file-upload" className="custom-file-upload clickable">
                Load AR wallet
              </label>
              <input
                type="file"
                id="file-upload"
                onChange={this.arweaveLogin}
              />
            </span>
          ) : (
            <span className="clickable" style={{ margin: 'auto' }}>
              {'Loaded ' + this.state.address.substring(0, 20) + '...'}
            </span>
          )}

          <span></span>
          <input
            id="username"
            width="48"
            className="clickable"
            placeholder="Enter your username..."
            style={{ fontSize: '1.1em' }}
            value={this.state.username}
            onChange={this.saveUserName.bind(this)}
          />
          <span></span>
          <span
            className=" clickable"
            style={{ margin: 'auto' }}
            onClick={() => {
              this.setState({ info: false });
              this.props.clearConsole();
            }}
          >
            Clear
          </span>
        </div>
        <div style={{ height: '22vh' }}>
          {this.state.info ? (
            <div
              className="darker logEntry"
              onClick={() => this.setState({ info: false })}
            >
              <span className="clickable">
                Welcome to ARweave Crypto Compare!
                <br />-<br />
                This is a Clientside WebApp for tracking Cryptocurrencies.
                <br />
                You can compare crypto to crypto, crypto to fiat or w.r.t.
                Arweave.
                <br />
                Simply select a currency in the From menu, then select a
                currency in the To menu.
                <br />
                The Conversion Data will appear on the table in the Currency
                Info section of the page.
                <br />
                Click any row of the data table to print currency information to
                this log.
                <br />
                Click the plus button on the converter to print conversions to
                this log.
                <br />-<br />
                Click Me to Delete!
              </span>
            </div>
          ) : (
            ''
          )}
          {this.props.logs.map((ele, i) => {
            if (ele.label || typeof ele.tag != undefined)
              return (
                <div
                  className="darker logEntry logHeight"
                  key={i}
                  onClick={() => this.props.removeLog(i)}
                >
                  <span className="toggled">
                    {ele.from} -&gt; {ele.to}
                  </span>
                  <span className="clickable dominant logEntry">
                    <span>{ele.label ? ele.label : ele.tag}</span>
                    <span>
                      <b>{ele.value}</b>
                    </span>
                    {ele.date ? <span>{getDate(ele.date)}</span> : ''}
                  </span>
                </div>
              );
            else
              return (
                <div
                  className="darker logEntry logHeight"
                  onClick={() => this.props.removeLog(i)}
                >
                  <span className="toggled2">
                    {ele.from} -&gt; {ele.to}
                  </span>
                  <span className="clickable dominant logEntry">
                    <span className="flexible">{ele.value}</span>
                  </span>
                </div>
              );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    logs: state.console,
    arweave: state.arweave,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeLog: (index) => {
      dispatch(removeLog(index));
    },
    clearConsole: () => {
      dispatch(clearConsole());
    },
    addToConsole: (row) => {
      dispatch(addToConsole(row));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainBlock);
