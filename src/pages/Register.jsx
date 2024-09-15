import React, { useState } from 'react';
import Add from '../img/addavatar.svg';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [err, setErr] = useState(null); // Store error messages
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        // Validate input fields
        if (!displayName || !email || !password || !file) {
            setErr('All fields are required.');
            return;
        }

        if (password.length < 8) {
            setErr('Password should be at least 8 characters long.');
            return;
        }

        setLoading(true);
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);

            const storageRef = ref(storage, `avatars/${displayName}`);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                (error) => {
                    setErr('Failed to upload avatar.');
                    setLoading(false);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        try {
                            await updateProfile(res.user, {
                                displayName,
                                photoURL: downloadURL,
                            });
                            await setDoc(doc(db, 'users', res.user.uid), {
                                uid: res.user.uid,
                                displayName,
                                email,
                                photoURL: downloadURL,
                            });

                            await setDoc(doc(db, 'userChats', res.user.uid), {});
                            navigate('/');
                        } catch (err) {
                            setErr('Failed to update profile or save data.');
                        } finally {
                            setLoading(false);
                        }
                    });
                }
            );

        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                setErr('Email already exists.');
            } else {
                setErr('Failed to create account.');
            }
            setLoading(false);
        }
    };

    return (
        <div className='formContainer'>
            <div className='formWrapper'>
                <span className='logo'>WECHAT</span>
                <span className='title'>Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Display name' />
                    <input type="email" placeholder='Email' />
                    <input type="password" placeholder='Password' />
                    <input style={{ display: "none" }} type="file" id='file' />
                    <label htmlFor='file'>
                        <img src={Add} alt="Add Avatar" />
                        <span>Add an Avatar</span>
                    </label>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                    {err && <span className='error'>{err}</span>}
                </form>
                <p>Do you have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
}

export default Register;
