import React from 'react'

const Search = () => {
  return (
    <div className='search'>
        <div className="searchform">
            <input type='text' placeholder='Find a user'/>    
        </div>
        <div className="userChat">
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNSq7guZXQyFGxoboL9qu59aQ3tdFVI9pjcsrz-kQHnYnzVtAX-NmMoJqmHPlWc0D2jKs&usqp=CAU'alt=''/>
            <div className='userChatInfo'>
                <span>Arsh</span>
            </div>
        </div>
    </div>
  )
}

export default Search