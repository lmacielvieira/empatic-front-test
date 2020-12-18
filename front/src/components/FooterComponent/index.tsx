import React from 'react'
import PropTypes, {InferProps} from 'prop-types'
import {Link} from 'react-router-dom'
import t from 'typy'
import './style.less'
import {SETTINGS} from '../../settings'

export function FooterComponent({
	_componentName,
	tabs,
	copyright
}: InferProps<typeof FooterComponent.propTypes>) {
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

	// -------------------------------------------------------------------------//
	// Other functions
	// -------------------------------------------------------------------------//

	// -------------------------------------------------------------------------//
	// Rendering
	// -------------------------------------------------------------------------//

	return (
		<div className={`${_componentName}`}>
			<div className={`${_componentName}-container`}>
				<div className={`${_componentName}-tabs-wrapper`}>
					{t(tabs).safeArray.map((tab) => {
						return (
							<Link
								key={tab.id}
								className={`${_componentName}-tab`}
								to={tab.link}>
								{t(tab, 'label').safeString}
							</Link>
						)
					})}
				</div>
				<div className={`${_componentName}-copyright`}>
					{t(copyright).safeString}
				</div>
			</div>
		</div>
	)
}

// Component props and default prop values
FooterComponent.propTypes = {
	_componentName: PropTypes.string,
	copyright: PropTypes.string,
	tabs: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			label: PropTypes.string,
			link: PropTypes.string
		})
	)
}

FooterComponent.defaultProps = {
	_componentName: 'footer-component',
	tabs: SETTINGS.FooterComponent.tabs,
	copyright: SETTINGS.FooterComponent.copyright
}
