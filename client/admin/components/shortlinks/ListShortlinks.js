import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class ListShortlinks extends Component {

	deleteShortlink(id) {

		Meteor.call('shortlink.delete', id, (err, res) => {
			if (err) {
				console.log(err);
			} else {
				Bert.alert('Shortlink deleted', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});
	}

	render () {

		const shortlinks = this.props.shortlinks;

		return (
			<div>
				<table className="table">
					<thead>
						<tr>
							<th>URL</th>
							<th>Shortlink</th>
							<th>Clicks</th>
						</tr>
					</thead>
					<tbody>
						{shortlinks.map((shortlink) => {

							const shortlinkWithBase = Meteor.settings.public.url + '/s/' + shortlink.token;

							return (
								<tr key={shortlink._id}>
									<td>{shortlink.url}</td>
									<td>
										<a href={shortlinkWithBase}>
											{shortlinkWithBase}
										</a>
									</td>
									<td>{shortlink.clicks}</td>
									<td>
										<button onClick={() => this.deleteShortlink(shortlink._id)} className="btn btn-danger">Delete</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

export default createContainer(() => {

	Meteor.subscribe('shortlinks');

	return {
		shortlinks: Shortlinks.find().fetch()
	}

},ListShortlinks);