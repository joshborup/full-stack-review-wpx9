import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import List from "./components/List";
import { connect } from "react-redux";
import { setUser } from "./ducks/reducer";
import { Route } from "react-router-dom";

class App extends Component {
	constructor() {
		super();
		this.state = {
			user: null
		};
	}

	componentDidMount() {
		axios.get("/auth/user-data").then((response) => {
			console.log("response.data", response.data);
			this.props.setUser(response.data.user);
		});
	}

	login() {
		const redirectUri = encodeURIComponent(
			window.location.origin + "/auth/callback"
		);
		window.location = `https://${
			process.env.REACT_APP_AUTH0_DOMAIN
		}/authorize?client_id=${
			process.env.REACT_APP_AUTH0_CLIENT_ID
		}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
	}

	render() {
		console.log(this.props.user);
		const { user } = this.props;
		return (
			<div>
				<div className="auth0-button">
					{user ? user.name : ""}
					<button onClick={this.login}>Log in</button>
				</div>
				<Route path="/" component={List} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	};
};

export default connect(
	mapStateToProps,
	{ setUser }
)(App);
