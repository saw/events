var app;
var React = require('react');
var SignIn = require('../components/SignIn.jsx');
var Nav = require('../components/nav.jsx');
var NoteForm = require('../components/CreateEditNote.jsx');

var HelloMessage = React.createClass({

   getInitialState: function() {
      return {};
   },

   componentDidMount: function() {

   },

   render: function() {
      var hello, note = '';
      if(this.props.ctx.signedIn)  {
         hello = this.props.ctx.user.displayName;
         note = (<NoteForm ctx={this.props.ctx}/>);
      } else {
         hello = 'stranger';
      }

      return (
         <div>
            <Nav/>
            <div className="main">
               <h1>Hello, {hello}</h1>
               <a href="/about">about</a>
               <SignIn user={this.props.ctx.user}/>
               {note}
            </div>
         </div>
      );
   }
});

module.exports = HelloMessage;