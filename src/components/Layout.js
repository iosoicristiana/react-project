import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const Layout = () => {
    const token = localStorage.getItem('token')
    return (
       (token ? <Outlet /> : <Navigate to="/login" />)
    )
}

export default Layout