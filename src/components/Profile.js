import { signOut } from 'firebase/auth';
import React from 'react'
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Profile = () => {

  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="profile">
      <h1>Welcome to Stories Hub,</h1>
      <h2>{user && user.email}</h2>
      <button onClick={handleLogout}>Logout</button>
      <Link to="/posts">Go back to the posts</Link>
    </div>
  )
}

export default Profile