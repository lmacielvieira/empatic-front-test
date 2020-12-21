import React from 'react'
import PropTypes, {InferProps} from 'prop-types'
import {Form, Modal, Input, Button, Select} from 'antd'
import t from 'typy'
import {SETTINGS} from '../../settings'
import './style.less'

const {Option} = Select

export function OrderFormModalComponent({
	_componentName,
	visible,
	title,
	handleEditCb,
	handleCancelCb,
	refLabel,
	statusLabel,
	cancelBtnLabel,
	saveBtnLabel,
	item,
	options
}: InferProps<typeof OrderFormModalComponent.propTypes>) {
	// -------------------------------------------------------------------------//
	// Hooks
	// -------------------------------------------------------------------------//
	const [form] = Form.useForm()

	// -------------------------------------------------------------------------//
	// Effects
	// -------------------------------------------------------------------------//

	// -------------------------------------------------------------------------//
	// Requests
	// -------------------------------------------------------------------------//

	// -------------------------------------------------------------------------//
	// Event Handlers
	// -------------------------------------------------------------------------//

	const handleSubmitError = (errorInfo: string) => {
		console.log('Failed:', errorInfo)
	}

	// -------------------------------------------------------------------------//
	// Rendering
	// -------------------------------------------------------------------------//

	const renderLabel = (text: string) => {
		return <span className={`${_componentName}-label defaultText`}>{text}</span>
	}

	return (
		<Modal
			wrapClassName={`${_componentName}`}
			title={title}
			visible={t(visible).safeBoolean}
			closable={false}
			footer={null}
			onCancel={t(handleCancelCb).safeFunction}>
			<Form
				form={form}
				data-testid="CFMform"
				onFinish={(values) => {
					t(handleEditCb).safeFunction({...item, ...values})
				}}
				hideRequiredMark
				initialValues={{
					ref: item ? item.ref : undefined,
					status: item ? item.status : undefined
				}}
				onFinishFailed={t(handleSubmitError).safeFunction}>
				<div className={`${_componentName}-wrapper`}>
					<Form.Item
						label={renderLabel(t(refLabel).safeString)}
						colon={false}
						name="ref"
						labelCol={{offset: 0, span: 24}}>
						<Input
							data-testid="CFMnameButton"
							className={`${_componentName}-input`}
							placeholder={' '}
							disabled
						/>
					</Form.Item>

					<Form.Item
						label={renderLabel(t(statusLabel).safeString)}
						colon={false}
						name="status"
						labelCol={{offset: 0, span: 24}}
						validateTrigger={['onSubmit']}
						rules={[
							{
								required: true
							}
						]}>
						<Select className={`${_componentName}-select`} placeholder={' '}>
							{t(options).safeArray.map((option) => (
								<Option key={option} value={option}>
									{option}
								</Option>
							))}
						</Select>
					</Form.Item>
				</div>
				<div className={`${_componentName}-footer`}>
					<Button
						data-testid="CFMcancelButton"
						className="cancelBtn"
						type="ghost"
						onClick={t(handleCancelCb).safeFunction}>
						{cancelBtnLabel}
					</Button>
					<Button
						data-testid="CFMsubmitButton"
						className="okBtn"
						type="primary"
						htmlType="submit">
						{saveBtnLabel}
					</Button>
				</div>
			</Form>
		</Modal>
	)
}

// Component props and default prop values
OrderFormModalComponent.propTypes = {
	_componentName: PropTypes.string,
	title: PropTypes.string,
	handleEditCb: PropTypes.func,
	refLabel: PropTypes.string,
	statusLabel: PropTypes.string,
	handleCancelCb: PropTypes.func,
	visible: PropTypes.bool,
	cancelBtnLabel: PropTypes.string,
	saveBtnLabel: PropTypes.string,
	options: PropTypes.arrayOf(PropTypes.string),
	item: PropTypes.any
}

OrderFormModalComponent.defaultProps = {
	_componentName: 'order-form-modal-component',
	visible: false,
	title: SETTINGS.OrderFormModalComponent.title,
	handleEditCb: () => {},
	handleCancelCb: () => {},
	refLabel: SETTINGS.OrderFormModalComponent.refLabel,
	statusLabel: SETTINGS.OrderFormModalComponent.statusLabel,
	cancelBtnLabel: SETTINGS.OrderFormModalComponent.cancelBtnLabel,
	saveBtnLabel: SETTINGS.OrderFormModalComponent.saveBtnLabel,
	options: SETTINGS.OrderFormModalComponent.options,
	item: {}
}
