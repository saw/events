var React = require('react');
var Nav = React.createClass({

	render: function() {
		return (
			<div>
				<ul>
					<li><a href="/">Home</a></li>
					<li><a href="/about">About</a></li>
					<li><a href="/mynotes">My Notes</a></li>
				</ul>
			</div>
		);
	}
});

module.exports = Nav;