import validUrl from 'valid-url';
import { check, Match } from 'meteor/check';

Meteor.methods({
	'shortlink.add': function (url) {

		// Custom validation
		check(url, Match.Where(url => validUrl.isUri(url)));

		const token = Math.random().toString(36).slice(-3);

		const exists = Shortlinks.findOne({token: token});

		if (exists) {
			Meteor.call('shortlink.add', url);
		} else {
			if ( Roles.userIsInRole(Meteor.userId(), ['super-admin', 'manage-users', 'admin'])) {
				Shortlinks.insert({
					url: url, 
					token: token, 
					clicks: 0, 
					createdDate: new Date(), 
					createdBy: Meteor.userId()
				});
			}
		}
	},
	'shortlink.delete': function (id) {
		if ( Roles.userIsInRole(Meteor.userId(), ['super-admin', 'manage-users', 'admin'])) {
			Shortlinks.remove({_id: id});
		}
	}
});