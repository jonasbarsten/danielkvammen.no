Artists = new Meteor.Collection( 'artists' );

Artists.allow({
	insert: () => false,
	update: () => false,
	remove: () => false
});

Artists.deny({
	insert: () => true,
	update: () => true,
	remove: () => true
});

const ArtistsSchema = new SimpleSchema({
	"name": {
		type: String
	},
	"nameLower": {
		type: String
	},
	"views": {
		type: Number,
		optional: true
	},
	"bannerType": {
		type: String,
		optional: true
	},
	"bannerText": {
		type: String,
		optional: true
	},
	"bannerYouTube": {
		type: String,
		optional: true
	},
	"text": {
		type: String,
		optional: true
	},
	"bio": {
		type: Object,
		optional: true,
		blackbox: true
	},
	"songkickId": {
		type: Number,
		optional: true
	},
	"links": {
		type: [Object],
		optional: true
	},
	"links.$.name": {
		type: String,
		optional: true
	},
	"links.$.url": {
		type: String,
		optional: true
	},
	"links.$.isLocal": {
		type: Boolean,
		optional: true
	},
	"links.$.id": {
		type: String,
		optional: true
	},
	"links.$.sortIndex": {
		type: Number,
		optional: true
	},
	"releases": {
		type: [String],
		optional: true
	},
	"imageUrl": {
		type: String,
		optional: true
	},
	"localImageId": {
		type: String,
		optional: true
	},
	"lastChanged": {
		type: Date,
		label: "Last changed",
	},
	"spotifyRaw": {
		type: Object,
		optional: true,
		blackbox: true
	},
	"views": {
		type: [Date],
		optional: true
	},
	"viewCount": {
		type: [Object],
		optional: true
	},
	"viewCount.$.year": {
		type: Number,
		optional: true
	},
	"viewCount.$.yearTotal": {
		type: Number,
		optional: true
	},
	"viewCount.$.months": {
		type: [Object],
		optional: true
	},
	"viewCount.$.months.$.month": {
		type: Number,
		optional: true
	},
	"viewCount.$.months.$.monthTotal": {
		type: Number,
		optional: true
	},
	"viewCount.$.months.$.days": {
		type: [Object],
		optional: true
	},
	"viewCount.$.months.$.days.$.day": {
		type: Number,
		optional: true
	},
	"viewCount.$.months.$.days.$.dayTotal": {
		type: Number,
		optional: true
	},
	"viewCount.$.months.$.days.$.hours": {
		type: [Object],
		optional: true
	},
	"viewCount.$.months.$.days.$.hours.$.hour": {
		type: Number,
		optional: true
	},
	"viewCount.$.months.$.days.$.hours.$.hourTotal": {
		type: Number,
		optional: true
	}
});

Artists.attachSchema( ArtistsSchema );