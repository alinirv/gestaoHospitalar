// src/service/PatientService.js
import fileService from './fileService';
import authService from './authService';

const patientService = {
    // Obtém todos os pacientes do localStorage
    getPatients: () => {
        const patients = localStorage.getItem('patients');
        return patients ? JSON.parse(patients) : [];
    },

    // Adiciona um novo paciente ao localStorage
    addPatient: (patient) => {
        const patients = patientService.getPatients();
        patients.push(patient);
        localStorage.setItem('patients', JSON.stringify(patients));

        // Gera log de cadastro de paciente
        const timestamp = new Date().toLocaleString();
        const loggedUser  = authService.getCurrentUser ();
        const log = `[${timestamp}] - ${loggedUser .role} - ${loggedUser .username} - CADASTRO DE PACIENTE`;
        fileService.appendToFile(log, 'logs_pacientes.txt');
    },

    // Remove um paciente pelo ID
    removePatient: (id) => {
        let patients = patientService.getPatients();
        patients = patients.filter((patient) => patient.id !== id);
        localStorage.setItem('patients', JSON.stringify(patients));

        // Gera log de remoção de paciente
        const timestamp = new Date().toLocaleString();
        const loggedUser  = authService.getCurrentUser ();
        const log = `[${timestamp}] - ${loggedUser .role} - ${loggedUser .username} - REMOÇÃO DE PACIENTE`;
        fileService.appendToFile(log, 'logs_pacientes.txt');
    },

    // Atualiza um paciente pelo ID
    updatePatient: (updatedPatient) => {
        const patients = patientService.getPatients();
        const index = patients.findIndex((patient) => patient.id === updatedPatient.id);
        if (index !== -1) {
            patients[index] = updatedPatient;
            localStorage.setItem('patients', JSON.stringify(patients));

            // Gera log de atualização de paciente
            const timestamp = new Date().toLocaleString();
            const loggedUser  = authService.getCurrentUser ();
            const log = `[${timestamp}] - ${loggedUser .role} - ${loggedUser .username} - ATUALIZAÇÃO DE PACIENTE`;
            fileService.appendToFile(log, 'logs_pacientes.txt');
        }
    }
};

export default patientService;