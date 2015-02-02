var React = require('react');
var SignIn = require('../components/SignIn.jsx');
var Nav = React.createClass({

	render: function() {
		return (
			<div className="header">
				<div className="nav pure-menu pure-menu-open pure-menu-horizontal">
					<ul>
						<li><a href="/">Home</a></li>
						<li><a href="/about">About</a></li>
						<li><a href="/mynotes">My Notes</a></li>
						<li><SignIn user={this.props.ctx.user}/></li>
					</ul>
				</div>
			</div>
		);
	}
});

module.exports = Nav;