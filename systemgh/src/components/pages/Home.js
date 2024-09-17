import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../pages/Footer';

const Home = () => {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Bem-vindo ao Sistema de Gestão Hospitalar</h1>
                <p>Aqui você pode gerenciar consultas, exames e muito mais.</p>
            </header>

            <div className="home-content">
                <h2>Acesse sua conta</h2>
                <div className="login-options">
                    <Link to="/login" className="login-btn">Entrar</Link>
                </div>
                <div className="user-info">
                    <p>Usuários Administradores podem gerenciar o sistema e visualizar logs de atividades.</p>
                    <p>Os Médicos podem acessar seus pacientes e gerenciar consultas e exames.</p>
                    <p>Os Pacientes podem acompanhar suas consultas e resultados de exames.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
