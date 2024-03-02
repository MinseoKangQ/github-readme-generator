import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Body from './Body/Body'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header/>
    <Body/>
    <Footer/>
  </React.StrictMode>,
)
