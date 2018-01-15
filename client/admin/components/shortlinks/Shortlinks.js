import React, { Component } from 'react';

import AddShortlink from './AddShortlink';
import ListShortlinks from './ListShortlinks';

class Shortlinks extends Component {
	render () {
		return (
			<div className="container">
				<div className="row">
					<AddShortlink />
					<ListShortlinks />
				</div>
			</div>
		);
	}
}

export default Shortlinks;