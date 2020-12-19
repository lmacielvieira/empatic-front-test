import React from 'react'
import './style.less'

export default class UserPage extends React.Component {
	_pageName = 'user-page'

	constructor(props: {} | Readonly<{}>) {
		super(props)

		this.state = {}
	}

	render() {
		return <div className={this._pageName} />
	}
}
