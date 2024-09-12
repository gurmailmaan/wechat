import React, { useContext, useState } from "react";
import Img from "../img/img.png"
import Attach from "../img/attach.png"
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  return (
    <div className='input'>
        <input type="text" placeholder='Type Something....'/>
        <div className="send">
            <img src={Attach} alt='' />
            <input type='file' style={{display:"none"}} id='file' />
            <label htmlFor='file'>
                <img src={Img} alt='' />
            </label>
            <button>Send</button>
        </div>
    </div>
  )
}

export default Input