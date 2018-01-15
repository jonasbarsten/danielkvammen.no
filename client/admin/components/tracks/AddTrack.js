import React, { Component } from 'react';

class AddTrack extends Component {

	handleSubmit(e) {
		e.preventDefault();


		const track = {
			name: this.refs.name.value,
			trackNumber: this.refs.number.value,
			lastChanged: new Date(),
			release: this.props.releaseId

		}

		Meteor.call('addTrack', track, (err, res) => {
			if (err) {
				console.log(err);
			}

			this.refs.name.value = '';
			this.refs.number.value = null;
		});
	}

	render () {
		return (
			<div>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<div className="form-group col-xs-2">
						<input type="number" ref="number" className="form-control" placeholder="2" />
					</div>
					<div className="form-group col-xs-8">
						<input ref="name" className="form-control" placeholder="Yellow submarine" />
					</div>
					<button className="btn btn-success col-xs-2">Add!</button>
				</form>
			</div>
		);
	}
}

export default AddTrack;