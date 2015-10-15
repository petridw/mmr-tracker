var React = require('react');
var ChartistGraph = require('react-chartist');
var $ = require('jquery');
var moment = require('moment');
var parseAccounts = require('../helpers/parseAccounts');

var LeaderChart = React.createClass({

  getInitialState: function() {
    return { accounts: [], labels: [], series: [] };
  },
  
  componentDidMount: function() {
    var _this = this;
    var state_accounts = [];
    var count;
    
    $.get('/api/accounts', function(data) {
      if (!data) return console.log('ERROR');
      
      // _this.setState({ accounts: parseAccounts(data, { unit: 'day' }) });
      var accounts = parseAccounts(data, { unit: 'day' });
      
      var series = accounts.map(function(account, index) {
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
      var labels = accounts[0].map(function(time_unit){
        return time_unit.time;
      });
      
      _this.setState({
        accounts: accounts,
        labels: labels,
        series: series
      });
    });
    
    
  },
    
  render: function() {
        
    var labelNames = this.state.series.map(function(s, index) {
      return <li className={"username ct-series-" + (index + 1)} key={s.key}>{s.name}</li>;
    });
    
    var options = {
      high: 300,
      low: -200,
      height: '500px',
      axisX: {
        labelInterpolationFnc: function(value, index) {
          return moment(value).format('MMM D YYYY');
        }
      }
    };
    
    var data = {
      labels: this.state.labels,
      series: this.state.series
    };
    
    if (this.state.series.length) {
      return (
        <div>
          <ChartistGraph data={data} options={options} type="Line" />
          <ul>
            {labelNames}
          </ul>
        </div>
      );
    } else {
      return (
        <div>Gettin data!</div>
      );
    }
  }
  
});


module.exports = LeaderChart;
