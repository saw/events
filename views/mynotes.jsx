var app;
var React = require('react');
var SignIn = require('../components/SignIn.jsx');
var Nav = require('../components/nav.jsx');
var NoteForm = require('../components/CreateEditNote.jsx');
var MyNotes = require('../components/ListNotes.jsx');

var HelloMessage = React.createClass({

   getInitialState: function() {
      return {};
   },

   componentDidMount: function() {

   },

   render: function() {

      return (
         <div>
            <Nav/>
            <div className="main">
               <h1>Notes?</h1>
               <NoteForm ctx={this.props.ctx}/>
               <MyNotes ctx={this.props.ctx}/>
            </div>
         </div>
      );
   }
});

module.exports = HelloMessage;