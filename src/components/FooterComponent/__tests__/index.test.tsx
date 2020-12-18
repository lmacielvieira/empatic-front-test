import React from 'react'
import {shallow} from 'enzyme'
import {FooterComponent} from '../index'

describe('<FooterComponent />', () => {
	it('renders <FooterComponent />', () => {
		const wrapper = shallow(<FooterComponent />)
		expect(wrapper).toMatchSnapshot()
	})
})
