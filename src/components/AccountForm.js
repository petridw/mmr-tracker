var React = require('react');
var $ = require('jquery');
var moment = require('moment');

var AccountForm = React.createClass({
  
  getInitialState: function() {
    return { active: 0 };
  },
  
  handleSubmit: function(e) {
    console.log('submitting data..');
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
    
    var matches = this.props.account.Matches.map(function(match, index) {
      if (index === _this.state.active) {
        return (
          <li key={index} >
            <form>
              <input type="text" id="accountID" placeholder="Enter account ID" readOnly="true" value={_this.props.account.accountID} />
              <input type="text" id="matchID" placeholder="Enter match ID" readOnly="true" value={match.matchID} />
              <input type="text" id="startTime" placeholder="Enter hero" value={match.hero} />
              <input type="text" id="hero" placeholder="Enter startTime" readOnly="true" value={match.startTime} />
              <input type="text" id="mmrChange" placeholder="Enter mmr change" readOnly="true" value={match.mmrChange} />
              <button onClick={_this.handleSubmit}>Submit</button>
            </form>
          </li>
        );
      } else {
        return (
          <li key={index} onClick={_this.changeSelected.bind(null, index)}>
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
              {this.props.account.username}
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
