import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import swalOld from 'sweetalert';
import swal from 'sweetalert2';
import {browserHistory} from 'react-router';
import Masonry from 'react-masonry-component';
import Reorder from 'react-reorder';
import _ from 'lodash';

import UploadSingleFile from '../../../shared/components/files/UploadSingleFile.js';
import BarstenEditor from '../../../shared/components/utilities/BarstenEditor.js';
import AddLink from '../../../shared/components/links/AddLink.js';

import AddRelease from '../releases/AddRelease.js';
import ReleaseCard from '../../../shared/components/releases/ReleaseCard.js';

var ListItem = React.createClass({

	render: function () {

		return (
			<div>
				{this.props.item.name}
			</div>
		);
	}
});

export default class EditArtist extends TrackerReact(React.Component) {

	constructor() {
		super();
		this.state = {
			subscription: {
				artists: Meteor.subscribe('artists'),
				releases: Meteor.subscribe('releases')
			}
		}
	}

	componentWillUnmount() {
		this.state.subscription.artists.stop();
		this.state.subscription.releases.stop();
	}

	getArtist() {
		return Artists.find({_id: this.props.params.artistId}).fetch();
	}

	getReleases() {
		return Releases.find({artists: this.props.params.artistId}, {sort: {releaseDate: -1}}).fetch();
	}

