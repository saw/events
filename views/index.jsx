var app;
var React = require('react');
var SignIn = require('../components/SignIn.jsx');

var HelloMessage = React.createClass({

   getInitialState: function() {
      console.log('props', this.props.ctx);
      return {};
   },

   componentDidMount: function() {
      console.log('reacting to awesomeness');
   },

   render: function() {
      var hello;
      if(this.props.ctx.signedIn)  {
         hello = this.props.ctx.user.displayName;
      } else {
         hello = 'stranger';
      }
      return (
         <div>
            <h1>Hello, {hello}</h1>
            <SignIn user={this.props.ctx.user}/>
            <button onClick={this.doStuff}>Stuff</button>
         </div>
      );
   }
});

module.exports = function(clientApp) {
   app = clientApp;
   return HelloMessage;
}