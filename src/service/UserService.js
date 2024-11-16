import fileService from './fileService';
import authService from './authService';

const userService = {
    // Função para obter todos os usuários por tipo
    getUsers: (role) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const filteredUsers = users.filter(user => {
            const trimmedRole = user.role.trim(); // Limpeza de espaços
            return trimmedRole === role;
        });

        console.log("Usuários filtrados:", filteredUsers);

        return filteredUsers;
    },

    // Função para obter um usuário pelo ID
    getUserById: (id) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        return users.find((user) => user.id === id);
    },

    // Função para adicionar um novo usuário
    addUser: (user) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        // Registro de log
        logAction('CADASTRO', user);
    },

    // Função para atualizar um usuário existente
    updateUser: (updatedUser) => {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const index = users.findIndex((user) => user.id === updatedUser.id);
        if (index !== -1) {
            users[index] = updatedUser;
            localStorage.setItem('users', JSON.stringify(users));

            // Registro de log
            logAction('EDIÇÃO', updatedUser);
        }
    },

    // Função para remover um usuário pelo ID
    removeUser: (id, role) => {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users = users.filter((user) => user.id !== id);
        localStorage.setItem('users', JSON.stringify(users));

        // Registro de log
        logAction('DELETE', role);
    },
};

// Função para registrar logs de todas as ações
const logAction = (action, user) => {
    const timestamp = new Date().toLocaleString();
    const loggedUser = authService.getCurrentUser();
    const log = `[${timestamp}] - ${loggedUser.role} - ${loggedUser.username} - ${action} - ID: ${user.id}, Tipo: ${user.role}`;
    fileService.appendToFile(log, 'logs_usuarios.txt');
};

export default userService;
