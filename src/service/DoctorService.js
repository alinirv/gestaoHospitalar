import userService from './UserService';


const doctorService = {
    // Função para obter todos os médicos
    getDoctors: () => {
        return userService.getUsers('doctor');
    },

    // Função para adicionar um novo médico
    addDoctor: (doctor) => {
        userService.addUser(doctor);
    },

    // Função para remover um médico
    removeDoctor: (id) => {
        userService.removeUser(id, 'doctors');
    },

    // Função para buscar por id
    getDoctorById: (id) => {
        return userService.getUserById(id);
    },

    // Função para atualizar um médico
    updateDoctor: (updatedDoctor) => {
        return userService.updateUser(updatedDoctor, 'doctors');
    }
};

export default doctorService;
