import userService from './UserService';

const adminService = {
    // Função para obter todos os administradores
    getAdmins: () => {
        return userService.getUsers('admin');
    },

    // Função para adicionar um novo administrador
    addAdmin: (admin) => {
        userService.addUser(admin);
    },

    // Função para remover um administrador
    removeAdmin: (id) => {
        userService.removeUser(id, 'admins');
    },

    // Função para buscar um administrador por ID
    getAdminById: (id) => {
        return userService.getUserById(id);
    },

    // Função para atualizar informações de um administrador
    updateAdmin: (updatedAdmin) => {
        return userService.updateUser(updatedAdmin, 'admins');
    }
};

export default adminService;
