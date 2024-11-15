import Header from '../utils/Header';
import Footer from '../utils/Footer';
import { useNavigate } from 'react-router-dom';



const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Header />
      <div className="home-content">
        <h1>Painel do Administrador</h1>
        <p>Bem-vindo ao seu painel. Aqui você pode gerenciar o sistema e visualizar logs de usuários.</p>
        <div className="registration-container">
          <h3>Gerenciamento de Logs: </h3>
          {/* Botões para acessar os logs */}
          <div className="admin-buttons">
            <button className="login-btn" onClick={() => navigate('/accesslogs')}>Logs de Acessos</button>
            <button className="login-btn" onClick={() => navigate('/appointmentLogs')}>Logs de Consultas</button>
            <button className="login-btn" onClick={() => navigate('/appointmentLogs')}>Logs de Exames</button>
          </div>
        </div>
        <div className="registration-container">
          <h3>Gerenciamento de Pacientes: </h3>
          {/* Botões para gerenciar Pecientes */}
          <div className="admin-buttons">
            <button className="login-btn" onClick={() => navigate('/PatientRegistration')}>Cadastro de Pacientes</button>
            <button className="login-btn" onClick={() => navigate('/accesslogs')}>Listar Pacientes</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
