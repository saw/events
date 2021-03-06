
var React = require('react');

var CreateEditNote = React.createClass({

   getInitialState: function() {
      var note;
      if(this.props.selectedNote) {
         return selectedNote
      } else {
             return {
                  title:'',
                  body:''
            }
      }
   },

   handleFormChange: function(e) {

      if(e.target.name === 'title') {
         this.setState({title:e.target.value});
      } else {
         this.setState({body:e.target.value});
      }
   },

   handleSubmit: function(e) {
      e.preventDefault();
      this.props.ctx.stores.noteStore.addNote({
         title: this.state.title,
         body: this.state.body
      });
      this.setState({
         title:'',
         body:''
      });

   },


   render: function() {
      var output = '';
      return (
         <div>
            <form onSubmit={this.handleSubmit}>
               <p><input type="text" onChange={this.handleFormChange} name="title" placeholder="title" value={this.state.title}/></p>
               <p><textarea onChange={this.handleFormChange} name="body" value={this.state.body}></textarea></p>
               <input type="submit" value="submit"/>
            </form>
         </div>
      );
   }
});

module.exports = CreateEditNote;