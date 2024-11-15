// src/service/PatientService.js
import fileService from './fileService';
import authService from './authService';

const logService = {
    // Função para gerar logs genéricos
    logAction: (action, userType) => {
        const timestamp = new Date().toLocaleString();
        const loggedUser = authService.getCurrentUser();

        const log = `[${timestamp}] - ${loggedUser.role} - ${loggedUser.username} - ${action} - ${userType}`;
        const logFileName = `logs_${userType.toLowerCase()}.txt`;

        // Salva o log no arquivo correto
        fileService.appendToFile(log, logFileName);
    }
};

const userService = {

    
   
    // Função para obter usuários de um tipo específico (pacientes, médicos, etc.)
    getUsers: (userType) => {
        const users = localStorage.getItem('cadastro_'+userType);
        return users ? JSON.parse(users) : [];
    },

    // Função para adicionar um novo usuário
    addUser: (user, userType) => {
        const users = userService.getUsers(userType);
        users.push(user);
        localStorage.setItem('cadastro_'+userType, JSON.stringify(users));

        // Gera o log de cadastro
        logService.logAction('CADASTRO', userType);
    },

    // Função para remover um usuário pelo ID
    removeUser: (id, userType) => {
        let users = userService.getUsers(userType);
        users = users.filter((user) => user.id !== id);
        localStorage.setItem(userType, JSON.stringify(users));

        // Gera o log de remoção
        logService.logAction('REMOÇÃO', userType);
    },

    // Função para atualizar um usuário
    updateUser: (updatedUser, userType) => {
        const users = userService.getUsers(userType);
        const index = users.findIndex((user) => user.id === updatedUser.id);
        if (index !== -1) {
            users[index] = updatedUser;
            localStorage.setItem(userType, JSON.stringify(users));

            // Gera o log de atualização
            logService.logAction('ATUALIZAÇÃO', userType);
        }
    }

};

export default userService;