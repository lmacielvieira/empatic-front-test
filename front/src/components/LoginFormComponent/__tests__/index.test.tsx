import React from 'react'
import {shallow} from 'enzyme'
import {LoginFormComponent} from '../index'

describe('<LoginFormComponent />', () => {
	it('renders <LoginFormComponent />', () => {
		const wrapper = shallow(<LoginFormComponent />)
		expect(wrapper).toMatchSnapshot()
	})
})
