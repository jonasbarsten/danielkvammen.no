import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import VivusContainer from '../../shared/components/utilities/VivusContainer.js';

class NavBar extends Component {

	goBack () {
		browserHistory.goBack();
	}

	render() {
		return (
			<div id="back-button">
				<VivusContainer duration={50}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" onClick={this.goBack.bind(this)}>
						<path 
							d="M160,256L313.594,96L352,141.718L236.813,256L352,370.281L313.594,416L160,256z"
							stroke="black" 
							strokeMiterlimit="10"
							strokeWidth="10"
							fill="none"
						/>
					</svg>
				</VivusContainer>
			</div>
		);
	}

}

export default NavBar;

