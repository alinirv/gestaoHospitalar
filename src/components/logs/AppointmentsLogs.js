import React, { useEffect, useState } from 'react';
import Header from '../utils/Heder';
import Footer from '../utils/Footer';
import appointmentService from '../../service/AppointmentService';


const AppointmentsLogs = () => {
    const [consultations, setConsultations] = useState([]);

    useEffect(() => {
      // Carregar consultas ao montar o componente
      setConsultations(appointmentService.getAppointments());
    }, []);
  
    return (
      <div className="home-container">
        <Header />
        <div className="home-content">
          <h1>Logs de Consultas</h1>
  
          {/* Tabela de Consultas */}
          <table className="logs-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome do Paciente</th>
                <th>Nome do Médico</th>
                <th>Data</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {consultations.map((consultation) => (
                <tr key={consultation.id}>
                  <td>{consultation.id}</td>
                  <td>{consultation.patientName}</td>
                  <td>{consultation.doctorName}</td>
                  <td>{new Date(consultation.date).toLocaleString()}</td>
                  <td>{consultation.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Footer />
      </div>
    );
};

export default AppointmentsLogs;
