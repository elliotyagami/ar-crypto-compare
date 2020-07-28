import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setArweave } from '../actions/arweave';
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

function getDate(ts) {
  var theDate = new Date(ts * 1000);
  return theDate.toLocaleString();
}
function getDateLocal(ts) {
  var theDate = new Date(ts * 1000);
  return theDate.toLocaleString('en-us', { timeZoneName: 'short' });
}
class TraderDetails extends Component {
  constructor() {
    super();
    this.state = {
      txID: '',
      logs: [],
      traders: {},
      sessions: [],
      currentSessionTs: 0,
      userid: '',
    };
    this.renderSessions = this.renderSessions.bind(this);
    this.fetchTrader = this.fetchTrader.bind(this);
    this.sessionString = this.sessionString.bind(this);
    this.searchUser = this.searchUser.bind(this);
    this.setSession = this.setSession.bind(this);
    this.removeUser = this.removeUser.bind(this);
  }
  componentDidMount() {
    var arweave = Arweave.init({
      host: 'arweave.net',
      port: 443,
      protocol: 'https',
    });
    this.props.setArweave(arweave);
    this.fetchTrader(arweave);
  }
  removeUser() {
    this.setState({ logs: [], sessions: [], currentSessionTs: 0, userid: '' });
  }
  // setlogs(id) {
  //   let logs = this.state.traders[id].sessions;
  //   this.setState({ logs });
  // }
  setSession(sessionTs) {
    if (sessionTs == this.state.currentSessionTs) return;
    if (!this.state.traders[this.state.userid]) return;
    let logs = [];
    this.state.traders[this.state.userid]['sessions'].forEach((data) => {
      if (data.sessionTs == sessionTs) {
        logs = data.logs;
        return;
      }
    });
    // let logs = this.state.traders[this.state.userid][sessionTs].logs;
    this.setState({ logs, currentSessionTs: sessionTs });
  }
  searchUser(userid) {
    // this.setState({ userid });
    let userdetails = this.state.traders[userid];
    if (!userdetails) {
      this.setState({
        logs: [],
        sessions: [],
        currentSessionTs: 0,
        userid: '',
      });
      return;
    }
    this.setState({
      logs: userdetails['sessions'][0].logs,
      sessions: userdetails['sessions'],
      currentSessionTs: userdetails.latestSessionTs,
      userid: userid,
    });
  }
  async fetchTrader(arweave) {
    let query = {
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
    };
    const res = await arweave.arql(query);
    let traders = {};
    if (res) {
      await Promise.all(
        res.map(async function (id, i) {
          let tx_data;
          try {
            tx_data = await arweave.transactions.get(id);
          } catch (error) {
            return {};
            // Here, `error` would be an `Error` (with stack trace, etc.).
            // Whereas if you used `throw 400`, it would just be `400`.
          }
          let tx_owner = await arweave.wallets.ownerToAddress(tx_data.owner);
          // console.log(tx_data);
          if (tx_data == null) return;
          let username = '';
          let sessionTs = 0;
          tx_data.get('tags').forEach((tag) => {
            let key = tag.get('name', {
              decode: true,
              string: true,
            });
            let value = tag.get('value', {
              decode: true,
              string: true,
            });
            if (key === 'Unix-Time') sessionTs = parseInt(value);
            if (key === 'Username') username = value;
          });
          if (traders[tx_owner] == undefined)
            traders[tx_owner] = { username, latestSessionTs: 0, sessions: [] };

          let prevLatestTs = traders[tx_owner]['latestSessionTs'];

          traders[tx_owner]['latestSessionTs'] =
            prevLatestTs > sessionTs ? prevLatestTs : sessionTs;

          let json_data = tx_data.get('data', {
            decode: true,
            string: true,
          });
          traders[tx_owner]['sessions'].push({
            logs: JSON.parse(json_data),
            sessionTs,
          });
        }),
      );
      Object.keys(traders).forEach((k) => {
        traders[k].sessions.sort(function (b, a) {
          return a.sessionTs - b.sessionTs > 0 ? 1 : -1;
        });
      });
      this.setState({ traders });
    }
  }
  sessionString() {
    let userid = this.state.userid;
    if (!userid) return 'Sessions';
    let username = this.state.traders[userid].username;
    return `Sessions of ${username}( ${userid} )`;
  }
  render() {
    return (
      <div className="flexible col">
        <div className="pad" style={{ margin: '0 0 10px 0' }}>
          <span className="flexible">
            {this.state.logs.length == 0
              ? 'Social Trading'
              : this.sessionString()}
          </span>
          {this.state.logs.length == 0 ? (
            <input
              width="48"
              className="clickable"
              style={{ fontSize: '1.1em', flex: '.8' }}
              placeholder="Provide the user ARweave id..."
              // value={this.state.txID}
              onChange={(e) => this.searchUser(e.target.value)}
            />
          ) : (
            ''
          )}
          {this.state.logs.length == 0 ? (
            <span className="darker clickable">Search</span>
          ) : (
            <span className="darker clickable" onClick={this.removeUser}>
              &lt; Back
            </span>
          )}
        </div>

        {this.renderSessions()}
      </div>
    );
  }
  renderSessions() {
    return (
      <div className="flexible">
        <div className="flexible flexDisplay">
          {this.state.sessions.map((ele, i) => {
            return (
              <span
                className={`toggled2 sessionBox
                  ${
                    ele.sessionTs == this.state.currentSessionTs
                      ? 'selected'
                      : ''
                  }`}
                key={i}
                onClick={() => {
                  this.setSession(ele.sessionTs);
                }}
              >
                Session {getDate(ele.sessionTs)}
              </span>
            );
          })}
        </div>
        <div className="flexible">
          {this.state.logs.map((ele, i) => {
            if (ele.label || typeof ele.tag != undefined) {
              return (
                <div className="darker logEntry logHeight" key={i}>
                  <span className="toggled">
                    {ele.from} -&gt; {ele.to}
                  </span>
                  <span className="clickable dominant logEntry">
                    <span>{ele.label ? ele.label : ele.tag}</span>
                    <span>
                      <b>{ele.value}</b>
                    </span>
                    {ele.date ? <span>{getDateLocal(ele.date)}</span> : ''}
                  </span>
                </div>
              );
            } else {
              return '';
            }
          })}
          {this.state.logs.length == 0
            ? Object.keys(this.state.traders).map((traderID, i) => {
                let traderDetails = this.state.traders[traderID];
                return (
                  <div
                    className="darker logEntry logHeight"
                    onClick={() => {
                      this.searchUser(traderID);
                    }}
                    key={i}
                  >
                    <span className="toggled2">{traderDetails.username}</span>
                    <span className="clickable dominant logEntry">
                      <span className="flexible">{traderID}</span>
                    </span>
                    <span>{traderDetails.latestSessionTs}</span>
                  </div>
                );
              })
            : ''}
        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {};
// };

const mapDispatchToProps = (dispatch) => {
  return {
    setArweave: (data) => {
      dispatch(setArweave(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(TraderDetails);
