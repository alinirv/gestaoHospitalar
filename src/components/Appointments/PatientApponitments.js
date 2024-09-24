import React, { useState, useEffect } from 'react';
import appointmentService from '../../service/AppointmentService';
import Header from '../utils/Heder';
import Footer from '../utils/Footer';
import authService from '../../service/authService'; // Supondo que a função vem desse serviço

const PatientAppointments = () => {
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
        patientName: loggedUser.name, // Mantém o nome do paciente
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
        <div className="appointment-form">
          <h3>Adicionar Nova Consulta</h3>
          <input
            type="text"
            value={newAppointment.patientName}
            disabled // O campo de nome do paciente é preenchido automaticamente e desabilitado
          />
          <input
            type="text"
            placeholder="Nome do Médico"
            value={newAppointment.doctorName}
            onChange={(e) => setNewAppointment({ ...newAppointment, doctorName: e.target.value })}
          />
          <input
            type="datetime-local"
            value={newAppointment.date}
            onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
          />
          <button onClick={handleAddAppointment}>Adicionar Consulta</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PatientAppointments;

