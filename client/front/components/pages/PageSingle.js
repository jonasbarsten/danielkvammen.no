import React, {Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Preloader from '../../../shared/components/preloader/Preloader.js';
import BarstenViewer from '../../../shared/components/utilities/BarstenViewer.js';

class PageSingle extends Component {

	componentDidMount() {

		if (navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)) {           
            window.scrollTo(0,0);
        } else {
        	$(window).scrollTop();
        }

		Meteor.call('pageView', this.props.params.urlFriendlyName);
	}

	render() {

		const page = this.props.page;

		if (!page) {
			return <Preloader />
		}

		return (
			<div className="container-fluid no-side-padding">
				<div className="container no-side-padding">
					<div className="page-single-banner">
						<div className="text-banner">
							<div className="v-align">
								<h1>{page.name}</h1>
							</div>
						</div>
					</div>
					<div className="page-single-content">
						<BarstenViewer key={page._id} content={page.content} placeholder='No content yet ...' />
					</div>
				</div>
			</div>
		);
	}
}

export default createContainer((params) => {
	Meteor.subscribe('pages');

	return {
		page: Pages.find({urlFriendlyName: params.routeParams.urlFriendlyName}).fetch()[0],
	};
}, PageSingle);