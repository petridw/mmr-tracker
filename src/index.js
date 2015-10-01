var React = require('react');
var AccountList = require('./components/AccountList');

var Main = React.createClass({
  render: function() {
    return (
      <main>
        <h1>the novlovplov challenge</h1>
        <AccountList />
      </main>
    );
  }
});

React.render(<Main />, document.body);
