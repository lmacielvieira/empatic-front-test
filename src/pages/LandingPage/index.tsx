import React from 'react'
import {Link} from 'react-router-dom'
import {Col} from 'antd'
import './style.less'
import {IMAGES, SETTINGS} from '../../settings'

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

	renderEmbraceBtn = (className: string) => {
		return (
			<Link className={className} to="#">
				{SETTINGS.LandingPage.embraceBtn}
			</Link>
		)
	}

	renderSmartSection = () => {
		return (
			<section className={`${this._pageName}-smart-section`}>
				<div className={`${this._pageName}-container`}>
					<Col xs={24} md={12} className={`${this._pageName}-wrapper`}>
						<span className={`${this._pageName}-title defaultTitle`}>
							{SETTINGS.LandingPage.smartTitle}
						</span>
						<Link className={`${this._pageName}-smart-btn`} to="#">
							{SETTINGS.LandingPage.smartBtnLabel}
						</Link>
						<p className={`${this._pageName}-label`}>
							{SETTINGS.LandingPage.smartLabel}
						</p>
					</Col>
					<Col xs={0} md={12} className={`${this._pageName}-wrapper`} />
				</div>
			</section>
		)
	}

	renderEmbraceSection = () => {
		return (
			<section className={`${this._pageName}-embraced-section`}>
				<div className={`${this._pageName}-container`}>
					<Col xs={24} md={12} className={`${this._pageName}-wrapper`}>
						<div className={`${this._pageName}-embrace-logo`} />
						<span className={`${this._pageName}-title defaultTitle`}>
							{SETTINGS.LandingPage.companionLabel}
						</span>
						<p className={`${this._pageName}-label`}>
							{SETTINGS.LandingPage.embraceDesc}
						</p>
						{this.renderEmbraceBtn(`${this._pageName}-embrace-btn big-sc-btn`)}
					</Col>
					<Col
						xs={24}
						md={12}
						className={`${this._pageName}-wrapper`}
						style={{alignItems: 'center'}}>
						<img
							className={`${this._pageName}-embrace-img`}
							src={IMAGES.embrace}
							alt=""
						/>
						{this.renderEmbraceBtn(
							`${this._pageName}-embrace-btn small-sc-btn`
						)}
					</Col>
				</div>
			</section>
		)
	}

	render() {
		return (
			<div className={`${this._pageName}`}>
				{this.renderSmartSection()}
				{this.renderEmbraceSection()}
			</div>
		)
	}
}
