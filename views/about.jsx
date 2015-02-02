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
            <Nav ctx={this.props.ctx}/>
            <div className="main pure-g">
               <div className="pure-u-1 pure-u-md-2-3 pure-u-lrg-1-2">
                  <h1>Actually</h1>
                  <p>This is about using react on the server</p>
                  <p>Registered users:</p>
                  <ul>{this.state.users.map(createItem)}</ul>
               </div>
            </div>
         </div>
      );
   }
});

module.exports = About;