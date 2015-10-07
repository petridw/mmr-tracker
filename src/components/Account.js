var React = require('react');

var Account = React.createClass({
  
  render: function() {
    return (
      <li>
        <ul className="account">
          <li>Account ID: {this.props.account.accountID}</li>
          <li>Steam username: {this.props.account.username}</li>
          <li>Starting MMR: {this.props.account.startingMMR}</li>
          <li>Current MMR: {this.props.account.currentMMR}</li>
        </ul>
      </li>
    );
  }
  
});

module.exports = Account;
