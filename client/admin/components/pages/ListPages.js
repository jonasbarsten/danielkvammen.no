import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {Link} from 'react-router';

export default class ListPages extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);
		this.state = {
			subscription: {
				pages: Meteor.subscribe('pages')
			}
		}
	}

	componentWillUnmount() {
		this.state.subscription.pages.stop();
	}

	getPages() {
		return Pages.find({}, {sort: {views: -1}}).fetch();
	}

	render() {
		return(
			<div>
				{this.getPages().map((page) => {

					const editUrl = '/admin/pages/edit/' + page.urlFriendlyName;
					const visitUrl = Meteor.settings.public.url + '/pages/' + page.urlFriendlyName;

					return (
						<div key={page._id} className="row">
							<div className="col-xs-12">
								<Link to={editUrl}>
									<div className="col-xs-2">
										<span className="label label-primary">{page.views} views</span>
									</div>
									<div className="col-xs-5">
										{page.name}
									</div>
								</Link>
								<div className="col-xs-5">
									<Link to={visitUrl}>{visitUrl}</Link>
								</div>
							</div>
						</div>
					);

							
				})}
			</div>
		);
	}
}