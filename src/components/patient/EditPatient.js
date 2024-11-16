import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import patientService from '../../service/PatientService';
import axios from 'axios';
import Header from '../utils/Header';
import Footer from '../utils/Footer';

const EditPatient = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState();

     // Carregar pacientes ao montar o componente
     useEffect(() => {
        const fetchPatient = async () => {
            try {
                const foundPatient = patientService.getPatientById(id); 
                setFormData(foundPatient);
            } catch (error) {
                console.error("Erro ao buscar paciente:", error);
                alert('Erro ao carregar paciente.');
            }
        };
        fetchPatient();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        patientService.updatePatient(formData);
        alert('Dados do paciente atualizados com sucesso!');
    };

     // busca cep e completa endereço
     const handleCepSearch = async () => {
        const cep = formData.cep.replace(/\D/g, '');
        if (cep.length === 8) {
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
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
                <h2>Editar Paciente</h2>
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

export default EditPatient;
