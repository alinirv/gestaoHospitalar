import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../service/authService';

const Header = () => {
    const navigate = useNavigate();
    const role = authService.getCurrentUser();

    const handleLogout = (e) => {
        e.preventDefault(); // Previne o comportamento padrão do link
        authService.logout(navigate); // Chama o logout e redireciona para a página de login
    };

    return (
        <header className="home-header">
            <div className="system-name">
                <h1>GSH MediSys</h1>
                <p>Tecnologia e gestão unidas pela saúde.</p>
            </div>
            <nav className="nav-bar">
                <ul className="nav-list">
                    {role === 'admin' && (
                        <>
                            <li><Link to="/admin">Home</Link></li>
                            <li><Link to="/admin/gerenciar">Gerenciar Sistema</Link></li>
                            <li><Link to="/admin/logs">Visualizar Logs</Link></li>
                        </>
                    )}
                    {role === 'doctor' && (
                        <>
                        <li><Link to="/doctor">Home</Link></li>
                            <li><Link to="/medico/pacientes">Meus Pacientes</Link></li>
                            <li><Link to="/medico/consultas">Gerenciar Consultas</Link></li>
                            <li><Link to="/medico/exames">Gerenciar Exames</Link></li>
                        </>
                    )}
                    {role === 'patient' && (
                        <>
                        <li><Link to="/patient">Home</Link></li>
                            <li><Link to="/paciente/consultas">Minhas Consultas</Link></li>
                            <li><Link to="/paciente/exames">Meus Exames</Link></li>
                        </>
                    )}
                    <li><a href="/login" className="logout-link" onClick={handleLogout}>Sair</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;