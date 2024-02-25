import { Link } from 'react-router-dom'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  return (
    <nav className='navbar'>
      <>
        <h1>StoriesHub</h1>
        <div className="navContent">
          <div className="navLinks">
            <Link to="/posts">Posts</Link>
            <Link to="/post">Create</Link>
             {
                user ? (
                    <Link to="/Profile"> Your Profile</Link>
                )
                :
                (
                    <Link to="/login">Login</Link>
                )
                
             }


          </div>
        </div>
      </>
    </nav>
  )
}

export default Navbar