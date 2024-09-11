import React from 'react'
import Cam from '../img/cam.png'
import Add from '../img/add.png'
import More from '../img/more.png'
import Messages from './Messages'
import Input from './Input'

const ChatDisplay = () => {
  return (
    <div className='chatdisplay'> 
      <div className="chatInfo">
        <span>Arsh</span>
        <div className="chatIcons">
          <img src={Cam} alt=''/>
          <img src={Add} alt=''/>
          <img src={More} alt=''/>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default ChatDisplay