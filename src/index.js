var React = require('react');
var AccountList = require('./components/AccountList');

var Main = React.createClass({
  render: function() {
    return (
      <AccountList />
    );
  }
});

React.render(<Main />, document.getElementById('mmrapp'));
