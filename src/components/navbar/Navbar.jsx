import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className='navbar-container'>
            <nav className='navbar'>
                <div className='hamburger' onClick={toggleMenu}>
                    <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                </div>
                <ul className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
                    <li>SHAPEWEAR</li>
                    <li>START</li>
                    <li>COLLECTIONS</li>
                </ul>
                <div className='navbar-icons-container'>
                    <FontAwesomeIcon icon={faUser} className='navbar-icon' />
                    <FontAwesomeIcon icon={faShoppingCart} className='navbar-icon' />
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
