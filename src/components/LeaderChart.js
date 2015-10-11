var React = require('react');
var ChartistGraph = require('react-chartist');
var $ = require('jquery');
var moment = require('moment');

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
            
            state_accounts = state_accounts.map(function(account) {
              return parseAccount(account);
            });
            
            _this.setState({ accounts: state_accounts });
          }
        });
      });
      
    });
    
    
  },
    
  render: function() {
    
    var labels = makeTimes("2015-9-28", 'day');
        
    var series = this.state.accounts.map(function(matches) {
      // account is an array of matches
      var current = 0;
      var result = labels
        .map(function(label, index, array) {
          var todaysMatches = matches
            .filter(function(match, index) {
              return moment(match.startTime).isSame(moment(label), 'day');
            });
          
          if (todaysMatches.length === 0) {
              return null;
          } else {
            // console.log(todaysMatches);
            return todaysMatches
              .reduce(function(acc, match) {
                if (moment(match.startTime).isAfter(moment(acc.startTime))) {
                  match.change = acc.change;
                  return match;
                } else {
                  acc.change = match.change;
                  return acc;
                }
              });
          }
        })
        .map(function(day){
          if (day) {
            current = day.change;
            return day.change;
          } else {
            return current;
          }
        });
      
      return {
        // className: matches.username,
        name: matches.username,
        data: result
      };
    });
            
    var options = {
      high: 200,
      low: -200,
      height: '500px',
      axisX: {
        labelInterpolationFnc: function(value, index) {
          return moment(value).format('MMM D YYYY');
        }
      }
    };
    
    var data = {
      labels: labels,
      series: series
    };
    
    if (series.length) {
      return (
        <ChartistGraph data={data} options={options} type="Line" />
      );
    } else {
      return (
        <div>Gettin data!</div>
      );
    }
  }
  
});

function makeTimes(start, unit) {
  var now = moment();
  start = moment(start);
  var result = [];
    
  while (start.isBefore(now)) {
    result.push(start.format());
    start.set(unit, start.get(unit) + 1);
  }
  
  return result;
}

function parseAccount(account) {
  var oneWeekAgo = moment().date(moment().date() - 7);
  var baseline = account.startingMMR;
  var current = baseline;
    
  var changes = account.Matches
    // .filter(function(match) { return moment(match.startTime).isAfter(oneWeekAgo); })
    .map(function(match) {
      current += match.mmrChange;
      // if (account.username === 'sandfriend') {
      //   console.log({
      //     change: current - baseline,
      //     mmr: current,
      //     startTime: match.startTime
      //   });
      // }
      return {
        change: current - baseline,
        mmr: current,
        startTime: match.startTime
      };
    });
  
  changes.username = account.username;
  return changes;
}

module.exports = LeaderChart;
