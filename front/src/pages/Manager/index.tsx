/* eslint-env browser */
/* eslint max-classes-per-file: ["error", 2] */
import React from 'react'
import t from 'typy'
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from 'react-router-dom'
import NotFoundPage from '../NotFoundPage'
import ErrorPage from '../ErrorPage'
import LandingPage from '../LandingPage'
import LoginPage from '../LoginPage'
import UserPage from '../UserPage'
import {store} from '../../redux/store'

import './style.less'
import {KEYS} from '../../settings'

class ProtectedRoute extends Route {
	public render() {
		let redirectPath: string = ''
		const state = store.getState()
		const {userReducer} = state
		const {isLogged} = userReducer

		if (!t(isLogged).safeBoolean) {
			redirectPath = KEYS.pageKeys.login
		}

		if (redirectPath) {
			const renderComponent = () => <Redirect to={{pathname: redirectPath}} />
			return (
				<Route {...this.props} component={renderComponent} render={undefined} />
			)
		}
		return <Route {...this.props} />
	}
}

export default class Manager extends React.Component<{}, {error: boolean}> {
	_pageName = 'router-page'

	private route: null

	constructor(props: {} | Readonly<{}>) {
		super(props)

		this.route = null
		this.state = {
			error: false
		}

		window.onbeforeunload = () => {
			window.scrollTo(0, 0)
		}
	}

	componentDidCatch() {
		this.setState({error: true})
	}

	// -------------------------------------------------------------------------//
	// Requests
	// -------------------------------------------------------------------------//

	// -------------------------------------------------------------------------//
	// Event Handlers
	// -------------------------------------------------------------------------//

	// -------------------------------------------------------------------------//
	// Render
	// -------------------------------------------------------------------------//

	render() {
		const {error} = this.state

		return (
			<Router
				ref={(input: null) => {
					this.route = input
				}}>
				<div className={`${this._pageName}`}>
					{error ? (
						<Route component={ErrorPage} />
					) : (
						<Switch>
							<Route exact path={KEYS.pageKeys.index} component={LandingPage} />
							<Route exact path={KEYS.pageKeys.login} component={LoginPage} />
							<ProtectedRoute
								exact
								path={KEYS.pageKeys.user}
								component={UserPage}
							/>
							<Route component={NotFoundPage} />
						</Switch>
					)}
				</div>
			</Router>
		)
	}
}
