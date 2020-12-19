import React from 'react'
import PropTypes, {InferProps} from 'prop-types'
import t from 'typy'
import './style.less'
import {SETTINGS} from '../../settings'

export function SocialComponent({
	_componentName,
	items
}: InferProps<typeof SocialComponent.propTypes>) {
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
			{t(items).safeArray.map((item) => {
				return (
					<a
						key={item.id}
						className={`${_componentName}-icon-holder`}
						href={item.url}
						rel="noreferrer"
						target="_blank">
						<img className={`${_componentName}-icon`} src={item.src} alt="" />
					</a>
				)
			})}
		</div>
	)
}

// Component props and default prop values
SocialComponent.propTypes = {
	_componentName: PropTypes.string,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			src: PropTypes.string,
			url: PropTypes.string
		})
	)
}

SocialComponent.defaultProps = {
	_componentName: 'social-component',
	items: SETTINGS.SocialComponent.social
}
