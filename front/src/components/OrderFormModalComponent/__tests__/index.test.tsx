import React from 'react'
import {shallow} from 'enzyme'
import {OrderFormModalComponent} from '../index'

describe('<OrderFormModalComponent />', () => {
	it('renders <OrderFormModalComponent /> closed', () => {
		const wrapper = shallow(<OrderFormModalComponent />)
		expect(wrapper).toMatchSnapshot()
	})

	it('renders <OrderFormModalComponent /> opened', () => {
		const wrapper = shallow(<OrderFormModalComponent visible />)
		expect(wrapper).toMatchSnapshot()
	})

	it('renders <OrderFormModalComponent /> and expect to call handleCancelCb', () => {
		const onClose = jest.fn()
		const wrapper = shallow(
			<OrderFormModalComponent visible handleCancelCb={onClose} />
		)
		wrapper.find({'data-testid': 'CFMcancelButton'}).simulate('click')
		expect(onClose).toHaveBeenCalledTimes(1)
	})
})
