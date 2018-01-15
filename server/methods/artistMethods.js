Meteor.methods({
	'addArtist': function (artist) {

		var artistExists = Artists.findOne({'nameLower': artist.name.toLowerCase()});

		if (artistExists) {
			return 'exists'
		} else {
			let newArtist = Artists.insert(artist);
			return newArtist;
		}

	},
	'deleteArtist': function (artistId) {

		// Delete files associated with artist from s3
		var artist = Artists.findOne({_id: artistId});

		if (artist.localImageId) {
			UserFiles.remove({_id: artist.localImageId});
		}

		// Delete artist
		Artists.remove({_id: artistId});
	},
	'changeArtistName': function (artistId, newName) {
		Artists.update({_id: artistId}, {$set: {name: newName}});
	},
	'changeArtistImage': function (artistId, imageId) {

		// Get old image id
		var artist = Artists.findOne({_id: artistId});

		if (artist.localImageId) {
			var oldId = artist.localImageId;
		}

		// Update to new image
		var link = UserFiles.findOne({_id: imageId}).link();

		Artists.update({_id: artistId}, {$set: {
			imageUrl: link,
			localImageId: imageId,
			lastChanged: new Date()
		}});

		// Remove old image
		if (oldId) {
			UserFiles.remove({_id: oldId});
		}
		
	},
	'updateArtist': function (artistId, field, content) {

		var setObject = {}

		setObject[field] = content;

		Artists.update(
			{_id: artistId},
			{
				$set: setObject
			}
		);
	},
	'addLinkToArtist': function (link, artistId) {

		// Schema validation done by simple schema

		Artists.update({_id: artistId}, {$push: {links: link}});
	},
	'removeLinkFromArtist': function (link, artistId) {

		// Schema validation done by simple schema

		Artists.update({_id: artistId}, {$pull: {links: {id: link.id}}});
	},
	'reorderArtistLinks': function (artistId, link, index) {

		Artists.update(
			{_id: artistId, 'links.id': link.id}, 
			{$set: {'links.$.sortIndex': index}}
		);
	},
	'updateSongkickId': function (artistId, songkickId) {
		Artists.update({_id: artistId}, {$set: {songkickId: songkickId}});
	},
	'changeArtistBannerType': function (artistId, type) {
		Artists.update({_id: artistId}, {$set: {bannerType: type}});
	},
	'changeArtistBannerText': function (artistId, text) {
		Artists.update({_id: artistId}, {$set: {bannerText: text}});
	},
	'changeArtistBannerYouTube': function (artistId, url) {
		Artists.update({_id: artistId}, {$set: {bannerYouTube: url}});
	},
	'incrementArtistViews': function () {

		const date = new Date();

		const month = date.getUTCMonth() + 1;
		const year = date.getUTCFullYear();

		// If non-logged-in-user views, log view
		if (!Meteor.userId()) {
			Artists.update({}, {$push: {views: date}});
			// Artists.update({}, {$set: {}}, {'upsert': true});
		}
	},
	'subscribeToNewsletter': function (subscriber) {

		const data = {
			email: subscriber.email,
			// first_name: subscriber.firstName,
			// last_name: subscriber.lastName
		};

		const userName = Meteor.settings.private.directMail.id;
		const password = Meteor.settings.private.directMail.secret;
		const documentIdentifier = Meteor.settings.private.directMail.documentIdentifier;
		const addressGroupId = Meteor.settings.private.directMail.addressGroupId;

		const auth = userName + ':' + password;

		const request = 'https://secure.directmailmac.com/api/v2/' + 'projects/' + documentIdentifier + '/address-groups/' + addressGroupId + '/addresses';

		HTTP.call('POST', request, {
			auth: auth,
			data: data
		}, (err, res) => {
			if (err) {
				console.log(err);
			}
		});
	}
})