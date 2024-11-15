import React from 'react';
import UserRegistrationForm from '../utils/UserRegistrationForm';
import patientService from '../../service/PatientService';

const PatientRegistration = () => {
    const handlePatientSubmit = (patientData) => {
        patientService.addPatient(patientData);
        alert('Paciente cadastrado com sucesso!');
        
    };

    return (
        <UserRegistrationForm
            onSubmit={handlePatientSubmit}
            userType="Paciente"
        />
    );
};

export default PatientRegistration;
