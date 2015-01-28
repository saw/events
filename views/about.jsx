var app;
var React = require('react');
var SignIn = require('../components/SignIn.jsx');
var Nav = require('../components/nav.jsx');

var About = React.createClass({

   getInitialState: function() {
      return {
         users:[]
      };
   },

   componentDidMount: function() {
      // console.log(this.props);
      var self = this;
      this.props.ctx.stores.userStore.getAllUsers().then(function(res) {
         self.setState({users:res});
      });
   },

   render: function() {

      var users = this.state.users;
      var createItem = function(user) {
         return <li>{user.displayName}</li>;
      };

      return (
         <div>
            <Nav/>
            <div className="main">
               <h1>Actually.</h1>
               <p>This is about using react on the server</p>
               <p>Registered users:</p>
               <ul>{this.state.users.map(createItem)}</ul>
            </div>
         </div>
      );
   }
});

module.exports = About;