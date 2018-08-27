import React, { Component } from 'react';
import { Link } from 'react-router';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

import Preloader from '../../../shared/components/preloader/Preloader.js';

export default class AdminArtistCard extends Component {
	render() {

		const viewsArray = (this.props.artist && this.props.artist.views) ? this.props.artist.views : [];

		// TODO: do this smarter
		var viewsPerMonth = {
			'01': 0,
			'02': 0,
			'03': 0,
			'04': 0,
			'05': 0,
			'06': 0,
			'07': 0,
			'08': 0,
			'09': 0,
			'10': 0,
			'11': 0,
			'12': 0,
		};

		viewsArray.map((view) => {
			var month = moment(view).format('MM');

			viewsPerMonth[month] = viewsPerMonth[month] + 1;
		});

		const viewsData = {
			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

			datasets: [
				{
					label: 'Views',
					fill: false,
					lineTension: 0.1,
					backgroundColor: '#de7fa7',
					borderColor: '#de7fa7',
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: '#de7fa7',
					pointBackgroundColor: '#fff',
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: '#de7fa7',
					pointHoverBorderColor: '#de7fa7',
					pointHoverBorderWidth: 2,
					pointRadius: 1,
					pointHitRadius: 10,
					data: [viewsPerMonth['01'], viewsPerMonth['02'], viewsPerMonth['03'], viewsPerMonth['04'], viewsPerMonth['05'], viewsPerMonth['06'], viewsPerMonth['07'], viewsPerMonth['08'], viewsPerMonth['09'], viewsPerMonth['10'], viewsPerMonth['11'], viewsPerMonth['12'],]
				}
			]
		};


		const editArtistUrl = '/admin/artist/edit/' + this.props.artist._id;
		const viewCount = (this.props.artist && this.props.artist.views) ? <div>{this.props.artist.views.length} views</div> : '';
		const banner = <img src="/images/banner.jpg" className="img-responsive" />

		return (
			<div className="row">
				
				<div className="artist-card col-sm-4">
					<Link to={editArtistUrl}>
						{banner}
						<p>{this.props.artist.name}</p> {viewCount}
					</Link>
				</div>
				<div className="col-sm-8">
					<Line 
						data={viewsData}
						height={200} 
						options={{
							maintainAspectRatio: false,
							legend: {
								display: false
							}
						}}
					/>
				</div>
			</div>
		);
	}
}