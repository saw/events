
var React = require('react');

var ListNotes = React.createClass({

   getInitialState: function() {
      var self = this;
      return {
         notes:this.props.ctx.stores.noteStore.getCachedNotesForUser(self.props.ctx.user._id)
      }
   },

   notesChanged: function() {
      var self = this;
      console.log(15, this.props.ctx.stores.noteStore.getCachedNotesForUser(self.props.ctx.user._id));
      this.setState({notes:this.props.ctx.stores.noteStore.getCachedNotesForUser(self.props.ctx.user._id)});
   },

   componentDidMount: function() {
      console.log('did mount');
      this.props.ctx.stores.noteStore.on('change', this.notesChanged);
   },

   render: function() {
      var output = [];
      if(this.state.notes) {
         this.state.notes.forEach(function(note) {
            output.push(<dt>{note.title}</dt>);
            output.push(<dd>{note.dateCreate}</dd>);
         });
      }

      return (
         <div>
            <dl>{output}</dl>
            <pre>{this.state.notes.length}</pre>
         </div>
      );
   }
});

module.exports = ListNotes;