import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../utils/Header';
import Footer from '../utils/Footer';



const UserRegistrationForm = ({ onSubmit, userType }) => {
    const key = process.env.PEXELS_API_KEY;
    // Mapear userType para role
    const getRoleFromUserType = (userType) => {
        console.log(userType)
        switch (userType) {
            case 'Paciente':
                return 'patient';
            case 'Médico':
                return 'doctor';
            case 'Admin':
                return 'admin';
            default:
                return '';
        }
    };
    const initialFormData = {
        id: '',
        name: '',
        email: '',
        cep: '',
        address: '',
        city: '',
        state: '',
        photo: '',
        role: getRoleFromUserType(userType)
    };
    const [userData, setUserData] = useState(initialFormData);
    // Atualiza mudança no estado
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };
    // busca cep e completa endereço
    const handleCepSearch = async () => {
        const cep = userData.cep.replace(/\D/g, '');
        if (cep.length === 8) {
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                const { logradouro, localidade, uf } = response.data;

                if (logradouro) {
                    setUserData({
                        ...userData,
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
    //busca imagem
    async function handleFetchPhoto() {
        try {
            const response = await axios.get('https://api.pexels.com/v1/search?query=musician&per_page=12', {
                headers: {
                    Authorization: key

                },
            });

            // Verifica se a resposta contém fotos
            if (response.data.photos.length > 0) {
                const position = Math.floor(Math.random() * 12) + 1;
                const photoUrl = response.data.photos[position].src.small;
                setUserData({ ...userData, photo: photoUrl });
            } else {
                alert('Nenhuma imagem encontrada.');
            }
        } catch (error) {
            console.error('Erro ao buscar imagem:', error);
            alert('Erro ao buscar imagem. Tente novamente mais tarde.');
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const newId = Date.now().toString();
        onSubmit({ ...userData, id: newId });
        // Limpar o formulário após o registro
        setUserData(initialFormData);
        alert('Cadastro realizado com sucesso!');
    };

    return (
        <div className="home-container">
            <Header />
            <div className="registration-container">
                <form onSubmit={handleSubmit} className="form-group">
                    <h2>Cadastro de {userType}</h2>
                    <div className="form-group">
                        <label>Nome:</label>
                        <input type="text" name="name" value={userData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" name="email" value={userData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>CEP:</label>
                        <input type="text" name="cep" value={userData.cep} onChange={handleChange} required />

                    </div>


                    {userData.address && (
                        <>
                            <div className="form-group">
                                <label>Endereço:</label>
                                <input type="text" value={userData.address} disabled />
                            </div>
                            <div className="form-group">
                                <label>Cidade:</label>
                                <input type="text" value={userData.city} disabled />
                            </div>
                            <div className="form-group">
                                <label>Estado:</label>
                                <input type="text" value={userData.state} disabled />
                            </div>
                        </>
                    )}

                    {userData.photo && (
                        <img src={userData.photo} alt="Usuário" style={{ width: '150px', height: '150px', borderRadius: '8px' }} />
                    )}
                    <div className="admin-buttons">
                        <button className="submit-btn" type="button" onClick={handleCepSearch}>Buscar CEP</button>
                        <button className="submit-btn" type="button" onClick={handleFetchPhoto}>Inserir Foto</button>
                        <button type="submit" className="submit-btn">Cadastrar {userType}</button>
                    </div>

                </form>
                <Link to="/admin">Voltar</Link>
            </div>
            <Footer />
        </div>
    );
};

export default UserRegistrationForm;
