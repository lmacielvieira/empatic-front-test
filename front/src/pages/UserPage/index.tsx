import React from 'react'
import './style.less'
import {connect} from 'react-redux'
import {History} from 'history'
import {message} from 'antd'
import t from 'typy'
import {getUserInfo} from '../../services'
import {HeaderComponent} from '../../components/HeaderComponent'

interface IProps {
	state: any
	dispatch: any
	history: History
}

interface IState {
	loading?: boolean
	user?: {id: number; firstName: string; lastName: string; email: string}
}

class UserPage extends React.Component<IProps, IState> {
	_pageName = 'user-page'

	// -------------------------------------------------------------------------//
	// Component Lifecycle
	// -------------------------------------------------------------------------//

	constructor(props: IProps) {
		super(props)

		this.state = {
			loading: false
		}
	}

	componentDidMount() {
		this.requestUserInfo()
	}

	// -------------------------------------------------------------------------//
	// Requests
	// -------------------------------------------------------------------------//

	requestUserInfo = async () => {
		const {state} = this.props
		this.setState({loading: true})

		try {
			const user = await getUserInfo(
				t(state, 'userReducer.userId').safeNumber.toString()
			)
			this.setState({user})
			this.setState({loading: false})
		} catch (e) {
			const errorMsg = e && e.error ? e.error : JSON.stringify(e)
			message.error(errorMsg)
			this.setState({loading: false})
		}
	}

	// -------------------------------------------------------------------------//
	// Event Handlers
	// -------------------------------------------------------------------------//

	// -------------------------------------------------------------------------//
	// Other Functions
	// -------------------------------------------------------------------------//

	// -------------------------------------------------------------------------//
	// Render
	// -------------------------------------------------------------------------//

	render() {
		const {user} = this.state
		return (
			<div className={this._pageName}>
				<HeaderComponent
					isLogged
					name={`${t(user, 'firstName').safeString} ${
						t(user, 'lastName').safeString
					}`}
					mail={t(user, 'email').safeString}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state: any) => ({
	state
})

export default connect(mapStateToProps)(UserPage)
