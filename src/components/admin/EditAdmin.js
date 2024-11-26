import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import adminService from '../../service/AdminService';
import axios from 'axios';
import Header from '../utils/Header';
import Footer from '../utils/Footer';

const EditAdmin = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState();

    // Carregar administrador ao montar o componente
    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const foundAdmin = await adminService.getAdminById(id);
                setFormData(foundAdmin);
            } catch (error) {
                console.error("Erro ao buscar administrador:", error);
                alert('Erro ao carregar administrador.');
            }
        };
        fetchAdmin();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        adminService.updateAdmin(formData);
        alert('Dados do administrador atualizados com sucesso!');
        navigate('/listAdmin');
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
                <h2>Editar Administrador</h2>
                <form onSubmit={handleSubmit} className="form-group">
                    <div className="form-group">
                        <label>Nome:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>CEP:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Endereço:</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Cidade:</label>
                        <input
                            type="text"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Estado:</label>
                        <input
                            type="text"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="admin-buttons">
                        <button type="submit" className="submit-btn">Salvar</button>
                        <button
                            type="button"
                            className="submit-btn"
                            onClick={() => navigate('/listAdmin')}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
                <Link to="/listAdmin">Voltar</Link>
            </div>
            <Footer />
        </div>
    );
};

export default EditAdmin;
