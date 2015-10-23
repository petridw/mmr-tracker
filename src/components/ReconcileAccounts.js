var React = require('react');
var $ = require('jquery');
var moment = require('moment');

var AccountForm = require('./AccountForm');

var ReconcileAccounts = React.createClass({
  
  getInitialState: function() {
    return { selected: null };
  },
  
  getMatchHistory: function(account) {
    var _this = this;
    
    $.get('/api/matchHistory/' + account.accountID, function(data) {

      var validMatches = data.filter(function(match) {
        return (match.lobby_type === 7 || match.lobby_type === 6) && (moment(parseInt(match.start_time) * 1000).isAfter(moment("2015-09-25T08:00:00.000Z")));
      });
      
      account.rankedMatches = validMatches;
      _this.setState({ selected: account });
    });
  },
  
  handleClick: function(account) {
    console.log(account);
    this.getMatchHistory(account);
    // this.setState({ selected: account });
  },
  
  render: function() {
    var _this = this;
    
    var buttons = this.props.accounts.map(function(account, index) {
      return (
        <button key={index} onClick={_this.handleClick.bind(null, account)}>{account.username}</button>
      );
    });
    
    var selected = this.state.selected ? <AccountForm account={this.state.selected} /> : <div className="emptyForm"></div>;
    
    return (
      <div id="reconcileControl">
        {selected}
        {buttons}
      </div>
    );
  }

});

module.exports = ReconcileAccounts;
