/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the AccountStore and passes the new data to its children.
 */
var React = require('react');
var MMRChart = require('./chart/MMRChart');
var MatchEntry = require('./admin/MatchEntry');
// var ReconcileAccounts = require('./admin/ReconcileAccounts');

var MMRServerActions = require('../actions/MMRServerActions');
var AccountStore = require('../stores/AccountStore');
var MatchStore = require('../stores/MatchStore');
var AccountParser = require('../utils/AccountParser');
var AjaxLoader = require('./utils/AjaxLoader');

/**
 * Retrieve the current ACCOUNT data from the AccountStore
 */
function getAppState() {
  var rawAccounts = AccountStore.getAll();
  var parsedAccountObject = AccountStore.getParsedAccounts();
  var hoveredMatchList = MatchStore.getHoveredMatchList();
  
  console.log(parsedAccountObject);
  
  return {
    accounts: parsedAccountObject.parsedAccounts,
    labels: parsedAccountObject.labels,
    series: parsedAccountObject.series,
    rawAccounts: rawAccounts,
    minY: parsedAccountObject.minY,
    maxY: parsedAccountObject.maxY,
    hoveredMatchList: hoveredMatchList
  };
}

var MMRApp = React.createClass({

  getInitialState: function() {
    return getAppState();
  },
  
  shouldComponentUpdate(nextProps, nextState) {
    console.log('should I change state?');
    console.log('next state:');
    console.log(nextState);
    console.log('this state:');
    console.log(this.state);
    
    return true;
  },

  componentDidMount: function() {
    AccountStore.addChangeListener(this._onChange);
    MatchStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AccountStore.removeChangeListener(this._onChange);
    MatchStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    console.log(this.state);
    return (
      <div>
        <MMRChart
          accounts={this.state.accounts}
          labels={this.state.labels}
          series={this.state.series}
          minY={this.state.minY}
          maxY={this.state.maxY}
        />
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange: function() {
    console.log('CHANGE EVENT!!!');
    this.setState(getAppState());
  }

});

module.exports = MMRApp;
