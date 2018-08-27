import React, {Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {browserHistory, Link} from 'react-router';
import Masonry from 'react-masonry-component';
import swal from 'sweetalert2';
// import _ from 'lodash';

import ReleaseCard from '../../../shared/components/releases/ReleaseCard.js';
import BarstenViewer from '../../../shared/components/utilities/BarstenViewer.js';
import Preloader from '../../../shared/components/preloader/Preloader.js';

import ArtistEvents from './ArtistEvents.js';
import ArtistEventsBIT from './ArtistEventsBIT.js';


class ArtistSingle extends Component {

	goToRelease(release) {
		browserHistory.push('/releases/' + release._id);
	}

	goToLink(link) {
		browserHistory.push(link.url);
	}

	subscribeToNewsletter () {

		swal({
			title: 'Skriv inn epostadresse',
			input: 'email'
		}).then(function (email) {

			var subscriber = {
				email: email
			};

			Meteor.call('subscribeToNewsletter', subscriber, (err, res) => {
				if (err) {
					console.log(err);
				} else {
					swal({
						type: 'success',
						html: 'Vi holder deg oppdatert på: ' + email
					});
				}
			});
		}).catch(swal.noop);
	}

	render () {

		// Show loading while waiting for subscriptions
		if (!this.props.artist) {
			return <Preloader />
		}

		let artist = this.props.artist;
		artist.bandsintownName = "Daniel Kvammen";
		const songkickUpcoming = (artist && artist.songkickId) ? <div><hr /><ArtistEvents songkickId={artist.songkickId} /></div> : '';
		const bandsintown = (artist && artist.bandsintownName) ? <div><hr /><ArtistEventsBIT bandsintownName={artist.bandsintownName} /></div> : '';
		// const songkickPast = (artist && artist.songkickId) ? <div><ArtistEvents songkickId={artist.songkickId} scope="past" /><hr /></div> : '';
		var links = (artist && artist.links) ? artist.links : [];

		// Sort links
		links = _.sortBy(links, 'sortIndex');

		const linksHr = links.length != 0 ? <hr /> : '';

		var banner = '';

		if (artist) {
			if (artist.bannerType == 'picture') {
				// banner = <img src={artist.imageUrl} className="img-responsive" />
				banner = <img src="/images/banner.jpg" className="img-responsive" />
			}

			if (artist.bannerType == 'text') {
				banner = 
					<div className="text-banner">
						<div className="v-align">
							<h1>{artist.bannerText}</h1>
						</div>
					</div>
					
			}

			if (artist.bannerType == 'youtube') {

				const src = '//www.youtube.com/embed/' + artist.bannerYouTube + '?controls=0&modestbranding="1"&showinfo=0';

				banner = 
					<div>
						<div className="embed-responsive embed-responsive-16by9">
							<iframe className="embed-responsive-item" src={src}></iframe>
						</div>
						<div className="video-banner-bottom"></div>
					</div>
			}		
		}

		const masonryOptions = {
    		transitionDuration: 0
		};

		return (
			<div id="artistEdit">
				
				<div key={artist._id}>

					<div className="artist-banner">
						{banner}
					</div>

					<div className="container-fluid no-side-padding">

						
						
						<div className="container no-side-padding">

							<div className="artist-single-content">

								{linksHr}

								<div className="row link-list">
									{links.map((link) => {

										var target = "_blank";

										// Behavior if link is on same host
										if (link.isLocal) {
											target = '';
										}

										return (
											<div key={link.id} className="col-sm-4 col-xs-6">
												<Link target={target} to={link.url}>{link.name}</Link>
											</div>
										);
									})}
								</div>

								{bandsintown}

								<hr />

								<div className="row">

									<div onClick={this.subscribeToNewsletter.bind(this)} className="subscribe-container">
										NYHETSBREV
									</div>

								</div>

								<hr />

					            <Masonry
					            	className={'artist-single-releases'} // default '' 
					            	elementType={'div'} // default 'div'
					            	options={masonryOptions}
					            	disableImagesLoaded={false} // default false 
					            	updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false 
					            >
									{this.props.releases.map((release) => {
										return <ReleaseCard key={release._id} release={release} onClick={() => {this.goToRelease(release)}}/>
									})}
								</Masonry>

								<hr />

							</div>
							
						</div>

					</div>

				</div>
					
				
			</div>
		);
	}
}

export default createContainer(() => {
	Meteor.subscribe('artists');
	Meteor.subscribe('releases');

	return {
		artist: Artists.find().fetch()[0],
		releases: Releases.find({}, {sort: {releaseDate: -1}}).fetch(),
	};
}, ArtistSingle);