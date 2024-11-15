import userService from './UserService';


const patientService = {
    // Função para obter todos os pacientes
    getPatients: () => {
        return userService.getUsers('patients');
    },

    // Função para adicionar um novo paciente
    addPatient: (patient) => {
        userService.addUser(patient, 'patients');
    },

    // Função para remover um paciente
    removePatient: (id) => {
        userService.removeUser(id, 'patients');
    },

    // Função para atualizar um paciente
    updatePatient: (updatedPatient) => {
        userService.updateUser(updatedPatient, 'patients');
    }
};

export default patientService;
