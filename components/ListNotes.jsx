
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
            var cl = note.pending ?  'pending' : '';
            console.log(note);
            output.push(<dt className={cl}>{note.title}</dt>);
            output.push(<dd className={cl}>{note.body}</dd>);
         });
      }

      return (
         <div>
            <dl>{output}</dl>
         </div>
      );
   }
});

module.exports = ListNotes;