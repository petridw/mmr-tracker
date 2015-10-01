var React = require('react');
var Account = require('./Account');
var $ = require('jquery');

var AccountList = React.createClass({
  
  getInitialState: function() {
    return { accounts: [] };
  },
  
  componentDidMount: function() {
    var _this = this;
    $.get('/api/accounts', function(result) {
      _this.setState({ accounts: result });
    });
  },
  
  render: function() {
    
    var accounts = this.state.accounts.map(function(account) {
      return (
        <Account account={account} />
      );
    });
    
    return (
      <ul>
        {accounts}
      </ul>
    );
  }
});

module.exports = AccountList;
