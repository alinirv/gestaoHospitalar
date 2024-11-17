import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import doctorService from '../../service/DoctorService';
import axios from 'axios';
import Header from '../utils/Header';
import Footer from '../utils/Footer';

const EditDoctor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState();

     // Carregar médicos ao montar o componente
     useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const foundDoctor = doctorService.getDoctorById(id); 
                setFormData(foundDcoctor);
            } catch (error) {
                console.error("Erro ao buscar médico:", error);
                alert('Erro ao carregar médico.');
            }
        };
        fetchDoctor();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        patientService.updateDoctor(formData);
        alert('Dados do médico atualizados com sucesso!');
    };

     // busca cep e completa endereço
     const handleCepSearch = async () => {
        const cep = formData.cep.replace(/\D/g, '');
        if (cep.length === 8) {
            try {
                const response = await axios.get('https://viacep.com.br/ws/${cep}/json/');
                const { logradouro, localidade, uf } = response.data;

                if (logradouro) {
                    setFormData({
                        ...formData,
                        address: logradouro,
                        city: localidade,
                        state: uf,

                    });

                } else {
                    alert('CEP não encontrado.');
                }
            } catch (error) {
                console.error('Erro ao buscar o CEP:', error);
                alert('Erro ao buscar o CEP.');
            }
        } else {
            alert('O CEP deve ter 8 dígitos.');
        }

    };

    if (!formData) {
        return <div>Carregando...</div>; 
    }

    return (
        <div className="home-container">
            <Header />
            <div className="registration-container">
                <h2>Editar Médico</h2>
                <form onSubmit={handleSubmit} className="form-group">

                    <div className="form-group">
                        <label>Nome:</label>
                        <input type="text" value={formData.name} disabled />
                    </div>
                    <div className="form-group">
                        <label>CEP:</label>
                        <input type="text" name="cep" value={formData.cep} onChange={handleChange} />
                        <button className="submit-btn" type="button" onClick={handleCepSearch}>Buscar CEP</button>
                    </div>
                    <div className="form-group">
                        <label>Endereço:</label>
                        <input type="text" name="address" value={formData.address} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Cidade:</label>
                        <input type="text" name="city" value={formData.city} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Estado:</label>
                        <input type="text" name="state" value={formData.state} onChange={handleChange} />
                    </div>
                    <div className="admin-buttons">
                        <button type="submit" className="submit-btn">Salvar</button>
                        <button type="button" className="submit-btn" onClick={() => navigate('/listPatient')}>Cancelar</button>
                    </div>
                </form>
                <Link to="/listPatient">Voltar</Link>
            </div>
            <Footer />
        </div>
    );
};

export default EditDoctor;
