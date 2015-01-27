var app;
var React = require('react');
var SignIn = require('../components/SignIn.jsx');

var HelloMessage = React.createClass({

   getInitialState: function() {
      return {};
   },

   componentDidMount: function() {

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
            <a href="/about">about</a>
            <SignIn user={this.props.ctx.user}/>
            <button onClick={this.doStuff}>Stuff</button>
         </div>
      );
   }
});

module.exports = HelloMessage;