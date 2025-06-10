import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';
import AuthModal from '../Modals/RegisterModal';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleAuthModal = () => {
        setIsAuthModalOpen(!isAuthModalOpen);
    };

    const handleLoginSuccess = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
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
                    {user ? (
                        <div className="user-profile">
                            <span>Hola, {user.name}</span>
                            <button onClick={handleLogout} className="logout-btn">
                                Cerrar sesión
                            </button>
                        </div>
                    ) : (
                        <FontAwesomeIcon 
                            icon={faUser} 
                            className='navbar-icon' 
                            onClick={toggleAuthModal}
                        />
                    )}
                    <FontAwesomeIcon icon={faShoppingCart} className='navbar-icon' />
                </div>
            </nav>

            <AuthModal 
                isOpen={isAuthModalOpen} 
                onClose={toggleAuthModal}
                onLoginSuccess={handleLoginSuccess}
            />
        </div>
    );
};

export default Navbar;