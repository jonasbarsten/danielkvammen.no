import React, {Component} from 'react';

import ReleaseCard from '../../../shared/components/releases/ReleaseCard.js';

export default class AddReleaseFromSpotify extends Component {

	constructor(props) {
		super(props);
		this.state = {
			releases: []
		}
	}

	handleSubmit(event) {
		event.preventDefault();

		var fetchReleases = (query) => {
		    $.ajax({
		        url: 'https://api.spotify.com/v1/search',
		        data: {
		            q: 'album:' + query,
		            type: 'album',
		            limit: 50
		        },
		        success: (response) => {

		            this.setState({
		            	releases: response.albums.items
		            })
		        }
		    });
		};

		fetchReleases(this.refs.releaseSearch.value);
	}

	addRelease (selectedRelease) {

		$.ajax({
			url: 'https://api.spotify.com/v1/albums/' + selectedRelease.id,
			success: (release) => {

        		var newRelease = {
        			name: release.name,
        			releaseDate: release.release_date,
        			releaseDatePrecision: release.release_date_precision,
        			lastChanged: new Date,
        			albumType: release.album_type,
        			spotifyRaw: release
        		}

				if (this.props.artistId) {
					newRelease.artists = [this.props.artistId];
				}

        		if (release.images[0] != undefined) {
					newRelease.imageUrl = release.images[0].url;
				} else {
					newRelease.imageUrl = 'http://placehold.it/640x640?text=No+Image';
				}

				// If release name and albumType already exists, do not add, but push artistId to artists array if not already there

        		Meteor.call('addRelease', newRelease, (err, res) => {
        			if (err) {
        				console.log(err);
        				Bert.alert('Adding failed', 'warning', 'growl-bottom-right', 'fa-frown-o');
        			}

        			if (res) {

        				this.addReleaseTracks(res.localReleaseId, res.spotifyReleaseId);

						Bert.alert('Release added', 'success', 'growl-bottom-right', 'fa-smile-o');

        			}

					this.setState({
						releases: []
					});

					this.refs.releaseSearch.value = '';

        			
        		});

			}
		});
	}

	addReleaseTracks(localReleaseId, spotifyReleaseId) {

		$.ajax({
	        url: 'https://api.spotify.com/v1/albums/' + spotifyReleaseId + '/tracks',
	        data: {
		        limit: 50
		    },
	        success: (response) => {

	        	var tracks = response.items;

	        	tracks.map((trackRaw) => {

	        		var track = {
	        			name: trackRaw.name,
	        			lastChanged: new Date,
	        			duration: trackRaw.duration_ms,
	        			trackNumber: trackRaw.track_number,
	        			release: localReleaseId,
	        			artists: [],
	        			spotifyRaw: trackRaw
	        		}

	        		trackRaw.artists.map((artist) => {
	        			var trackArtist = Artists.findOne({'spotifyRaw.id': artist.id}, {_id: 1});

	        			if (trackArtist)
	        			track.artists.push(trackArtist._id);

	        		});

	        		Meteor.call('addTrack', track, (err, res) => {
	        			if (err) {
	        				console.log(err);
	        			} else {

	        				Bert.alert('Tracks added', 'success', 'growl-bottom-right', 'fa-smile-o');
	        			}
	        		});

	        	});
	        } 
	    });

	}

	render () {

		var result = this.state.releases;

		return (
			<div>
				<div>
					<form onSubmit={this.handleSubmit.bind(this)}>
						<div className="form-group">
						  	<input type="text" ref="releaseSearch" className="form-control" placeholder="Search" />
						</div>
					</form>
				</div>
				<div className="results">
					{result.map((release) => {

						if (release.images[0] != undefined) {
							release.imageUrl = release.images[0].url;
						} else {
							release.imageUrl = 'http://placehold.it/640x640?text=No+Image';
						}

						if (release.album_type != undefined) {
							release.albumType = release.album_type;
						} else {
							release.albumType = '';
						}

						return <ReleaseCard key={release.id} release={release} onClick={() => {this.addRelease(release)}}/>
					})}
				</div>
			</div>
		);
	}
}