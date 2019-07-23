import * as React from 'react'
import * as ReactDOM from 'react-dom'
import 'babel-polyfill'

import { App } from './app/app'

import './index.scss'

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/service-worker.js')
            .then((registration) => {
                console.log('SW registered: ', registration)
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError)
            })
    })
}

ReactDOM.render(<App />, document.getElementById('root'))
