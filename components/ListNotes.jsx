
var React = require('react');
var Note = require('./Note.jsx');
var ListNotes = React.createClass({

   getInitialState: function() {
      return {
         filter:'',
         notes:this.props.ctx.stores.noteStore.getCachedNotesForUser(this.props.ctx.user._id)
      }
      
   },

   notesChanged: function() {
      var self = this;
      this.setState({notes:this.props.ctx.stores.noteStore.getCachedNotesForUser(self.props.ctx.user._id)});
   },

   componentDidMount: function() {
      this.props.ctx.stores.noteStore.on('change', this.notesChanged);
   },

   filter: function (e) {
      this.setState({
         filter:e.target.value
      });
   },

   render: function() {
      var output = [];
      var useFilter = this.state.filter ? true : false;
      var x = Math.random();
      if(this.state.notes) {
         var self = this;

         this.state.notes.forEach(function(note) {
               if(!self.state.filter || note.body.indexOf(self.state.filter) !== -1){
                  output.push(<Note note={note} highlight={self.state.filter}/>);   
               }
         });
      }

      return (
         <div>
            <form>
               <label for="filter">Search:</label>
               <input onChange={this.filter} type="text" name="filter" placeholder="find"/>
            </form>
            {output}
         </div>
      );
   }
});

module.exports = ListNotes;