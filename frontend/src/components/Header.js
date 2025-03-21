import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.png';
import { FaUserCircle } from 'react-icons/fa'; // Ícone para o login

function Header() {
    return (
        <header className="header">
            <div className="container-menu">
                <div className="logo-container">
                    <img src={logo} alt="TopsDoJob Logo" className="logo" />
                </div>
                <nav className="nav-links">
                    <Link to="/sobre">Sobre Nós</Link>
                    <Link to="/planos">Planos</Link>
                </nav>
                <div className="auth-links">
                    <Link to="/login" className="login-link">
                        <FaUserCircle className="login-icon" /> Conecte-se
                    </Link>
                    <span className="divider">|</span>
                    <Link to="/register" className="register-link">Registrar</Link>
                    <Link to="/publicar" className="btn-publicar">Publicar Anúncio +</Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
