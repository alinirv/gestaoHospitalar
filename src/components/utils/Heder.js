import { Link, useNavigate } from 'react-router-dom';
import authService from '../../service/authService';

const Header = () => {
    const navigate = useNavigate();
    const user = authService.getCurrentUser();

    const handleLogout = (e) => {
        e.preventDefault(); // Previne o comportamento padrão do link
        authService.logout(navigate); // Chama o logout e redireciona para a página de login
    };

    return (
        <header className="home-header">
            <div className="system-name">
                <h1>GSH MediSys</h1>
                <p>Tecnologia e gestão unidas pela saúde.</p>
            </div>
            <nav className="nav-bar">
                <ul className="nav-list">
                    {user.role === 'admin' && (
                        <>
                            <li><Link to="/admin">Inicio</Link></li>
                        </>
                    )}
                    {user.role === 'doctor' && (
                        <>
                        <li><Link to="/doctor">Home</Link></li>
                            {/* <li><Link to="/medico/pacientes">Meus Pacientes</Link></li> */}
                            <li><Link to="/appointments">Gerenciar Consultas</Link></li>
                            <li><Link to="/tests">Gerenciar Exames</Link></li>
                        </>
                    )}
                    {user.role === 'patient' && (
                        <>
                        <li><Link to="/patient">Home</Link></li>
                            <li><Link to="/appointments">Agendar Consultas</Link></li>
                            <li><Link to="/tests">Meus Exames</Link></li>
                        </>
                    )}
                    <li><a href="/login" className="logout-link" onClick={handleLogout}>Sair</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
