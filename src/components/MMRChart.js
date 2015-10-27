var React = require('react');
var ChartistGraph = require('react-chartist');
var $ = require('jquery');
var moment = require('moment');
var parseAccounts = require('../helpers/parseAccounts');
var ReconcileAccounts = require('./ReconcileAccounts');
var MatchEntry = require('./MatchEntry');


var LeaderChart = React.createClass({

  getInitialState: function() {
    return { accounts: [], labels: [], series: [] };
  },
  
  componentDidMount: function() {
    this.update();
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
          return moment(value).format('MMM DD YYYY');
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
          <MatchEntry accounts={this.state.accounts} update={this.update} />
          <ReconcileAccounts accounts={this.state.rawAccounts} update={this.update} />
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
