Meteor.methods({
	'addTrack': function (track) {
		Tracks.insert(track);
	},
	'deleteTrack': function (track) {
		Tracks.remove(track);
	},
	'addTrackLink': function (trackId, link) {
		Tracks.update({_id: trackId}, {$set: {link: link}});
	}
});