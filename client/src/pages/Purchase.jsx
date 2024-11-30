import React from 'react'
import {useNavigate } from 'react-router-dom'

const Purchase = () => {

  const navigate = useNavigate();
  return (
    <div className='min-h-[60vh]'> 
        <h1 className='text-center text-4xl font-weight-80 font-bold'>Message</h1>
        <p className='text-1.5xl max-w-25 my-5 py-5 px-10 shadow-xl border rounded-lg'>Thank you for using our service! To continue enjoying unlimited credits on <span className='text-blue-600 cursor-pointer' onClick={()=>{navigate('/')}}>IMAGIFY</span>, please note that you have a limited number of free credits. If you'd like to purchase more credits, kindly contact the admin for assistance. For users who have forgotten their password, you can reset it by reaching out to the admin for support. Our team is available to help you with both purchasing credits and resetting your password. We are committed to ensuring you have a seamless experience with our platform. Please don’t hesitate to get in touch for further assistance.</p>
    </div>
  )
}

export default Purchase