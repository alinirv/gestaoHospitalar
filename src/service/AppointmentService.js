import fileService  from './fileService';
import authService from './authService';

const appointmentService = {


    // Obtém todas as consultas do localStorage
    getAppointments: () => {
      const appointments = localStorage.getItem('appointments');
      return appointments ? JSON.parse(appointments) : [];
    },
  
    // Adiciona uma nova consulta ao localStorage
    addAppointment: (appointment) => {
      const appointments = appointmentService.getAppointments();
      appointments.push(appointment);
      localStorage.setItem('appointments', JSON.stringify(appointments));

      //gera log de agendamento
      const timestamp = new Date().toLocaleString();
      const loggedUser = authService.getCurrentUser();
      const log = `[${timestamp}] - ${loggedUser.role} - AGENDAMENTO`;
      fileService.appendToFile(log, 'logs_appointments.txt');
    },
  
    // Remove uma consulta pelo ID
    removeAppointment: (id) => {
      let appointments = appointmentService.getAppointments();
      appointments = appointments.filter((appointment) => appointment.id !== id);
      localStorage.setItem('appointments', JSON.stringify(appointments));
      //gera log de agendamento
      const timestamp = new Date().toLocaleString();
      const loggedUser = authService.getCurrentUser();
      const log = `[${timestamp}] - ${loggedUser.role} - CANCELAMENTO`;
      fileService.appendToFile(log, 'logs_appointments.txt');
    },
  
    // Atualiza uma consulta pelo ID
    updateAppointment: (updatedAppointment) => {
      const appointments = appointmentService.getAppointments();
      const index = appointments.findIndex((appointment) => appointment.id === updatedAppointment.id);
      if (index !== -1) {
        appointments[index] = updatedAppointment;
        localStorage.setItem('appointments', JSON.stringify(appointments));
      }
    }
  };
  
  export default appointmentService;
  