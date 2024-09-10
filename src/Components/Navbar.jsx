import React from 'react'

const Navbar = () => {
  return (
    <div className='navbar'>
        <span className='logo'>WECHAT</span>
        <div className='user'>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNSq7guZXQyFGxoboL9qu59aQ3tdFVI9pjcsrz-kQHnYnzVtAX-NmMoJqmHPlWc0D2jKs&usqp=CAU' alt=''/>
            <span>Guru</span>
            <button>Logout</button>
        </div>
    </div>
  )
}

export default Navbar