var app;
var React = require('react');


var HelloMessage = React.createClass({

   getInitialState: function() {
      console.log('props', this.props.magic);
      return {};
   },

   componentDidMount: function() {
      console.log('reacting to awesomeness');
   },

   render: function() {

      return (
         <div>
            <h1>Hello World</h1>
            <button onClick={this.doStuff}>Stuff</button>
         </div>
      );
   }
});

module.exports = function(clientApp) {
   app = clientApp;
   return HelloMessage;
}