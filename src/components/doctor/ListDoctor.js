import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import doctorService from '../../service/UserService';
import Header from '../utils/Header';
import Footer from '../utils/Footer';

const DoctorsList = () => {
    const [patients, setDoctors] = useState([]);
    const navigate = useNavigate();

    // Carregar médicos ao montar o componente
    useEffect(() => {
        const loadedDoctors = doctorService.getUsers('doctor');
        setDoctors(loadedDoctors);
    }, []);
    
    return (
        <div className="home-container">
            <Header />
            <div className="home-content">
                <h2>Lista de Médicos</h2>
                {patients.length === 0 ? (
                    <><p>Nenhum médico cadastrado.</p><p><Link to="/admin">Voltar</Link> </p></>
                    
                ) : (
                    <table className="logs-table">
                        <thead>
                            <tr>
                                <th>CRM</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients.map((doctor) => (
                                <tr key={doctor.id}>
                                    <td>{doctor.id}</td>
                                    <td>{doctor.name}</td>
                                    <td>{doctor.email}</td>
                            
                                    <td>
                                        <div className="admin-buttons">
                                            <button className="submit-btn" onClick={() => navigate(`/doctorsView/${doctor.id}`)}>Visualizar</button>
                                           
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

export default DoctorsList;
