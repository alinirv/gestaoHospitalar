import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import patientService from '../../service/PatientService';
import Header from '../utils/Header';
import Footer from '../utils/Footer';

const PatientView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [patient, setPatient] = useState(null); 

    // Carregar pacientes ao montar o componente
    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const foundPatient = patientService.getPatientById(id); 
                setPatient(foundPatient);
            } catch (error) {
                console.error("Erro ao buscar paciente:", error);
                alert('Erro ao carregar paciente.');
            }
        };
        fetchPatient();
    }, [id]);

    // Função para remover um paciente
    const handleDelete = () => {
        const confirmDelete = window.confirm('Tem certeza que deseja deletar este paciente?');
        if (confirmDelete) {
            patientService.removePatient(id);
            alert('Paciente removido com sucesso!');
            navigate('/admin');
        }
    };

    // Função para redirecionar para a página de edição
    const handleEdit = () => {
        navigate(`/editPatient/${id}`);
    };

    if (!patient) {
        return <div>Carregando...</div>; 
    }

    return (
        <div className="home-container">
            <Header />
            <div className="registration-container">
                <div className="patient-card">
                    <img src={patient.photo} alt={patient.name} className="patient-photo" />
                    <div className="patient-details">
                        <h2>{patient.name}</h2>
                        <p><strong>Email:</strong> {patient.email}</p>
                        <p><strong>CEP:</strong> {patient.cep}</p>
                        <p><strong>Endereço:</strong> {patient.address}</p>
                        <p><strong>Cidade:</strong> {patient.city}</p>
                        <p><strong>Estado:</strong> {patient.state}</p>
                    </div>
                    <div className="admin-buttons">
                        <button className="submit-btn" type="button" onClick={handleEdit}>Editar</button>
                        <button className="submit-btn" type="button" onClick={handleDelete}>Deletar</button>
                    </div>
                    
                </div>
                <Link to="/listPatient">Voltar</Link>
            </div>
            <Footer />
        </div>
    );
};

export default PatientView;