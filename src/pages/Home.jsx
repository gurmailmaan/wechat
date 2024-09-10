import React from 'react'
import Sidebar from '../Components/Sidebar'
import ChatDisplay from '../Components/ChatDisplay'

 const Home = () => {
  return (
    <div className='home'>
        <div className="container">
        <Sidebar/>
        <ChatDisplay/>
        </div>
    </div>
  )
}

export default Home;