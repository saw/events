var app;
var React = require('react');
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
         note = (<div className="pure-u-1 pure-u-md-1-3 pure-u-lrg-1-4"><NoteForm ctx={this.props.ctx}/></div>);
      } else {
         hello = 'stranger';
      }

      return (
         <div>
            <Nav ctx={this.props.ctx}/>
            <div className="main pure-g">
               {note}
               <div className="pure-u-1 pure-u-md-2-3 pure-u-lrg-1-4">
                  <h1>Hello, {hello}</h1>
                  <p>This is an example of an isomorphic app with react. This app lets you create notes. Then you can look at them.</p>
               </div>
            </div>
         </div>
      );
   }
});

module.exports = HelloMessage;