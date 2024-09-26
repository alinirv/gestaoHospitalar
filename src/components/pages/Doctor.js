import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importação do hook de navegação
import Header from '../utils/Header';
import Footer from '../utils/Footer';
import appointmentService from '../../service/AppointmentService';

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

  return (
    <div className="home-container">
      <Header />
      <div className="home-content">
        <h1>Painel do Médico</h1>
        <p>
          <h3>Bem-vindo ao seu painel. Aqui você pode gerenciar suas consultas e exames.</h3>
        </p>

        {/* Exibir notificação personalizada se houver consultas */}
        {showNotification && (
          <div className="error-message">
            <h1>Você tem {consultations.length} consulta(s) agendada(s).</h1>
            <button 
            className="login-btn"
            onClick={handleCheckAppointments}>Verificar</button>
          </div>
        )}

        <div className="login-container">
          <h2>Solicitar Exames</h2>
          <form action="/agendar-consulta" method="POST">
            <div className="form-group">
              <label htmlFor="exam">Exame</label>
              <input type="text" id="exam" name="exam" required />
            </div>

            <div className="form-group">
              <label htmlFor="patient">Paciente</label>
              <input type="text" id="patient" name="patient" required />
            </div>

            <div className="form-group">
              <label htmlFor="requestingDoctor">Médico Solicitante</label>
              <input type="text" id="requestingDoctor" name="requestingDoctor" required />
            </div>

            <button type="submit" className="login-btn">Solicitar Exame</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Doctor;
