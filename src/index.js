import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { App } from './App'

ReactDOM.render(
  <React.StrictMode /* basename={process.env.PUBLIC_URL} */>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

// BrowserRouter -> HashRouter
