Shortlinks = new Mongo.Collection( 'shortlinks' );

Shortlinks.allow({
	insert: () => false,
	update: () => false,
	remove: () => false
});

Shortlinks.deny({
	insert: () => true,
	update: () => true,
	remove: () => true
});

const ShortlinksSchema = new SimpleSchema({
	"url": {
		type: String
	},
	"token": {
		type: String
	},
	"clicks": {
		type: Number
	},
	"createdDate": {
		type: Date
	},
	"createdBy": {
		type: String
	}
});

Shortlinks.attachSchema( ShortlinksSchema );