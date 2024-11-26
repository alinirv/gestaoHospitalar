import React from 'react';
import UserRegistrationForm from '../utils/UserRegistrationForm';
import AdminService from '../../service/AdminService';

const AdminRegistration = () => {
    const handleAdminSubmit = (adminData) => {
        AdminService.addAdmin(adminData);
        alert('Administrador cadastrado com sucesso!');
        
    };

    return (
        <UserRegistrationForm
            onSubmit={handleAdminSubmit}
            userType="Admin"
        />
    );
};

export default AdminRegistration;
