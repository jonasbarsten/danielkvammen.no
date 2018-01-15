import React, {Component} from 'react';

import NavBar from './NavBar.js';

export default class FrontLayout extends Component {
	render() {
		return (
			<div id="front-layout">
				<NavBar />
				{this.props.children}
			</div>
		);
	}
}