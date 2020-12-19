import React, {useState} from 'react'
import PropTypes, {InferProps} from 'prop-types'
import {Form, Input, Col, Button} from 'antd'
import t from 'typy'
import {SETTINGS} from '../../settings'
import './style.less'

export function LoginFormComponent({
	_componentName,
	emailPlaceholder,
	confirmLabel,
	passwordLabel,
	emailLabel,
	passwordPlaceholder,
	handleLoginSuccess
}: InferProps<typeof LoginFormComponent.propTypes>) {
	const [form] = Form.useForm()

	// -------------------------------------------------------------------------//
	// Hooks
	// -------------------------------------------------------------------------//

	const [shake, setShake] = useState(false)

	// -------------------------------------------------------------------------//
	// Effects
	// -------------------------------------------------------------------------//

	// -------------------------------------------------------------------------//
	// Requests
	// -------------------------------------------------------------------------//

	// -------------------------------------------------------------------------//
	// Event Handlers
	// -------------------------------------------------------------------------//

	const handleSubmitError = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
		setShake(true)
		setTimeout(() => {
			setShake(false)
		}, 1000)
	}

	const handleSubmit = (values: any) => {
		t(handleLoginSuccess).safeFunction(values)
	}

	// -------------------------------------------------------------------------//
	// Other functions
	// -------------------------------------------------------------------------//

	// -------------------------------------------------------------------------//
	// Rendering
	// -------------------------------------------------------------------------//

	const renderLabel = (text: string) => {
		return <span className={`${_componentName}-label`}>{text}</span>
	}

	return (
		<div className={`${_componentName}`}>
			<Form
				form={form}
				onFinish={handleSubmit}
				hideRequiredMark
				onFinishFailed={handleSubmitError}>
				<Form.Item
					label={renderLabel(`${emailLabel}`)}
					colon={false}
					name="email"
					labelCol={{offset: 1, span: 24}}
					validateTrigger={['onSubmit']}
					rules={[
						{
							type: 'email'
						},
						{
							required: true
						}
					]}>
					<Input
						className={`${_componentName}-input`}
						placeholder={`${emailPlaceholder}`}
					/>
				</Form.Item>
				<Form.Item
					label={renderLabel(`${passwordLabel}`)}
					colon={false}
					name="password"
					labelCol={{offset: 1, span: 24}}
					rules={[
						{
							required: true
						}
					]}>
					<Input.Password
						className={`${_componentName}-input`}
						placeholder={`${passwordPlaceholder}`}
					/>
				</Form.Item>
				<Col className={`${_componentName}-button-box`} xs={{span: 24}}>
					<Button
						className={`${_componentName}-confirm-button`}
						style={{
							animation: shake
								? 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both'
								: ''
						}}
						htmlType="submit">
						{confirmLabel}
					</Button>
				</Col>
			</Form>
		</div>
	)
}

// Component props and default prop values
LoginFormComponent.propTypes = {
	_componentName: PropTypes.string,
	emailPlaceholder: PropTypes.string,
	passwordPlaceholder: PropTypes.string,
	passwordLabel: PropTypes.string,
	confirmLabel: PropTypes.string,
	emailLabel: PropTypes.string,
	handleLoginSuccess: PropTypes.func,
	handleForgotPassword: PropTypes.func
}

LoginFormComponent.defaultProps = {
	_componentName: 'login-form',
	emailPlaceholder: SETTINGS.LoginFormComponent.emailPlaceholder,
	passwordPlaceholder: SETTINGS.LoginFormComponent.passwordPlaceholder,
	passwordLabel: SETTINGS.LoginFormComponent.passwordLabel,
	emailLabel: SETTINGS.LoginFormComponent.emailLabel,
	confirmLabel: SETTINGS.LoginFormComponent.confirmLabel,
	handleLoginSuccess: () => {},
	handleForgotPassword: () => {}
}