	deleteArtist () {

		swal({
			title: 'Are you sure?',
			text: "You will not be able to recover this artist!",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then(() => {
			Meteor.call('deleteArtist', this.props.params.artistId, function(err, data) {
				if (err) {
					swal("The user cound not be deleted.", "warning");
				} else {
					browserHistory.push('/admin/artists');
					Bert.alert('Artist deleted', 'success', 'growl-bottom-right', 'fa-smile-o');
				}
			});
		// Since this is a promise, we have to catch "cancel" and say it is ok
		}).catch(swal.noop);
	}

	changeBannerType(type) {

		var artist = this.getArtist();

		artist = artist[0];

		if (artist.bannerType == type) {
			Bert.alert('Banner type stays the same', 'success', 'growl-bottom-right', 'fa-smile-o');
			
		} else {
			Meteor.call('changeArtistBannerType', this.props.params.artistId, type, function (err, data) {
				if (err) {
					console.log(err);
				} else {
					Bert.alert('Banner type changed', 'success', 'growl-bottom-right', 'fa-smile-o');
				}
			});
		}

	}

	changeBannerText(text) {
		Meteor.call('changeArtistBannerText', this.props.params.artistId, text, function (err, data) {
			if (err) {
				console.log(err);
			} else {
				Bert.alert('Banner text changed', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});
	}

	changeBannerYouTube(url) {
		Meteor.call('changeArtistBannerYouTube', this.props.params.artistId, url, function (err, data) {
			if (err) {
				console.log(err);
			} else {
				Bert.alert('Banner YouTube URL changed', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});
	}

	openEditBanner () {

		var artist = this.getArtist();

		artist = artist[0];

		swal({
			title: 'Select banner type',
			input: 'select',
			inputOptions: {
				'picture': 'Picture',
				'text': 'Text',
				'youtube': 'YouTube'
			},
			showCancelButton: true,

		}).then((result) => {

			if (result == 'picture') {
				swal({
					imageUrl: artist.imageUrl,
					showCancelButton: true,
					confirmButtonText: 'Use this',
					cancelButtonText: 'Replace'
				}).then(() => {
					this.changeBannerType('picture');

				}, function(dismiss) {
					if (dismiss === 'cancel') {
						// this.changeBannerType('picture');
						$('#newArtistBanner').trigger('click');
					}
				}).catch(swal.noop);
			}

			if (result == 'text') {
				swal({
					title: 'Banner text',
					text: artist.bannerText,
					input: 'text',
					showCancelButton: true,
					inputValidator: function (value) {
						return new Promise(function (resolve, reject) {
							if (value) {
								resolve()
							} else {
								reject('You need to write something!')
							}
						})
					}
				}).then((result) => {
					this.changeBannerText(result);
					this.changeBannerType('text');
				}).catch(swal.noop);
			}

			if (result == 'youtube') {
				swal({
					title: 'YouTube ID',
					text: artist.bannerYouTube,
					input: 'text',
					showCancelButton: true,
					inputValidator: function (value) {
						return new Promise(function (resolve, reject) {
							if (value) {
								resolve()
							} else {
								reject('You need to write something!')
							}
						})
					}
				}).then((result) => {
					this.changeBannerYouTube(result);
					this.changeBannerType('youtube');
				}).catch(swal.noop);
			}

		// Since this is a promise, we have to catch "cancel" and say it is ok
		}).catch(swal.noop);
	}

	editName () {
		 swalOld({
			title: "Change Artist Name",
			text: "Well well well, go ahead!",
			type: "input",
			showCancelButton: true,
			animation: "slide-from-top",
			inputPlaceholder: "New Artist name",
			closeOnConfirm: true
		},
		(inputValue) => {
			if (inputValue === false) return false;
			
			if (inputValue === "") {
				swalOld.showInputError("You need to write something!");
				return false
			}
			
			Meteor.call('changeArtistName', this.props.params.artistId, inputValue, function (err, data) {
				if (err) {
					swalOld.showInputError("Whoops, try again!");
				} else {
					Bert.alert('Name changed', 'success', 'growl-bottom-right', 'fa-smile-o');
				}
			})
			
		});
	}

	editRelease(release) {
		browserHistory.push('/admin/release/edit/' + release._id);
	}

	onBioChange(editorState) {

		Meteor.call('updateArtist', this.props.params.artistId, 'bio', editorState, function (err, res) {
			if (err) {
				console.log(err)
			} else {
				Bert.alert('Bio saved', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});

	}

	addLink(link) {

		const linkUrl = link.url;
		const url = new URL(linkUrl);

		const host = url.origin;
		const path = url.pathname;

		// Store only path if link is local
		if (host == Meteor.settings.public.url) {
			link.url = path;
			link.isLocal = true;
		}

		Meteor.call('addLinkToArtist', link, this.props.params.artistId, function (err, res) {
			if (err) {
				console.log(err);
			} else {
				Bert.alert('Link added', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});

	}

	deleteLink(event, link) {

		swalOld({
			title: "Are you sure?",
			text: "You will not be able to recover this link!",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Yes, delete it!",
			closeOnConfirm: true
		},
		() => {
			Meteor.call('removeLinkFromArtist', link, this.props.params.artistId, function(err, res) {
				if (err) {
					console.log(err);
				} else {
					Bert.alert('Link removed', 'success', 'growl-bottom-right', 'fa-smile-o');
				}
			});
		});

	}

	reorderLinks(event, itemThatHasBeenMoved, itemsPreviousIndex, itemsNewIndex, reorderedArray) {

		reorderedArray.map((link, i) => {
			Meteor.call('reorderArtistLinks', this.props.params.artistId, link, i);
		});
	}

	updateSongkickId(e) {
		e.preventDefault();

		Meteor.call('updateSongkickId', this.props.params.artistId, this.refs.songkickId.value, function (err, res) {
			if (err) {
				console.log(err);
			} else {
				Bert.alert('Songkick ID updated', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});
	}

	render () {

		var artist = this.getArtist();
		artist = artist[0];
		

		var banner = '';

		if (artist) {

			const imageUrl = artist.imageUrl ? artist.imageUrl + '?size=100x200' : '';

			if (artist.bannerType == 'picture') {
				banner = <img src={imageUrl} className="img-responsive" />
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
					<div className="text-banner">
						<div className="v-align">
							<h1>YouTube-video</h1>
						</div>
					</div>
			}		
		}


		const masonryOptions = {
				transitionDuration: 0
		};

		return (
			<div id="artistEdit">
				{this.getArtist().map((artist) => {

					const songkickId = artist.songkickId ? artist.songkickId : '';

					var links = '';

					if (artist.links) {

						if (artist.links[0]) {

							var sortedLinks = _.sortBy(artist.links, 'sortIndex');

							links = <Reorder
										// The key of each object in your list to use as the element key
										itemKey='id'
										// Lock horizontal to have a vertical list
										// lock='horizontal'
										// The milliseconds to hold an item for before dragging begins
										holdTime='100'
										// The list to display
										list={sortedLinks}
										// A template to display for each list item
										template={ListItem}
										// Function that is called once a reorder has been performed
										callback={this.reorderLinks.bind(this)}
										// Class to be applied to the outer list element
										listClass='row link-list'
										// Class to be applied to each list item's wrapper element
										itemClass='col-sm-4 col-xs-6'
										// A function to be called if a list item is clicked (before hold time is up)
										itemClicked={this.deleteLink.bind(this)}
										// The item to be selected (adds 'selected' class)
										selected={this.state.selected}
										// The key to compare from the selected item object with each item object
										selectedKey='uuid'
										// Allows reordering to be disabled
										disableReorder={false}
									/>
						}
					}


					return (
						<div key={artist._id}>

							<div className="container-fluid">

								<div className="artist-banner" onClick={this.openEditBanner.bind(this)}>
									{banner}
								</div>

								<UploadSingleFile 
									elementId="newArtistBanner" 
									attatchToCategory="artistImage"
									attatchToId={artist._id}
									postUploadMethod="changeArtistImage"
									postUploadMethodArgument={artist._id}
								/>
								
								<div className="container">

									<div className="artist-single-content">

										<hr />

										<AddLink onSubmit={(link) => {this.addLink(link)}} />

										<br />

										<p>Click link to delete, hold and drag to reorder</p>

										{links}
										
										<hr />

										<h4>Songkick ID</h4>
										<form onSubmit={this.updateSongkickId.bind(this)}>
											<input
												type="text"
												ref="songkickId"
												placeholder="Songkick ID"
												defaultValue={songkickId}
											/>
										</form>

										<hr />

										<AddRelease artistId={artist._id}/>

										<hr />

										<h4>Edit releases</h4>

										<Masonry
											className={''} // default '' 
											options={masonryOptions}
											elementType={'div'} // default 'div'
											disableImagesLoaded={false} // default false 
											updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false 
										>

											{this.getReleases().map((release) => {
										
												return <ReleaseCard key={release._id} release={release} onClick={() => {this.editRelease(release)}}/>
											})}

										</Masonry>

										<div className="row artist-single-releases">

										</div>


										<hr />
										<div className="deleteArtistField" onClick={this.deleteArtist.bind(this)}>
											<h4>Delete artist</h4>
										</div>
									</div>
									
								</div>

							</div>

						</div>
					);
				})}
			</div>
		);
	}
}