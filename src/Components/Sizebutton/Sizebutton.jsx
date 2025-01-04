import React from 'react'
import './Sizebutton.css'

const Sizebutton = ({text , className,onFun}) => {
  return (
   <div className='size-button-box'>
        <button className={className} onClick={onFun}>{text}</button>
   </div>
  )
}

export default Sizebutton