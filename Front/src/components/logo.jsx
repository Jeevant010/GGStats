import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <div className='z-50 px-6 py-2 fixed cursor-pointer top-1 flex'>
      <Link to='/' className='flex items-center'>
        <img
          src="https://t3.ftcdn.net/jpg/12/82/15/68/240_F_1282156894_dJTHOpUEf1Oi8PmH9l7PRNNob17ykOSY.jpg"
          alt="GGStats logo"className='w-8 h-8 object-contain'
        />
        <span className='text-white text-xl font-bold my-2 mx-3'>GGStats</span>
      </Link>
    </div>
  )
}

export default Logo