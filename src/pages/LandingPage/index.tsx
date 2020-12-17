import React from 'react'
import './style.less'
import {SETTINGS} from '../../settings'

export default class LandingPage extends React.Component {
	_pageName = 'landing-page'

	// -------------------------------------------------------------------------//
	// React lifecycle functions
	// -------------------------------------------------------------------------//

	constructor(props: {} | Readonly<{}>) {
		super(props)

		this.state = {}
	}

	// -------------------------------------------------------------------------//
	// Requests
	// -------------------------------------------------------------------------//

	// -------------------------------------------------------------------------//
	// Event Handlers
	// -------------------------------------------------------------------------//

	// -------------------------------------------------------------------------//
	// Other functions
	// -------------------------------------------------------------------------//

	// -------------------------------------------------------------------------//
	// Rendering
	// -------------------------------------------------------------------------//

	renderSmartSection = () => {
		return (
			<section className={`${this._pageName}-smart-section`}>
				<span className={`${this._pageName}-title defaultTitle`}>
					{SETTINGS.LandingPage.smartTitle}
				</span>
				<div className={`${this._pageName}-smart-btn`}>
					{SETTINGS.LandingPage.smartBtnLabel}
				</div>
				<p className={`${this._pageName}-label`}>
					{SETTINGS.LandingPage.smartLabel}
				</p>
			</section>
		)
	}

	render() {
		return (
			<div className={`${this._pageName}`}>{this.renderSmartSection()}</div>
		)
	}
}
