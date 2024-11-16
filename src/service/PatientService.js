import userService from './UserService';


const patientService = {
    // Função para obter todos os pacientes
    getPatients: () => {
        return userService.getUsers('patient');
    },

    // Função para adicionar um novo paciente
    addPatient: (patient) => {
        userService.addUser(patient);
    },

    // Função para remover um paciente
    removePatient: (id) => {
        userService.removeUser(id, 'patients');
    },

    // Função para buscar por id
    getPatientById: (id) => {
        return userService.getUserById(id);
    },

    // Função para atualizar um paciente
    updatePatient: (updatedPatient) => {
        return userService.updateUser(updatedPatient, 'patients');
    }
};

export default patientService;
