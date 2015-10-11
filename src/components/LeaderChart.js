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
    
    var labels = makeHours("2015-9-28");
    
    var series = this.state.accounts.map(function(matches) {
      // account is an array of matches
      
      return matches.map(function(match) {
        return match.change;
      });
    });
        
    var options = {
      high: 100,
      low: -100,
      axisX: {
        labelInterpolationFnc: function(value, index) {
          return index % 12 === 0 ? value : null;
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

function makeHours(start) {
  var now = moment();
  start = moment(start);
  var result = [];
    
  while (start.isBefore(now)) {
    result.push(start.format());
    start.set('hour', start.get('hour') + 1);
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
      return {
        change: current - baseline,
        mmr: current,
        date: match.startTime
      };
    });
  
  // var mmr = account.Matches
    // .reduce(function(matchesByDate, match) {
    //   if (matchesByDate.length === 0) return matchesByDate.concat(match);
    //   if (matchesByDate[matchesByDate.length - 1].day === match.day) {
    //     matchesByDate[matchesByDate.length - 1].change += match.change;
    //     return matchesByDate;
    //   } else {
    //     while ((matchesByDate[matchesByDate.length - 1].day + 1) % 7 !== match.day) {
    //       matchesByDate.push({
    //         change: matchesByDate[matchesByDate.length - 1].change,
    //         day: (matchesByDate[matchesByDate.length - 1].day + 1) % 7
    //       });
    //     }
    //     return matchesByDate.concat(match);
    //   }
    // }, []);
  
  changes.username = account.username;
  return changes;
}

module.exports = LeaderChart;
