import React from 'react'
import {shallow} from 'enzyme'
import {HeaderComponent} from '../index'

describe('<HeaderComponent />', () => {
	it('renders <HeaderComponent />', () => {
		const wrapper = shallow(<HeaderComponent />)
		expect(wrapper).toMatchSnapshot()
	})
})
