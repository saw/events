
var React = require('react');

var SignIn = React.createClass({

   getInitialState: function() {
      var user = this.props.user;
      return {
         signedIn : user ? true : false,
         user: user
      };
   },


   render: function() {
      var output = '';

      if(this.state.signedIn) {
         output = <p>You are signed in</p>;
      } else {
         output = <p><a href="/login">login</a></p>;
      }
      return (
         <div>{output}</div>
      );
   }
});

module.exports = SignIn;