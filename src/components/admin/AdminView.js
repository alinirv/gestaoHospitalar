import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import adminService from '../../service/AdminService';
import Header from '../utils/Header';
import Footer from '../utils/Footer';

const AdminView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(null);

    // Carregar administrador ao montar o componente
    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const foundAdmin = await adminService.getAdminById(id);
                setAdmin(foundAdmin);
            } catch (error) {
                console.error("Erro ao buscar administrador:", error);
                alert('Erro ao carregar administrador.');
            }
        };
        fetchAdmin();
    }, [id]);

    // Função para remover um administrador
    const handleDelete = () => {
        const confirmDelete = window.confirm('Tem certeza que deseja deletar este administrador?');
        if (confirmDelete) {
            adminService.removeAdmin(id);
            alert('Administrador removido com sucesso!');
            navigate('/admin');
        }
    };

    // Função para redirecionar para a página de edição
    const handleEdit = () => {
        navigate(`/editAdmin/${id}`);
    };

    if (!admin) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="home-container">
            <Header />
            <div className="registration-container">
                <div className="admin-card">
                    <img src={admin.photo || '/default-profile.png'} alt={admin.name} className="admin-photo" />
                    <div className="admin-details">
                        <h2>{admin.name}</h2>
                        <p><strong>Email:</strong> {admin.email}</p>
                        <p><strong>CEP:</strong> {admin.cep}</p>
                        <p><strong>Endereço:</strong> {admin.address}</p>
                        <p><strong>Cidade:</strong> {admin.city}</p>
                        <p><strong>Estado:</strong> {admin.state}</p>
                    </div>
                    <div className="admin-buttons">
                        <button className="submit-btn" type="button" onClick={handleEdit}>Editar</button>
                        <button className="submit-btn" type="button" onClick={handleDelete}>Deletar</button>
                    </div>
                </div>
                <Link to="/listAdmin">Voltar</Link>
            </div>
            <Footer />
        </div>
    );
};

export default AdminView;
