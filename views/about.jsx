var app;
var React = require('react');
var SignIn = require('../components/SignIn.jsx');

var About = React.createClass({

   getInitialState: function() {
      this.props.ctx.stores.userStore.getAllUsers().then(function(res) {
         console.log(res);
      });
      return {};
   },

   componentDidMount: function() {
      // console.log(this.props);
      this.props.ctx.stores.userStore.getAllUsers().then(function(res) {
         console.log(res);
      });
   },

   render: function() {

      return (
         <div>
            <h1>Actually.</h1>
            <p>This is about using react on the server</p>
         </div>
      );
   }
});

module.exports = About;