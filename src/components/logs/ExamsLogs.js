import React, { useEffect, useState } from 'react';
import Header from '../utils/Header';
import Footer from '../utils/Footer';
import examService from '../../service/ExamService';

const ExamsLogs = () => {
    const [exams, setExams] = useState([]);

    useEffect(() => {
      // Carregar exames ao montar o componente
      setExams(examService.getExams());
    }, []);
  
    return (
      <div className="home-container">
        <Header />
        <div className="home-content">
          <h1>Logs de Exames</h1>
  
          {/* Tabela de Exames */}
          <table className="logs-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome do Paciente</th>
                <th>Nome do Médico</th>
                <th>Nome do Exame</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam) => (
                <tr key={exam.id}>
                  <td>{exam.id}</td>
                  <td>{exam.patientName}</td>
                  <td>{exam.doctorName}</td>
                  <td>{exam.examName}</td>
                  <td>{exam.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Footer />
      </div>
    );
};

export default ExamsLogs;
