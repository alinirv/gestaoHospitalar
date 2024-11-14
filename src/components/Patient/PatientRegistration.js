import React, { useState } from 'react';
import axios from 'axios';
import Header from '../utils/Header';
import Footer from '../utils/Footer';

const PEXELS_API_KEY = '1QjiNOOICC72len6gb0bzIiyEcMFo90jSkQq9fgcVIcJ1q5hrC9LZdpc';

const PatientRegistration = () => {
    const [patientData, setPatientData] = useState({
        name: '',
        email: '',
        cep: '',
        address: '',
        city: '',
        state: '',
        photo: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name);
        setPatientData({ ...patientData, [name]: value });
    };

    const fetchRandomPhoto = async () => {
        try {
            const response = await axios.get('https://api.pexels.com/v1/search?query=musician&per_page=12', {
                headers: {
                    Authorization: PEXELS_API_KEY,
                },
            });

            // Verifica se a resposta contém fotos
            if (response.data.photos.length > 0) {
                const position = Math.floor(Math.random() * 12) + 1
                const photoUrl = response.data.photos[position].src.small;
                setPatientData({ ...patientData, photo: photoUrl });
            } else {
                alert('Nenhuma imagem encontrada.');
            }
        } catch (error) {
            console.error('Erro ao buscar imagem:', error);
            alert('Erro ao buscar imagem. Tente novamente mais tarde.');
        }
    };

    const handleCepSearch = async () => {
        if (patientData.cep.length === 8) {
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${patientData.cep}/json/`);
                const { logradouro, localidade, uf } = response.data;

                if (logradouro) {
                    setPatientData({
                        ...patientData,
                        address: logradouro,
                        city: localidade,
                        state: uf,
                    });
                } else {
                    alert('CEP não encontrado. Verifique se o CEP está correto.');
                }
            } catch (error) {
                console.error('Erro ao buscar o CEP:', error);
                alert('Erro ao buscar o CEP. Tente novamente mais tarde.');
            }
        } else {
            alert('O CEP deve ter 8 dígitos.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Dados do paciente:', patientData);
        alert('Paciente cadastrado com sucesso!');
    };

    return (
        <div className="home-container">
            <Header />
            <div className="registration-container">
                <h1>Cadastrar Paciente</h1>
                <form onSubmit={handleSubmit} className='form-group'>
                    <div className="form-group">
                        <label htmlFor="name">Nome:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={patientData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={patientData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cep">CEP:</label>
                        <input
                            type="text"
                            id="cep"
                            name="cep"
                            value={patientData.cep}
                            onChange={handleChange}
                            required
                        />
                        
                    </div>

                    {patientData.address && (
                        <>
                            <div className="form-group">
                                <label htmlFor="address">Endereço:</label>
                                <input type="text" id="address" name="address" value={patientData.address} disabled />
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">Cidade:</label>
                                <input type="text" id="city" name="city" value={patientData.city} disabled />
                            </div>
                            <div className="form-group">
                                <label htmlFor="state">Estado:</label>
                                <input type="text" id="state" name="state" value={patientData.state} disabled />
                            </div>
                        </>
                    )}

                    <div className="form-group">
                        <button className="submit-btn" type="button" onClick={handleCepSearch}>Buscar CEP</button>
                        <button className="submit-btn" type="button" onClick={fetchRandomPhoto}>Inserir imagem</button>
                    </div>

                    {patientData.photo && (
                        <div className="form-group">
                            <img src={patientData.photo} alt="Paciente" style={{ width: '150px', height: '150px', borderRadius: '8px', marginTop: '10px' }} />
                        </div>
                    )}

                    <button type="submit" className="submit-btn">Cadastrar Paciente</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default PatientRegistration;