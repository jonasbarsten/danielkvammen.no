import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import { composeWithTracker } from 'react-komposer';


import FrontLayout from './front/components/FrontLayout.js';
import SecureLayout from './secure/components/SecureLayout.js';
import AdminLayout from './admin/components/AdminLayout.js';

// SECURE
import SecureDashboard from './secure/components/SecureDashboard.js';

// ADMIN
import AdminDashboard from './admin/components/AdminDashboard.js';
import AdminUsers from './admin/components/users/UsersWrapper.js';
import AdminAllArtists from './admin/components/artists/AdminAllArtists.js';
import EditArtist from './admin/components/artists/EditArtist.js';
import AdminAllReleases from './admin/components/releases/AdminAllReleases.js';
import EditRelease from './admin/components/releases/EditRelease.js';
import AllTracks from './admin/components/tracks/AllTracks.js';
import PagesWrapper from './admin/components/pages/PagesWrapper.js';
import EditPage from './admin/components/pages/EditPage.js';
import Shortlinks from './admin/components/shortlinks/Shortlinks.js';
// import AddArtist from './admin/components/artists/AddArtist.js';


// FRONT
import Home from './front/components/pages/Home.js';
import AllArtists from './front/components/artists/AllArtists.js';
import ArtistSingle from './front/components/artists/ArtistSingle.js';
import AllReleases from './front/components/releases/AllReleases.js';
import UpcomingReleases from './front/components/releases/UpcomingReleases.js';
import ReleaseSingle from './front/components/releases/ReleaseSingle.js';
import PageSingle from './front/components/pages/PageSingle.js';


// ACCOUNT

import Login from './front/components/users/Login.js';
import InviteSignUp from './front/components/users/InviteSignUp.js';
import Forgot from './front/components/users/Forgot.js';

// ACCOUNT ROUTES

// Redirect to '/' on logout, uses gwendall:accounts-helpers
Accounts.onLogout(function() {
	browserHistory.push('/login');
});

// AUTH LOGIC

const authenticateAdmin = (nextState, replace, callback) => {

	// If no user, redirect to login
	if (!Meteor.loggingIn() && !Meteor.userId()) {
		replace({
			pathname: '/login',
			state: { nextPathname: nextState.location.pathname },
		});
	}

	callback();
};

const isLoggedIn = (nextState, replace, callback) => {
	if (Meteor.userId()) {
		replace({
			pathname: '/admin',
			state: { nextPathname: nextState.location.pathname },
		});
	}

	callback();
}

const incrementArtistViews = () => {
	Meteor.call('incrementArtistViews');
}


const routes = (
	<Router history={browserHistory}>

		<Route path="/">
			<IndexRoute component={ArtistSingle} onEnter={incrementArtistViews}/>
		</Route>

		<Route path="/login" component={Login} onEnter={isLoggedIn}></Route>
		<Route path="/invite/:token" component={InviteSignUp}></Route>
		<Route path="/forgot" component={Forgot}></Route>

		<Route path="/pages" component={FrontLayout}>
			<Route path=":urlFriendlyName" component={PageSingle} />
		</Route>

		<Route path="/upcoming" component={FrontLayout}>
			<IndexRoute component={UpcomingReleases} />
		</Route>

		<Route path="/releases" component={FrontLayout}>
			<IndexRoute component={AllReleases} />
			<Route path=":releaseId" component={ReleaseSingle} />
		</Route>

		<Route path="/admin" component={AdminLayout} onEnter={authenticateAdmin}>
			<IndexRoute component={AdminDashboard} />
			<Route path="users" component={AdminUsers} />
			<Route path="artists" component={AdminAllArtists} />
			<Route path="artist/edit/:artistId" component={EditArtist} />
			<Route path="releases" component={AdminAllReleases} />
			<Route path="release/edit/:releaseId" component={EditRelease} />
			<Route path="tracks/all" component={AllTracks} />
			<Route path="pages/all" component={PagesWrapper} />
			<Route path="pages/edit/:urlFriendlyName" component={EditPage} />
			<Route path="shortlinks" component={Shortlinks} onEnter={authenticateAdmin} />
		</Route>

	</Router>
);


Meteor.startup( () => {
	ReactDOM.render(routes, document.querySelector('.render-target'));
});