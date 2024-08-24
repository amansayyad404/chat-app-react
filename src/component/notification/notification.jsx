import React from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function notification() {
  return (
    <div className=''>
      <ToastContainer position="bottom-right"></ToastContainer>
    </div>
  )
}

export default notification
