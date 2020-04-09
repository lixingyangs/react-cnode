import React from 'react'
import ReactDom from 'react-dom'
import App from './App.jsx'

// ReactDom.render(<App />, document.getElementById('#root'))
// ReactDom.hydrate(<App />, document.getElementById('#root'))

if(module.hot) {
    debugger
    module.hot.accept('./App.jsx', () => {
        const  NextApp = require('./App.jsx').default
        ReactDom.hydrate(<NextApp />, document.getElementById('#root'))
    })
}