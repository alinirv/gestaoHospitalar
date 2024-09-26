import React, { useEffect, useState } from 'react';
import Header from '../utils/Header';
import Footer from '../utils/Footer';
import { useNavigate } from 'react-router-dom';
import examService from '../../service/ExamService'; // Serviço para obter os exames

const Patient = () => {
  const [exams, setExams] = useState([]); // Estado para armazenar exames
  const [showNotification, setShowNotification] = useState(false); // Estado para controlar a exibição da notificação
  const navigate = useNavigate();

  useEffect(() => {
    // Carregar exames ao montar o componente
    const loadedExams = examService.getExams(); // Simulação de carregamento dos exames
    setExams(loadedExams);

    // Se houver exames, exibir notificação
    if (loadedExams.length > 0) {
      setShowNotification(true);
    }
  }, []);

  // Função para navegar para a página de logs de exames
  const handleCheckExams = () => {
    navigate('/examsLogs');
  };

  return (
    <div className="home-container">
      <Header />
      <div className="home-content">
        <h1>Painel do Paciente</h1>
        <p><h3>Bem-vindo ao seu painel. Aqui você pode agendar suas consultas e acompanhar seus exames.</h3></p>

        {/* Exibir notificação personalizada se houver exames */}
        {showNotification && (
          <div className="error-message">
            <h1>Você tem {exams.length} exame(s) agendado(s).</h1>
            <button 
              className="login-btn"
              onClick={handleCheckExams}>Verificar</button>
          </div>
        )}
      </div><br></br>

      <div className="admin-buttons">
        <button className="login-btn" onClick={() => navigate('/appointmentScheduling')}>Agendar Consultas</button>
      </div>

      <Footer />
    </div>
  );
};

export default Patient;
