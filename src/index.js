var React = require('react');
var ReactDOM = require('react-dom');
var AccountList = require('./components/AccountList');
var LeaderChart = require('./components/LeaderChart');

var Main = React.createClass({
  render: function() {
    return (
      <LeaderChart />
    );
  }
});

ReactDOM.render(<Main />, document.getElementById('mmrapp'));
