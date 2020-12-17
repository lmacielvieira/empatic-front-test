/* eslint-env browser */
import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NotFoundPage from '../NotFoundPage'
import ErrorPage from '../ErrorPage'

import './style.less'

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
							<Route component={NotFoundPage} />
						</Switch>
					)}
				</div>
			</Router>
		)
	}
}
