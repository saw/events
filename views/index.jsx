var app;
var React = require('react');


var HelloMessage = React.createClass({

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