var React = require('react');
var ChartistGraph = require('react-chartist');
var $ = require('jquery');
var moment = require('moment');

var MatchEntry = React.createClass({
  
  getInitialState: function() {
    return { message: '' };
  },

  handleClick: function(e) {
    
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
    }, 'json')
      .fail(function(err) {
        console.log(err);
      });
  },
  
  render: function() {
    var _this = this;
    
    var p = _this.state.message ? (<ul>{Object.keys(_this.state.message).map(function(key) {
      return (<li>{key} - {_this.state.message[key]}</li>);
    })}</ul>) : null;
    
    return (
      <div id="matchForm">
        <form>
          <input type="text" id="accountID" placeholder="Enter account ID" />
          <input type="text" id="matchID" placeholder="Enter match ID" />
          <input type="text" id="mmrChange" placeholder="Enter mmr change" />
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
        {p}
      </div>
    );
  }

});

module.exports = MatchEntry;
