import React from 'react'
import PropTypes, {InferProps} from 'prop-types'
import t from 'typy'
import {Table, Tooltip, Popconfirm} from 'antd'
// eslint-disable-next-line import/no-extraneous-dependencies
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'
import './style.less'
import {normalizeInput} from '../../utils'
import {SETTINGS} from '../../settings'

export function OrderTableComponent({
	_componentName,
	title,
	refLabel,
	totalLabel,
	itemsLabel,
	discountLabel,
	shipLabel,
	data,
	editCb,
	deleteCb,
	editTooltip,
	deleteTooltip,
	emptyText,
	loading
}: InferProps<typeof OrderTableComponent.propTypes>) {
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

	const sort = (a: string, b: string, src: string) => {
		const aName = normalizeInput(t(a, src).safeString)
		const bName = normalizeInput(t(b, src).safeString)
		if (aName < bName) {
			return -1
		}
		if (aName > bName) {
			return 1
		}
		return 0
	}

	// -------------------------------------------------------------------------//
	// Rendering
	// -------------------------------------------------------------------------//

	const renderItems = (text: string, record: any) => {
		return (
			<div className={`${_componentName}-list`}>
				{t(record, 'items').safeArray.map((item) => {
					return (
						<div key={item.sku} className={`${_componentName}-item`}>
							{`${item.name} - ${item.amount}`}
						</div>
					)
				})}
			</div>
		)
	}
	const renderDiscounts = (text: string, record: any) => {
		return (
			<div className={`${_componentName}-discounts`}>
				{t(record, 'discounts').safeArray.map((item) => {
					return (
						<div key={item.name} className={`${_componentName}-item`}>
							{`${item.name} - ${item.value}${
								item.type === 'percent' ? '%' : ' units'
							}`}
						</div>
					)
				})}
			</div>
		)
	}

	const renderShipping = (text: string, record: any) => {
		return `${t(record, 'tracking.status').safeString} - ${
			t(record, 'tracking.carrier').safeString
		} - ${t(record, 'tracking.trackingCode').safeString}`
	}

	const renderTotal = (text: string, record: any) => {
		const sum = t(record, 'items').safeArray.reduce(
			(a: number, b: number) =>
				t(a, 'amount').safeNumber + t(b, 'amount').safeNumber,
			0
		)
		return `${sum} units`
	}

	const renderOptions = (text: string, record: any) => {
		return (
			<div className={`${_componentName}-options-wrapper`}>
				<Tooltip title={deleteTooltip}>
					<Popconfirm
						title="Are you sure to delete this order?"
						onConfirm={() => {
							t(deleteCb).safeFunction(record.id)
						}}
						onCancel={() => {}}
						okText="Yes"
						cancelText="No">
						<DeleteOutlined className={`${_componentName}-icon`} />
					</Popconfirm>
				</Tooltip>
				<Tooltip title={editTooltip}>
					<EditOutlined
						className={`${_componentName}-icon`}
						onClick={() => {
							t(editCb).safeFunction(record)
						}}
					/>
				</Tooltip>
			</div>
		)
	}

	const columns = [
		{
			title: refLabel,
			dataIndex: 'ref',
			sorter: (a: string, b: string) => sort(a, b, 'ref'),
			sortDirections: ['descend', 'ascend']
		},
		{
			title: totalLabel,
			items: 'total',
			sorter: (a: number, b: number) => a - b,
			sortDirections: ['descend', 'ascend'],
			render: renderTotal
		},
		{
			title: itemsLabel,
			items: 'items',
			render: renderItems
		},
		{
			title: discountLabel,
			items: 'discounts',
			render: renderDiscounts
		},
		{
			title: shipLabel,
			items: 'tracking',
			render: renderShipping
		},
		{
			title: ' ',
			items: 'total',
			render: renderOptions
		}
	]

	const renderHeader = () => {
		return (
			<div className={`${_componentName}-header`}>
				<div className={`${_componentName}-title defaultText`}>
					{t(title).safeString}
				</div>
			</div>
		)
	}

	const renderTable = () => {
		return (
			<Table
				rowKey="id"
				loading={t(loading).safeBoolean}
				className={`${_componentName}-table-wrapper`}
				columns={t(columns).safeArray}
				dataSource={t(data).safeArray}
				locale={{emptyText}}
				scroll={{x: 765}}
			/>
		)
	}

	return (
		<div className={`${_componentName}`}>
			{renderHeader()}
			{renderTable()}
		</div>
	)
}

// Component props and default prop values
OrderTableComponent.propTypes = {
	_componentName: PropTypes.string,
	title: PropTypes.string,
	refLabel: PropTypes.string,
	totalLabel: PropTypes.string,
	discountLabel: PropTypes.string,
	shipLabel: PropTypes.string,
	editTooltip: PropTypes.string,
	deleteTooltip: PropTypes.string,
	emptyText: PropTypes.string,
	itemsLabel: PropTypes.string,
	loading: PropTypes.bool,
	addCb: PropTypes.func,
	editCb: PropTypes.func,
	deleteCb: PropTypes.func,
	data: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string,
			desc: PropTypes.string
		})
	)
}

OrderTableComponent.defaultProps = {
	_componentName: 'order-table-component',
	title: SETTINGS.OrderTableComponent.title,
	refLabel: SETTINGS.OrderTableComponent.refLabel,
	totalLabel: SETTINGS.OrderTableComponent.totalLabel,
	discountLabel: SETTINGS.OrderTableComponent.discountLabel,
	itemsLabel: SETTINGS.OrderTableComponent.itemsLabel,
	shipLabel: SETTINGS.OrderTableComponent.shipLabel,
	editTooltip: SETTINGS.OrderTableComponent.editTooltip,
	emptyText: SETTINGS.OrderTableComponent.emptyText,
	deleteTooltip: SETTINGS.OrderTableComponent.deleteTooltip,
	loading: false,
	addCb: () => {},
	editCb: () => {},
	deleteCb: () => {},
	data: []
}
