import React from 'react';


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
        <p  className="login-btn">Entrar</p>
        </div>
        <div className="user-info">
          <p>Usuários Administradores podem gerenciar o sistema e visualizar logs de atividades.</p>
          <p>Os Médicos podem acessar seus pacientes e gerenciar consultas e exames.</p>
          <p>Os Pacientes podem acompanhar suas consultas e resultados de exames.</p>
        </div>
      </div>

      <footer className="home-footer">
        <p>&copy; 2024 Sistema de Gestão Hospitalar. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;