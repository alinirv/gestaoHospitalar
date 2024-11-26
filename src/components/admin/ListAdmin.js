import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AdminService from '../../service/UserService';
import Header from '../utils/Header';
import Footer from '../utils/Footer';

const AdminsList = () => {
    const [admins, setAdmins] = useState([]);
    const navigate = useNavigate();

    // Carregar Administrador ao montar o componente
    useEffect(() => {
        const loadedAdmins = AdminService.getUsers('admin');
        setAdmins(loadedAdmins);
    }, []);
    
    return (
        <div className="home-container">
            <Header />
            <div className="home-content">
                <h2>Lista de Adminstradores</h2>
                {admins.length === 0 ? (
                    <><p>Nenhum administrador cadastrado.</p><p><Link to="/admin">Voltar</Link> </p></>
                    
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
                            {admins.map((admin) => (
                                <tr key={admin.id}>
                                    <td>{admin.id}</td>
                                    <td>{admin.name}</td>
                                    <td>{admin.email}</td>
                            
                                    <td>
                                        <div className="admin-buttons">
                                            <button className="submit-btn" onClick={() => navigate(`/adminsView/${admin.id}`)}>Visualizar</button>
                                           
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

export default AdminsList;
