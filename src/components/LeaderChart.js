var React = require('react');
var ChartistGraph = require('react-chartist');
var $ = require('jquery');

var LeaderChart = React.createClass({

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
    
    var options = {
      high: 10,
      low: -10,
      axisX: {
        labelInterpolationFnc: function(value, index) {
          return index % 2 === 0 ? value : null;
        }
      }
    };
    
    var data = {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
      series: [
        [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
      ]
    };
    
    return (
      <ChartistGraph data={data} options={options} type="Bar" />
    );
  }
  
});

module.exports = LeaderChart;
