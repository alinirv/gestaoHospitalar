import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importação do hook de navegação
import Header from '../utils/Header';
import Footer from '../utils/Footer';
import appointmentService from '../../service/AppointmentService';
import authService from '../../service/authService';

const Doctor = () => {
  const [consultations, setConsultations] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    // Carregar consultas ao montar o componente
    const loadedAppointments = appointmentService.getAppointments();
    setConsultations(loadedAppointments);

    // Se houver consultas, exibir um aviso personalizado
    if (loadedAppointments.length > 0) {
      setShowNotification(true);
    }
  }, []);

  // Função para navegar para a página de logs de consultas
  const handleCheckAppointments = () => {
    navigate('/appointmentLogs');
  };

  const loggedUser = authService.getCurrentUser();

  return (
    <div className="home-container">
      <Header />
      <div className="home-content">
        <h1>Painel do Médico</h1>
        <h2>Bem-vindo(a) Dr.(a) {loggedUser.username}!</h2>
        <p>
          <h3>Bem-vindo ao seu painel. Aqui você pode gerenciar suas consultas e exames.</h3>
        </p>

        {/* Exibir notificação personalizada se houver consultas */}
        {showNotification && (
          <div className="error-message">
            <h2>Você tem {consultations.length} consulta(s) agendada(s).</h2>
            <button 
            className="login-btn"
            onClick={handleCheckAppointments}>Verificar</button>
          </div>
        )}
      </div><br />
      <div className="admin-buttons">
          <button className="login-btn" onClick={() => navigate('/exams')}>Solicitar Exames</button>
        </div>
      <Footer />
    </div>
  );
};

export default Doctor;
