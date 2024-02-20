import React from 'react';
import { Link,useLocation } from 'react-router-dom';
import './styles.css';

const Header = () => {
    const location = useLocation();
    const currentPath = location.pathname;  //current path of the url


    return(
        <div className='navbar'>
            <div className="grad"></div>
            <div className='links'>
                <Link to="/" className={currentPath === '/'?"active":""}>SignUp</Link>
                <Link to="/podcasts" className={currentPath === '/podcasts'?"active":""}>Podcasts</Link>
                <Link to="/start-a-podcast" className={currentPath === '/start-a-podcast'?"active":""}>Start a podcast</Link>
                <Link to="/profile" className={currentPath === '/profile'?"active":""}>Profile</Link>
            </div>
        </div>
    );
}

export default Header;