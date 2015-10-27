/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TodoStore and passes the new data to its children.
 */

var React = require('react');
var AccountStore = require('../stores/AccountStore');

/**
 * Retrieve the current ACCOUNT data from the TodoStore
 */
function getAccountState() {
  return {
    allAccounts: AccountStore.getAll()
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
          allAccounts={this.state.allAccounts}
        />
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange: function() {
    this.setState(getTodoState());
  }

});

module.exports = MMRApp;
