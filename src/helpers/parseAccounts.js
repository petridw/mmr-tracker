var moment = require('moment');
var cloneDeep = require('lodash/lang/cloneDeep');

function parseAccounts(accounts, options) {
  var unit = options.unit || 'week';
  var times = makeTimes("2015-09-25T08:00:00.000Z", unit);
  
  return accounts.map(function(account) {
    return parseAccount(account, cloneDeep(times), unit);
  });
}

function parseAccount(account, time_units, unit) {
  var startTime;
  var unitTime;
  var match;
  var time;
  var time_units_with_totals;
  
  for (var i = 0; i < account.Matches.length; i ++) {
    match = account.Matches[i];
    startTime = moment(match.startTime);
    
    for (var ii = 0; ii < time_units.length; ii ++) {
      unitTime = moment(time_units[ii].time);
      unitTime.set('date', unitTime.get('date') - 1);
      
      if (startTime.isSame(unitTime, unit)) {
        time_units[ii].matches.push(match);
      }
    }
  }
  
  time_units_with_totals = time_units.reduce(function(acc, current, index) {
    var mmrChangeSum = current.matches.reduce(function(total, match){
      return total + match.mmrChange;
    }, 0);
    if (index === 0) {
      current.endingMMR = account.startingMMR + mmrChangeSum;
      current.netChange = mmrChangeSum;
    } else if (index === time_units.length - 1) {
      current.endingMMR = account.currentMMR;
      current.netChange = account.currentMMR - account.startingMMR;
      current.netChangeErr = current.netChange - (acc[acc.length - 1].netChange + mmrChangeSum);
    } else {
      current.endingMMR = acc[acc.length - 1].endingMMR + mmrChangeSum;
      current.netChange = acc[acc.length - 1].netChange + mmrChangeSum;
    }
    return acc.concat(current);
  }, []);
  
  time_units_with_totals.username = account.username;
  time_units_with_totals.accountID = account.accountID;
  return time_units_with_totals;
}

function makeTimes(start, unit) {
  var now = moment();
  start = moment(start);
  var result = [];
    
  while (start.isBefore(now)) {
    result.push({
      time: start.format(),
      matches: []
    });
    start.set(unit, start.get(unit) + 1);
  }
  
  return result;
}

module.exports = parseAccounts;
