import React, { useState, useEffect } from 'react';
import appointmentService from '../../service/AppointmentService';
import Header from '../utils/Header';
import Footer from '../utils/Footer';
import authService from '../../service/authService';

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    id: '',
    patientName: '',
    doctorName: '',
    date: '',
    status: 'Agendada',
  });

  // Obtem o nome do usuário logado
  const loggedUser = authService.getCurrentUser();

  useEffect(() => {
    // Carregar consultas ao montar o componente
    setAppointments(appointmentService.getAppointments());

    // Preencher automaticamente o nome do paciente com o nome do usuário logado
    if (loggedUser && loggedUser.username) {
      setNewAppointment((prevAppointment) => ({
        ...prevAppointment,
        patientName: loggedUser.username,
      }));
    }
  }, [loggedUser]);

  const handleAddAppointment = () => {
    if (newAppointment.patientName && newAppointment.doctorName && newAppointment.date) {
      // Gera um ID único para a consulta
      const newId = Date.now().toString();
      const appointmentToAdd = { ...newAppointment, id: newId };
      appointmentService.addAppointment(appointmentToAdd);
      setAppointments([...appointments, appointmentToAdd]);
      // Limpa o formulário, exceto o nome do paciente (usuário logado)
      setNewAppointment({
        id: '',
        patientName: loggedUser.username, // Mantém o nome do paciente
        doctorName: '',
        date: '',
        status: 'Agendada',
      });
    } else {
      alert('Preencha todos os campos!');
    }
  };

  const handleRemoveAppointment = (id) => {
    appointmentService.removeAppointment(id);
    setAppointments(appointments.filter((appointment) => appointment.id !== id));
  };

  return (
    <div className="home-container">
      <Header />
      <div className="home-content">
        <h1>Gerenciamento de Consultas</h1>
  
        {/* Formulário de Adição de Consultas */}
        <div className="login-container">
          <h2>Adicionar Nova Consulta</h2>
          <form onSubmit={handleAddAppointment}>
            <div className="form-group">
              <label for="patientName">Paciente</label>
              <input
                type="text"
                id="patientName"
                value={newAppointment.patientName}
                disabled // O campo de nome do paciente é preenchido automaticamente e desabilitado
                required
              />
            </div>
  
            <div className="form-group">
              <label for="doctorName">Nome do Médico</label>
              <input
                type="text"
                id="doctorName"
                value={newAppointment.doctorName}
                onChange={(e) => setNewAppointment({ ...newAppointment, doctorName: e.target.value })}
                required
              />
            </div>
  
            <div className="form-group">
              <label for="appointmentDate">Data e Hora</label>
              <input
                type="datetime-local"
                id="appointmentDate"
                value={newAppointment.date}
                onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                required
              />
            </div>
  
            <button type="submit" className="login-btn">Adicionar Consulta</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
  
};

export default Appointment;

