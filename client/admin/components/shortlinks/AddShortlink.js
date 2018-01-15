import React, { Component } from 'react';

class AddShortlink extends Component {

	handleSubmit(e) {
		e.preventDefault();

		Meteor.call('shortlink.add', this.refs.url.value, (err, res) => {
			if (err) {
				this.refs.url.value = '';
				Bert.alert('Enter a valid URL', 'danger', 'growl-bottom-right', 'fa-frown-o');
			} else {
				this.refs.url.value = '';
				Bert.alert('Shortlink added', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});
	}

	render () {
		return (
			<div>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<div className="form-group col-xs-10">
						<label>URL</label>
						<input ref="url" className="form-control" />
					</div>
					<button className="btn btn-primary col-xs-2" style={{marginTop: '25px'}}>Shorten!</button>
				</form>
			</div>
		);
	}
}

export default AddShortlink;