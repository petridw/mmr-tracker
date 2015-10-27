var React = require('react');
var $ = require('jquery');
var moment = require('moment');

var AccountForm = React.createClass({
  
  getInitialState: function() {
    return { active: 0 };
  },
  
  handleSubmit: function(e) {
    e.preventDefault();
    console.log('submitting data..');
    
    var update_data = {
      matchID: $('#updateMatchID').val(),
    };
    
    if ($('#updateHero').val()) update_data.hero = $('#updateHero').val();
    if ($('#updateMmrChange').val()) update_data.mmrChange = $('#updateMmrChange').val();
    
    this.updateMatch(update_data);
  },
  
  changeSelected: function(index) {
    this.setState({ active: index });
  },
  
  updateMatch: function(formData) {
    var _this = this;
    
    // console.log(`gettin data for ${account.username}`);
    
    $.ajax('/api/match/', {
      accepts: 'application/json',
      method: 'PUT',
      data: formData
    }, function(data) {
      console.log(data);
    });
  },
  
  createMatch: function(formData) {
    var _this = this;
    
    // console.log(`gettin data for ${account.username}`);
    
    $.ajax('/api/match/', {
      accepts: 'application/json',
      method: 'POST',
      data: formData
    }, function(data) {
      console.log(data);
    });
  },
  
  render: function() {
    var _this = this;
    
    var diff = 0;
    var matches = this.props.account.Matches
      .slice()
      .sort(function(a, b) {
        if (moment(a.startTime).isBefore(b.startTime)) return 1;
        else return -1;
      })
      .map(function(match, index) {
        var className;
        
        diff += match.mmrChange;
        
        var isRanked = _this.props.account.rankedMatches.some(function(m) {
          // compare string to number
          return m.match_id == match.matchID;
        });
        
        if ((match.mmrChange > 25) || 
            (match.mmrChange < 20 && match.mmrChange > -20) ||
            (match.mmrChange < -30)) {
          className = 'fixMMR';
        } else {
          className = '';
        }
        
        className += isRanked ? '' : ' notRanked';
        
        if (index === _this.state.active) {
          return (
            <li key={index} className={className} >
              <form>
                <input type="text" id="updateAccountID" placeholder="Enter account ID" readOnly="true" value={_this.props.account.accountID} />
                <input type="text" id="updateMatchID" placeholder="Enter match ID" readOnly="true" value={match.matchID} />
                <input type="text" id="updateHero" placeholder={"hero: " + match.hero} />
                <input type="text" id="updateStartTime" placeholder="Enter startTime" readOnly="true" value={match.startTime} />
                <input type="text" id="updateMmrChange" placeholder={"mmrChange: " + match.mmrChange} />
                <button onClick={_this.handleSubmit}>Submit</button>
              </form>
            </li>
          );
        } else {
          return (
            <li key={index} className={className} onClick={_this.changeSelected.bind(null, index)}>
              {match.matchID}
            </li>
          );  
        }
      });
    
    var history = this.props.account.rankedMatches.map(function(match, index) {
      
      var haveMatch = _this.props.account.Matches.some(function(m) {
        // compare string to number
        return m.matchID == match.match_id;
      });
      
      var className = haveMatch ? 'haveMatch' : 'needMatch';
      
      return (
        <tr key={index} className={className}>
          <td>{match.match_id}</td>
          <td><a href={"http://www.dotabuff.com/matches/" + match.match_id} target="_blank">dotabuff</a></td>
          <td>{match.start_time}</td>
        </tr>
      );
    });
    
    return (
      <div id="reconcileForm">
        <div className="component">
          <h2>
            <a href={"http://www.dotabuff.com/players/" + this.props.account.accountID.substring(1)} target="_blank">
              {this.props.account.username} - <span className="netErr">{this.props.account.currentMMR - this.props.account.startingMMR - diff}</span>
            </a>
          </h2>
          <h3>Have</h3>
          <ul>
            {matches}
          </ul>
        </div>
        <div className="component">
          <h3>History</h3>
          <table>
            <thead>
              <tr>
                <td>Match ID</td>
                <td>Dotabuff Link</td>
                <td>Start Time</td>
              </tr>
            </thead>
            <tbody>
              {history}            
            </tbody>
          </table>
        </div>
      </div>
      
    );
  }

});

module.exports = AccountForm;
