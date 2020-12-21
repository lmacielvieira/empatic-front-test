import React from 'react'
import update from 'immutability-helper'
import {connect} from 'react-redux'
import {History} from 'history'
import {message} from 'antd'
import t from 'typy'
import {deleteOrder, getUserInfo, getUserOrders} from '../../services'
import {HeaderComponent} from '../../components/HeaderComponent'
import {OrderTableComponent} from '../../components/OrderTableComponent'
import './style.less'
import {OrderFormModalComponent} from '../../components/OrderFormModalComponent'

interface Tracking {
	carrier: string
	trackingCode: string
	status: string
}
interface Item {
	sku?: string
	name: string
	value?: number
	amount?: number
}

interface Order {
	id: number
	ref: string
	status: string
	tracking: Tracking
	items: Array<Item>
	discounts: Array<Item>
}

interface IProps {
	state: any
	dispatch: any
	history: History
}

interface IState {
	loading?: boolean
	showEditModal?: boolean
	user?: {id: number; firstName: string; lastName: string; email: string}
	orders?: Array<Order>
	selectedOrder?: Order | undefined
}

class UserPage extends React.Component<IProps, IState> {
	_pageName = 'user-page'

	// -------------------------------------------------------------------------//
	// Component Lifecycle
	// -------------------------------------------------------------------------//

	constructor(props: IProps) {
		super(props)

		this.state = {
			loading: false,
			orders: [],
			showEditModal: false,
			selectedOrder: undefined
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

		try {
			const user = await getUserInfo(
				t(state, 'userReducer.userId').safeNumber.toString()
			)
			this.setState({user}, () => {
				this.requestOrders()
			})
		} catch (e) {
			const errorMsg = e && e.error ? e.error : JSON.stringify(e)
			message.error(errorMsg)
		}
	}

	requestOrders = async () => {
		const {state} = this.props

		this.setState({loading: true})
		try {
			const response = await getUserOrders(
				t(state, 'userReducer.userId').safeNumber.toString()
			)
			this.setState({orders: t(response, 'orders').safeArray, loading: false})
		} catch (e) {
			this.setState({loading: false})
			const errorMsg = e && e.error ? e.error : JSON.stringify(e)
			message.error(errorMsg)
		}
	}

	// -------------------------------------------------------------------------//
	// Event Handlers
	// -------------------------------------------------------------------------//

	handleOrderDelete = async (orderId: number) => {
		const {orders} = this.state
		this.setState({loading: true})

		try {
			await deleteOrder(orderId.toString())
			// uncomment next line if backend persist data
			// this.requestOrders()

			// kept local to show demo
			this.setState(
				update(this.state, {
					orders: {
						$splice: [
							[
								t(orders).safeArray.findIndex((order) => order.id === orderId),
								1
							]
						]
					},
					loading: {
						$set: false
					}
				})
			)
		} catch (e) {
			this.setState({loading: false})
			const errorMsg = e && e.error ? e.error : JSON.stringify(e)
			message.error(errorMsg)
		}
	}

	handleOrderEdit = async (values: Order) => {
		// it does not make sense to update the order status, but im doing in order to complete the edit extra

		const {orders} = this.state
		this.setState({loading: true})

		try {
			// await editOrder(values.id.toString())
			// uncomment next line if backend persist data
			// this.requestOrders()

			// kept local to show demo
			this.setState(
				update(this.state, {
					orders: {
						[t(orders).safeArray.findIndex(
							(order) => order.id === values.id
						)]: {
							$set: values
						}
					},
					loading: {
						$set: false
					},
					showEditModal: {
						$set: false
					},
					selectedOrder: {
						$set: undefined
					}
				})
			)
		} catch (e) {
			this.setState({
				loading: false,
				showEditModal: false,
				selectedOrder: undefined
			})
			const errorMsg = e && e.error ? e.error : JSON.stringify(e)
			message.error(errorMsg)
		}
	}
	// -------------------------------------------------------------------------//
	// Other Functions
	// -------------------------------------------------------------------------//

	// -------------------------------------------------------------------------//
	// Render
	// -------------------------------------------------------------------------//

	renderHeader = () => {
		const {user} = this.state

		return (
			<HeaderComponent
				isLogged
				name={`${t(user, 'firstName').safeString} ${
					t(user, 'lastName').safeString
				}`}
				mail={t(user, 'email').safeString}
			/>
		)
	}

	renderOrders = () => {
		const {orders, loading} = this.state

		return (
			<OrderTableComponent
				data={t(orders).safeArray}
				loading={loading}
				editCb={(record) => {
					this.setState({showEditModal: true, selectedOrder: record})
				}}
				deleteCb={this.handleOrderDelete}
			/>
		)
	}

	renderEditModal = () => {
		const {showEditModal, selectedOrder} = this.state

		return (
			<OrderFormModalComponent
				visible={showEditModal}
				item={selectedOrder}
				handleEditCb={this.handleOrderEdit}
				handleCancelCb={() =>
					this.setState({showEditModal: false, selectedOrder: undefined})
				}
			/>
		)
	}

	render() {
		const {selectedOrder} = this.state

		return (
			<div className={this._pageName}>
				{this.renderHeader()}
				{this.renderOrders()}
				{selectedOrder && this.renderEditModal()}
			</div>
		)
	}
}

const mapStateToProps = (state: any) => ({
	state
})

export default connect(mapStateToProps)(UserPage)
