import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './institute/Main'
import List from './institute/List'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <List />
  </React.StrictMode>,
)
