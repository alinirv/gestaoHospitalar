import React, { useState, useEffect } from 'react';
import examService from '../../service/ExamService';
import Header from '../utils/Header';
import Footer from '../utils/Footer';
import authService from '../../service/authService'; // Supondo que a função vem desse serviço

const Exam = () => {
  const [exams, setExams] = useState([]);
  const [newExam, setNewExam] = useState({
    id: '',
    patientName: '',
    doctorName: '',
    examName: '',
    status: 'Solicitado',
  });

  // Obtem o nome do usuário logado (médico)
  const loggedUser = authService.getCurrentUser();

  useEffect(() => {
    // Carregar exames ao montar o componente
    setExams(examService.getExams());

    // Preencher automaticamente o nome do médico com o nome do usuário logado
    if (loggedUser && loggedUser.username) {
      setNewExam((prevExam) => ({
        ...prevExam,
        doctorName: loggedUser.username,
      }));
    }
  }, [loggedUser]);

  const handleAddExam = () => {
    if (newExam.patientName && newExam.doctorName && newExam.examName) {
      // Gera um ID único para o exame
      const newId = Date.now().toString();
      const examToAdd = { ...newExam, id: newId };
      examService.addExam(examToAdd);
      setExams([...exams, examToAdd]);
      // Limpa o formulário, exceto o nome do médico
      setNewExam({
        id: '',
        patientName: '',
        doctorName: loggedUser.username, // Mantém o nome do médico
        examName: '',
        status: 'Solicitado',
      });
    } else {
      alert('Preencha todos os campos!');
    }
  };

  const handleRemoveExam = (id) => {
    examService.removeExam(id);
    setExams(exams.filter((exam) => exam.id !== id));
  };

  return (
    <div className="home-container">
      <Header />
      <div className="home-content">
        <h1>Solicitação de Exames</h1>
  
        {/* Formulário de Solicitação de Exames */}
        <div className="login-container">
          <h2>Solicitar Novo Exame</h2>
          <form onSubmit={handleAddExam}>
            <div className="form-group">
              <label for="doctorName">Médico</label>
              <input
                type="text"
                id="doctorName"
                value={newExam.doctorName}
                disabled // O campo de nome do médico é preenchido automaticamente e desabilitado
                required
              />
            </div>
  
            <div className="form-group">
              <label for="patientName">Nome do Paciente</label>
              <input
                type="text"
                id="patientName"
                value={newExam.patientName}
                onChange={(e) => setNewExam({ ...newExam, patientName: e.target.value })}
                required
              />
            </div>
  
            <div className="form-group">
              <label for="examName">Nome do Exame</label>
              <input
                type="text"
                id="examName"
                value={newExam.examName}
                onChange={(e) => setNewExam({ ...newExam, examName: e.target.value })}
                required
              />
            </div>
  
            <button type="submit" className="login-btn">Solicitar Exame</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
  
};

export default Exam;
