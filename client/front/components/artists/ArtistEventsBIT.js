import React, { Component } from 'react';

class ArtistEventsBIT extends Component {

	state = {
		content: null
	}

	componentDidMount () {

		// TODO: load events when returning to component, now it only loads once
		const content = 
			<a className="bit-widget-initializer"
				data-artist-name={this.props.bandsintownName} 
				data-display-local-dates="false" 
				data-display-past-dates="false" 
				data-auto-style="true" 
				data-display-limit="" 
				data-display-logo="false" 
				data-display-past-dates="false" 
				data-widget-width="100%"
			></a>;

		this.setState({
			content: content
		});

		// this.getData();

		// var x = document.createElement("A");

		// x.setAttribute("class", "bit-widget-initializer");
		// x.setAttribute("data-artist-name", this.props.bandsintownName);
		// x.setAttribute("data-display-local-dates", "false");
		// x.setAttribute("data-display-past-dates", "false");
		// x.setAttribute("data-auto-style", "true");
		// x.setAttribute("data-display-limit", "");
		// x.setAttribute("data-display-logo", "false");
		// x.setAttribute("data-display-past-dates", "false");
		// x.setAttribute("data-widget-width", "100%");

		// document.getElementById("bands-in-town-wrapper").appendChild(x);

		// // document.getElementById("bands-in-town-wrapper").innerHTML = 
		// // 	<a 
		// // 		className="bit-widget-initializer" 
		// // 		data-artist-name={this.props.bandsintownName} 
		// // 		data-display-local-dates="false" 
		// // 		data-display-past-dates="false" 
		// // 		data-auto-style="true" 
		// // 		data-display-limit="" 
		// // 		data-display-logo="false" 
		// // 		data-display-past-dates="false" 
		// // 		data-widget-width="100%"
		// // 	></a>

		// $('#bands-in-town-wrapper').append(
		// 	`<a class="bit-widget-initializer"
		// 		data-artist-name=${this.props.bandsintownName} 
		// 		data-display-local-dates="false" 
		// 		data-display-past-dates="false" 
		// 		data-auto-style="true" 
		// 		data-display-limit="" 
		// 		data-display-logo="false" 
		// 		data-display-past-dates="false" 
		// 		data-widget-width="100%"
		// 	></a>`
		// );
	}

	getData () {

		// console.log('boom');

		// var x = document.createElement("A");

		// x.setAttribute("class", "bit-widget-initializer");
		// x.setAttribute("data-artist-name", this.props.bandsintownName);
		// x.setAttribute("data-display-local-dates", "false");
		// x.setAttribute("data-display-past-dates", "false");
		// x.setAttribute("data-auto-style", "true");
		// x.setAttribute("data-display-limit", "");
		// x.setAttribute("data-display-logo", "false");
		// x.setAttribute("data-display-past-dates", "false");
		// x.setAttribute("data-widget-width", "100%");

		// document.getElementById("bands-in-town-wrapper").appendChild(x);
	}

	render () {



		// const wrapper = document.getElementById("bands-in-town-wrapper");

		// const content = 
		// 	<a className="bit-widget-initializer"
		// 		data-artist-name={this.props.bandsintownName} 
		// 		data-display-local-dates="false" 
		// 		data-display-past-dates="false" 
		// 		data-auto-style="true" 
		// 		data-display-limit="" 
		// 		data-display-logo="false" 
		// 		data-display-past-dates="false" 
		// 		data-widget-width="100%"
		// 	></a>;

		// if (wrapper) {
		// 	console.log('boom');
		// 	$('#bands-in-town-wrapper').append(
		// 		`<a class="bit-widget-initializer"
		// 			data-artist-name=${this.props.bandsintownName} 
		// 			data-display-local-dates="false" 
		// 			data-display-past-dates="false" 
		// 			data-auto-style="true" 
		// 			data-display-limit="" 
		// 			data-display-logo="false" 
		// 			data-display-past-dates="false" 
		// 			data-widget-width="100%"
		// 		></a>`
		// 	);
		// }

		// let x = null;

		// if (wrapper) {
		// 	const children = wrapper.childNodes;
		// 	console.log(children.length);
		// 	if (children.length == 0) {
		// 		x = document.createElement("A");

		// 		x.setAttribute("class", "bit-widget-initializer");
		// 		x.setAttribute("data-artist-name", this.props.bandsintownName);
		// 		x.setAttribute("data-display-local-dates", "false");
		// 		x.setAttribute("data-display-past-dates", "false");
		// 		x.setAttribute("data-auto-style", "true");
		// 		x.setAttribute("data-display-limit", "");
		// 		x.setAttribute("data-display-logo", "false");
		// 		x.setAttribute("data-display-past-dates", "false");
		// 		x.setAttribute("data-widget-width", "100%");

		// 		// document.getElementById("bands-in-town-wrapper").appendChild(x);
		// 		// this.getData();
		// 		// console.log('gogo');
		// 	}
		// }

		return (
			<div id="bands-in-town-wrapper">
				{this.state.content}
			</div>
		);
	}
}

export default ArtistEventsBIT;