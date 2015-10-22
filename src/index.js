var React = require('react');
var ReactDOM = require('react-dom');
var AccountList = require('./components/AccountList');
var LeaderChart = require('./components/LeaderChart');
var MatchEntry = require('./components/MatchEntry');

// TODO: Add in match entry form if certain route parameters are met

var Main = React.createClass({
  render: function() {
    return (
      <main>
        <div id="leaderChart">
          <LeaderChart />        
        </div>
      </main>
    );
  }
});

ReactDOM.render(<Main />, document.getElementById('mmrapp'));
