import React, { useContext } from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect user to login page after signing out
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className='navbar'>
      <span className='logo'>WECHAT</span>
      <div className='user'>
        {currentUser && (
          <>
            <img src={currentUser.photoURL} alt='' />
            <span>{currentUser.displayName}</span>
            <button onClick={handleSignOut}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;