import React from 'react'
import {shallow} from 'enzyme'
import {OrderTableComponent} from '../index'

describe('<OrderTableComponent />', () => {
	it('renders <OrderTableComponent />', () => {
		const wrapper = shallow(<OrderTableComponent />)
		expect(wrapper).toMatchSnapshot()
	})
})
