import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Link, browserHistory} from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import ArtistCard from '../artists/ArtistCard.js';

export default class Home extends TrackerReact(React.Component) {

	constructor() {
		super();
		this.state = {
			subscription: {
				artists: Meteor.subscribe('artists'),
				pages: Meteor.subscribe('pages')
			}
		}
	}

	componentWillUnmount() {
		this.state.subscription.artists.stop();
		this.state.subscription.pages.stop();
	}

	getArtists() {
		return Artists.find({}, {sort: {name: 1}}).fetch();
	}

	getPages() {
		return Pages.find({isInMenu: true}).fetch();
	}

	goToArtist(artist) {
		browserHistory.push('/artists/' + artist._id);
	}

	render() {
		return (
			<div id="home-wrapper" className="container">

				<div className="row">
					<h1>DΛNIEL</h1>
					<h1>KVΛMMEN</h1>
				</div>

				<hr />

				<div className="social-icons row">
					<div className="col-sm-4 col-sm-offset-4 col-xs-12">
						<a target="self" href="http://www.facebook.com/Jansenplateproduksjon"> <i className="mdi mdi-facebook col-xs-4 mdi-24px"></i></a>
						<a target="self" href="http://instagram.com/jansenplateproduksjon"> <i className="mdi mdi-instagram col-xs-4 mdi-24px"></i></a>
						<a target="self" href="https://twitter.com/JansenPlateprod"> <i className="mdi mdi-twitter col-xs-4 mdi-24px"></i></a>
						<hr />
						<a target="self" href="https://soundcloud.com/jansen-plateproduksjon"> <i className="mdi mdi-soundcloud col-xs-4 mdi-24px"></i></a>
						<a target="self" href="http://open.spotify.com/user/jansenplateproduksjon"> <i className="mdi mdi-spotify col-xs-4 mdi-24px"></i></a>
						<a target="self" href="mailto:erik@jansenplateproduksjon.no"> <i className="mdi mdi-mail-ru col-xs-4 mdi-24px"></i></a>
					</div>
				</div>

				<hr />

				<div className="row">

					{this.getArtists().map((artist) => {
						return <ArtistCard key={artist._id} artist={artist} onClick={() => {this.goToArtist(artist)}}/>
					})}

				</div>
			
			</div>
			);
	};
}



