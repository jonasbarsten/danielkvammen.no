import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {Link} from 'react-router';
import moment from 'moment';
import _ from 'lodash';

import Preloader from '../../../shared/components/preloader/Preloader.js';

import BarstenViewer from '../../../shared/components/utilities/BarstenViewer.js';

class ReleaseSingle extends Component {

	componentDidMount() {

		if (navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)) {           
            window.scrollTo(0,0);
        } else {
        	$(window).scrollTop();
        }
	}

	goToLink(link) {
		browserHistory.push(link.url);
	}

	getLinks() {
		const release = this.getRelease();

		if (release[0] == undefined) {
			return [];
		}

		if (release[0].links) {

			var links = release[0].links;
			var sortedLinks = _.sortBy(links, 'sortIndex');

			return sortedLinks;

		} else {
			return [];
		}
		
	}

	parseDate(ISOdate) {

		const date = moment(ISOdate).format('YYYY-MM-DD');
		return date;

	}

	render () {

		const release = this.props.release;
		const tracks = this.props.tracks;

		if (!release || !tracks) {
			return <Preloader />
		}

		const about = (
			release.about && 
			release.about.editorState &&
			release.about.editorState.blocks[0] &&
			release.about.editorState.blocks[0].text !== ""
			) ? <div><hr /><BarstenViewer content={release.about} placeholder='No about text yet ...'/></div> : '';

		var links = release.links;
		links = _.sortBy(links, 'sortIndex');

		const linksHr = links.length != 0 ? <hr /> : '';

		return (
			<div id="releaseEdit">

				<div key={release._id}>

					<div className="container-fluid no-side-padding">

						<div className="release-banner">
							<img src={release.imageUrl} className="img-responsive" />
						</div>

						<div className="clearfix"></div>
						
						<div className="container no-side-padding">

							<div className="release-single-content">

								<div className="text-center">
									<h2>{release.name}</h2>
								</div>

								<div className="row">
									<div className="col-xs-6 text-capitalize blue-text">
										{release.albumType}
									</div>
									<div className="col-xs-6 text-right blue-text">
										{this.parseDate(release.releaseDate)}
									</div>
								</div>

								{linksHr}

								<div className="row link-list">
									{links.map((link) => {

										var target = "_blank";

										// Behavior if link is on same host
										if (link.isLocal) {
											target = '';
										}

										return (
											<div key={link.id} className="col-sm-4">
												<Link target={target} to={link.url}>{link.name}</Link>
											</div>
										);
									})}
								</div>

								{about}

								<hr />	

								<div className="track-list">									

									{tracks.map((track) => {

										const target = (track.link && track.link.isLocal) ? '' : '_blank';

										const link = (track.link && track.link.url) ? <Link className="track-has-lyrics" to={track.link.url} target={target}><span>LYRICS</span></Link> : '';

										let duration = '';

										if (track.duration) {
											var x = track.duration / 1000;
											let seconds = Math.round(x % 60);
											seconds = ("0" + seconds).slice(-2);
											x = x / 60;
											let minutes = Math.round(x % 60);
											minutes = ("0" + minutes).slice(-2);

											duration = minutes + ':' + seconds;
										}

										return (
											
											<div key={track._id} className="row track-row">
												<div className="col-xs-5 col-sm-3">
													<div className="row">
														<div className="col-xs-5">
															{track.trackNumber}
														</div>
														<div className="col-xs-6">
															{link}
														</div>
													</div>
												</div>
												<div className="col-xs-7 col-sm-9">
													{track.name}
													<span className="pull-right">{duration}</span>
												</div>
												
											</div>
											
										);
									})}
								</div>

								<hr />

							</div>
							
						</div>

					</div>

				</div>

			</div>
		);
	}
}

export default createContainer((params) => {
	Meteor.subscribe('releases');
	Meteor.subscribe('tracks');

	return {
		tracks: Tracks.find({release: params.routeParams.releaseId}, {sort: {trackNumber: 1}}).fetch(),
		release: Releases.find({_id: params.routeParams.releaseId}).fetch()[0],
	};
}, ReleaseSingle);