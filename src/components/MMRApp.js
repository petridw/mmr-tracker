/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the AccountStore and passes the new data to its children.
 */
var React = require('react');
var MMRChart = require('./chart/MMRChart');

var MMRServerActions = require('../actions/MMRServerActions');
var AccountStore = require('../stores/AccountStore');
var AccountParser = require('../utils/AccountParser');
var AjaxLoader = require('./utils/AjaxLoader');

/**
 * Retrieve the current ACCOUNT data from the AccountStore
 */
function getAccountState() {
  var accounts = AccountStore.getAll();
  
  // Unit should be in a store? OPTIONS store?
  var parsedAccounts = AccountParser(accounts, { unit: 'day' });
  var labels;
  var series;
  
  series = parsedAccounts.map(function(account, index) {
    var data = account.map(function(time_unit){
      return time_unit.netChange;
    });
    return {
      name: account.username,
      data: data,
      className: 'ct-series-' + (index + 1),
      key: account.accountID
    };
  });
  
  if (parsedAccounts.length) {
    labels = parsedAccounts[0].map(function(time_unit){
      return time_unit.time;
    });  
  } else {
    labels = [];
  }
  
  
  return {
    accounts: parsedAccounts,
    labels: labels,
    series: series,
    rawAccounts: accounts
  };
}

var MMRApp = React.createClass({

  getInitialState: function() {
    return getAccountState();
  },

  componentDidMount: function() {
    AccountStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AccountStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div>
        <MMRChart
          labels={this.state.labels}
          series={this.state.series}
        />
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange: function() {
    this.setState(getAccountState());
  }

});

module.exports = MMRApp;
