import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import doctorService from '../../service/DoctorService';
import Header from '../utils/Header';
import Footer from '../utils/Footer';

const DoctorView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(null); 

    // Carregar médicos ao montar o componente
    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const foundDoctor = doctorService.getDoctorById(id); 
                setDoctor(foundDoctor);
            } catch (error) {
                console.error("Erro ao buscar médico:", error);
                alert('Erro ao carregar médico.');
            }
        };
        fetchDoctor();
    }, [id]);

    // Função para remover um médco
    const handleDelete = () => {
        const confirmDelete = window.confirm('Tem certeza que deseja deletar este médico?');
        if (confirmDelete) {
            doctorService.removeDoctor(id);
            alert('Médico removido com sucesso!');
            navigate('/admin');
        }
    };

    // Função para redirecionar para a página de edição
    const handleEdit = () => {
        navigate(`/editDoctor/${id}`);
    };

    if (!doctor) {
        return <div>Carregando...</div>; 
    }

    return (
        <div className="home-container">
            <Header />
            <div className="registration-container">
                <div className="doctor-card">
                    <img src={doctor.photo} alt={doctor.name} className="doctor-photo" />
                    <div className="doctor-details">
                        <h2>{doctor.name}</h2>
                        <p><strong>Email:</strong> {doctor.email}</p>
                        <p><strong>CEP:</strong> {doctor.cep}</p>
                        <p><strong>Endereço:</strong> {doctor.address}</p>
                        <p><strong>Cidade:</strong> {doctor.city}</p>
                        <p><strong>Estado:</strong> {doctor.state}</p>
                    </div>
                    <div className="admin-buttons">
                        <button className="submit-btn" type="button" onClick={handleEdit}>Editar</button>
                        <button className="submit-btn" type="button" onClick={handleDelete}>Deletar</button>
                    </div>
                    
                </div>
                <Link to="/listDoctor">Voltar</Link>
            </div>
            <Footer />
        </div>
    );
};

export default DoctorView;