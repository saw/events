
var React = require('react');

var ListNotes = React.createClass({

   getInitialState: function() {
      return null;
   },



   render: function() {
      // using unsafe stuff here,
      // this is just a demo, so whatever,
      // but I do strip tags on write of body and title.
      var output = [];
      var note = this.props.note;
      var cl = "note";
      var body = note.body;
      var title = note.title;

      cl += note.pending ?  ' pending' : '';

      if(this.props.highlight) {
        body = body.replace(new RegExp('('+this.props.highlight+')', 'gi'), '<span class="highlight">$1</span>');
      }

      return (
         <div className={cl}>
            <h3>{title}</h3>
            <p dangerouslySetInnerHTML={{__html: body}}></p>
         </div>
      );
   }
});

module.exports = ListNotes;