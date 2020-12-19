import React from 'react'
import {connect} from 'react-redux'
import t from 'typy'
import {Spin, message} from 'antd'
import {History} from 'history'
import './style.less'
import {IMAGES, KEYS, SETTINGS} from '../../settings'
import {SocialComponent} from '../../components/SocialComponent'
import {LoginFormComponent} from '../../components/LoginFormComponent'
import {userLogin} from '../../services'
import {login} from '../../redux/actions/user'

interface IProps {
	state: any
	dispatch: any
	history: History
}

interface IState {
	loading?: boolean
}

class LoginPage extends React.Component<IProps, IState> {
	_pageName = 'login-page'
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
		const {state, history} = this.props
		console.log('OI')

		if (t(state, 'userReducer.isLogged').safeBoolean) {
			history.replace(KEYS.pageKeys.user)
		}
	}
	// -------------------------------------------------------------------------//
	// Requests
	// -------------------------------------------------------------------------//

	// -------------------------------------------------------------------------//
	// Event Handlers
	// -------------------------------------------------------------------------//

	handleLoginSuccess = async (info: any) => {
		const {history, dispatch} = this.props
		this.setState({loading: true})

		try {
			const values = info
			values.email =
				typeof info.email === 'string' ? info.email.toLowerCase() : info.email
			values.email = info.email.trim()
			await userLogin(info.email, info.password)
			await dispatch(login())
			this.setState({loading: false})
			history.push(KEYS.pageKeys.user)
		} catch (e) {
			const errorMsg = e && e.error ? e.error : JSON.stringify(e)
			message.error(errorMsg)
			this.setState({loading: false})
		}
	}

	// -------------------------------------------------------------------------//
	// Other Functions
	// -------------------------------------------------------------------------//

	// -------------------------------------------------------------------------//
	// Render
	// -------------------------------------------------------------------------//

	renderBackground = () => {
		return (
			<div className={`${this._pageName}-ellipsis-wrapper`}>
				<div className={`${this._pageName}-ellipsis`} />
				<div className={`${this._pageName}-ellipsis-bottom`} />
			</div>
		)
	}

	renderInfo = () => {
		return (
			<div className={`${this._pageName}-info-wrapper`}>
				<img className={`${this._pageName}-logo`} src={IMAGES.logo} alt="" />
				<div className={`${this._pageName}-know-wrapper`}>
					<span className={`${this._pageName}-text`}>
						{SETTINGS.LoginPage.knowLabel}
					</span>
					<SocialComponent />
				</div>
			</div>
		)
	}

	renderForm = () => {
		return (
			<div className={`${this._pageName}-form-wrapper`}>
				<img
					className={`${this._pageName}-logo`}
					src={IMAGES.embraceLogo}
					alt=""
				/>
				<LoginFormComponent handleLoginSuccess={this.handleLoginSuccess} />
			</div>
		)
	}

	render() {
		const {loading} = this.state
		return (
			<div className={this._pageName}>
				{loading && <Spin />} {this.renderBackground()}
				{this.renderInfo()}
				{this.renderForm()}
			</div>
		)
	}
}

const mapStateToProps = (state: any) => ({
	state
})

function mapDispatchToProps(dispatch: any) {
	return {dispatch}
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
