import React from 'react';
import Header from '../utils/Heder';
import Footer from '../utils/Footer';
import { useNavigate } from 'react-router-dom';


const Patient = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Header />
      <div className="home-content">
        <h1>Painel do Paciente</h1>
        <p><h3>Bem-vindo ao seu painel. Aqui você pode agendar suas consultas e acompanhar seus exames.</h3></p>
      </div>

      <div className="admin-buttons">
      <button className="login-btn" onClick={() => navigate('/AppointmentScheduling')}>Agendar Consultas</button>
      </div>

      
      <Footer />
    </div>
  );
};

export default Patient;