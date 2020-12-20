import React from 'react'
import PropTypes, {InferProps} from 'prop-types'
import {Link} from 'react-router-dom'
import t from 'typy'
import {store} from '../../redux/store'
import {IMAGES, KEYS} from '../../settings'
import './style.less'
import {logout} from '../../redux/actions/user'

export function HeaderComponent({
	_componentName,
	icon,
	homeUrl,
	name,
	mail,
	orderUrl,
	isLogged,
	orderLabel,
	logoutLabel
}: InferProps<typeof HeaderComponent.propTypes>) {
	// -------------------------------------------------------------------------//
	// Hooks
	// -------------------------------------------------------------------------//

	// -------------------------------------------------------------------------//
	// Effects
	// -------------------------------------------------------------------------//

	// -------------------------------------------------------------------------//
	// Requests
	// -------------------------------------------------------------------------//

	// -------------------------------------------------------------------------//
	// Event Handlers
	// -------------------------------------------------------------------------//

	const handleLogout = () => {
		store.dispatch(logout())
	}

	// -------------------------------------------------------------------------//
	// Other functions
	// -------------------------------------------------------------------------//

	// -------------------------------------------------------------------------//
	// Rendering
	// -------------------------------------------------------------------------//

	return (
		<div className={`${_componentName}`}>
			<Link className={`${_componentName}-holder`} to={`${homeUrl}`}>
				<img className={`${_componentName}-icon`} src={`${icon}`} alt="" />
			</Link>
			{!isLogged && (
				<div className={`${_componentName}-info-holder`}>
					<Link className={`${_componentName}-btn`} to={`${orderUrl}`}>
						{orderLabel}
					</Link>
				</div>
			)}
			{isLogged && (
				<div className={`${_componentName}-info-holder`}>
					<div className={`${_componentName}-col-wrapper`}>
						<div className={`${_componentName}-name `}>{name}</div>
						<div className={`${_componentName}-name`}>{mail}</div>
						<Link
							className={`${_componentName}-link`}
							to={`${homeUrl}`}
							onClick={handleLogout}>
							{logoutLabel}
						</Link>
					</div>
					<div className={`${_componentName}-avatar defaultText`}>
						{t(name).safeString.charAt(0).toUpperCase()}
						{t(t(name).safeString.split(' ')).safeArray.length > 1 &&
							t(t(name).safeString.split(' '))
								.safeArray[1].charAt(0)
								.toUpperCase()}
					</div>
				</div>
			)}
		</div>
	)
}

// Component props and default prop values
HeaderComponent.propTypes = {
	_componentName: PropTypes.string,
	icon: PropTypes.string,
	title: PropTypes.string,
	homeUrl: PropTypes.string,
	name: PropTypes.string,
	orderUrl: PropTypes.string,
	orderLabel: PropTypes.string,
	logoutLabel: PropTypes.string,
	isLogged: PropTypes.bool,
	mail: PropTypes.string
}

HeaderComponent.defaultProps = {
	_componentName: 'header-component',
	icon: IMAGES.logo,
	mail: '',
	name: '',
	homeUrl: '/',
	orderUrl: KEYS.pageKeys.user,
	orderLabel: 'Embrace',
	logoutLabel: 'Lougout',
	isLogged: false
}
