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
            <Nav ctx={this.props.ctx}/>
            <div className="main pure-g">
               <div className="pure-u-1">
                  <h1>My Notes</h1>
               </div>
               <div className="pure-u-1 pure-u-md-1-3 pure-u-lrg-1-4">
                  <div><NoteForm ctx={this.props.ctx}/></div>
               </div>
               <div className="pure-u-1 pure-u-md-2-3 pure-u-lrg-3-4">
                  <MyNotes ctx={this.props.ctx}/>
               </div>
            </div>
         </div>
      );
   }
});

module.exports = HelloMessage;