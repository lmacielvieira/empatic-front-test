import React from 'react'
import {shallow} from 'enzyme'
import {SocialComponent} from '../index'

describe('<SocialComponent />', () => {
	it('renders <SocialComponent />', () => {
		const wrapper = shallow(<SocialComponent />)
		expect(wrapper).toMatchSnapshot()
	})
})
