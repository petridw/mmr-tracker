var React = require('react');
var ChartistGraph = require('react-chartist');
var $ = require('jquery');
var moment = require('moment');

var MatchEntry = React.createClass({
  
  getInitialState: function() {
    return { message: '' };
  },
  
  handleSubmit: function(e) {
    e.preventDefault();
    var _this = this;
    
    var payload = {
      matchID: $('#matchID').val(),
      accountID: $('#accountID').val(),
      mmrChange: parseInt($('#mmrChange').val())
    };
    
    console.log(payload);
    
    $.post('/api/match/', payload, function(data) {
      $('#matchID').val('').focus();
      // $('accountID').text('');
      $('#mmrChange').val('');
      
      console.log(data);
      _this.setState({ message: data });
      _this.props.update();
    }, 'json')
      .fail(function(err) {
        console.log(err);
      });
  },
  
  render: function() {
    var _this = this;
    
    console.log(this.props.accounts);
    
    var p = _this.state.message ? (<ul>{Object.keys(_this.state.message).map(function(key, index) {
      return (<li key={index}>{key} - {_this.state.message[key]}</li>);
    })}</ul>) : null;
    
    var diffs = (<table><thead><tr><td>netChangeErr</td></tr></thead><tbody>{_this.props.accounts.map(function(account, index) {
      return <tr key={index}><td>{account.username}</td><td>{account[account.length - 1].netChangeErr}</td></tr>;
    })}</tbody></table>);
    
    return (
      <div id="matchForm">
        <form>
          <input type="text" id="accountID" placeholder="Enter account ID" />
          <input type="text" id="matchID" placeholder="Enter match ID" />
          <input type="text" id="mmrChange" placeholder="Enter mmr change" />
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
        {diffs}
        {p}
      </div>
    );
  }

});

module.exports = MatchEntry;
