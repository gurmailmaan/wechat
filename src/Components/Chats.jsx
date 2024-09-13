import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { ChatContext } from '../context/ChatContext';

const Chats = () => {
  const [chats, setChats] = useState({}); // Initialize chats as an empty object

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      if (!currentUser?.uid) {
        // If currentUser is null (logged out), reset chats
        setChats({});
        return;
      }

      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        setChats(doc.data() || {}); // Safely handle if no chat data exists
      });

      return () => {
        unsub();
      };
    };

    getChats(); // Call the function to get chats or reset if no user
  }, [currentUser]);

  const handleSelect = (u) => {
    dispatch({ type: 'CHANGE_USER', payload: u });
  };

  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date) // Sort by date
        .map((chat) => (
          <div
            className="userChat"
            key={chat[0]} // Use chat ID as the key
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img src={chat[1].userInfo.photoURL} alt="" />
            <div className="userChatInfo">
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;