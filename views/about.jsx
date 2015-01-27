var app;
var React = require('react');
var SignIn = require('../components/SignIn.jsx');

var About = React.createClass({

   getInitialState: function() {
      return {};
   },

   componentDidMount: function() {

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