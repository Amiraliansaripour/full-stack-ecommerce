import React from 'react'
import './Loader.css'
import loaderImage from '../../assets/images/ajax-loading-icon-18.jpg'
import ReactDOM from 'react-dom'
const Loader = () => {

  return ReactDOM.createPortal(
    <div className="container">
        <div className="loading">
            <img src={loaderImage} alt="Loading..." />
        </div>
    </div> ,
    document.getElementById("loader")
  )
}

export default Loader