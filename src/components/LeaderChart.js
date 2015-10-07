var React = require('react');
var Chartist = require('chartist');
var $ = require('jquery');

var Chart = React.createClass({

  getInitialState: function() {
    return { accounts: [] };
  },
  
  componentDidMount: function() {
    var _this = this;
    var state_accounts = [];
    var count;
    
    $.get('/api/accounts', function(accounts) {
      if (!accounts) return console.log('ERROR');
      count = accounts.length;
      
      accounts.forEach(function(account) {
        $.get('/api/account/' + account.accountID, function(account) {
          state_accounts.push(account);
          count -= 1;
          
          if (count === 0) {
            // all accounts returned
            _this.setState({ accounts: state_accounts });
          }
        });
      });
      
    });
    
    
  },
    
  render: function() {
    console.log(this.state);
    return (
      <div className="ct-chart ct-golden-section" id="leaderBoard"></div>
    );
  }
  
});

module.exports = Chart;
