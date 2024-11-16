import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import patientService from '../../service/UserService';
import Header from '../utils/Header';
import Footer from '../utils/Footer';

const PatientsList = () => {
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();

    // Carregar pacientes ao montar o componente
    useEffect(() => {
        const loadedPatients = patientService.getUsers('patient');
        setPatients(loadedPatients);
    }, []);
    
    return (
        <div className="home-container">
            <Header />
            <div className="home-content">
                <h2>Lista de Pacientes</h2>
                {patients.length === 0 ? (
                    <><p>Nenhum paciente cadastrado.</p><p><Link to="/admin">Voltar</Link> </p></>
                    
                ) : (
                    <table className="logs-table">
                        <thead>
                            <tr>
                                <th>Matricula</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients.map((patient) => (
                                <tr key={patient.id}>
                                    <td>{patient.id}</td>
                                    <td>{patient.name}</td>
                                    <td>{patient.email}</td>
                            
                                    <td>
                                        <div className="admin-buttons">
                                            <button className="submit-btn" onClick={() => navigate(`/patientsView/${patient.id}`)}>Visualizar</button>
                                           
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default PatientsList;
