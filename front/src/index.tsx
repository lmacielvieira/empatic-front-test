/* eslint-env browser */
import React from 'react'
import ReactDOM from 'react-dom'
import {ConnectedRouter} from 'connected-react-router'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {Spin} from 'antd'
import * as Sentry from '@sentry/react'
import {Integrations} from '@sentry/tracing'
import {store, persistor, history} from './redux/store'
import './styles/globalStyle.less'
import Manager from './pages/Manager'
import reportWebVitals from './reportWebVitals'

Sentry.init({
	dsn:
		'https://c2d400bf88d04e92ab234bf70ec71e82@o466555.ingest.sentry.io/5480963',
	integrations: [new Integrations.BrowserTracing()],
	tracesSampleRate: 1.0
})

const reduxLoading = (
	<div>
		<Spin size="large" />
	</div>
)

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={reduxLoading} persistor={persistor}>
			<ConnectedRouter history={history}>
				<Manager />
			</ConnectedRouter>
		</PersistGate>
	</Provider>,
	document.getElementById('root')
)

// expose store when run in Cypress
// @ts-ignore
if (window.Cypress) {
	// @ts-ignore
	window.store = store
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
