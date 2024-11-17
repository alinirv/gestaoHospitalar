import React from 'react';
import UserRegistrationForm from '../utils/UserRegistrationForm';
import doctorService from '../../service/DoctorService';

const DoctorRegistration = () => {
    const handleDoctorSubmit = (doctorData) => {
        doctorService.addDoctor(doctorData);
        alert('Médico cadastrado com sucesso!');
        
    };

    return (
        <UserRegistrationForm
            onSubmit={handleDoctorSubmit}
            userType="Médico"
        />
    );
};

export default DoctorRegistration;
