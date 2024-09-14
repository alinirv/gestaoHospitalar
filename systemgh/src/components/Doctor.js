import React from 'react';
import { Link } from 'react-router-dom';

const Doctor = () => {
  return (
    <div>
      <h1>Painel do Médico</h1>
      <p>Bem-vindo ao seu painel. Aqui você pode gerenciar suas consultas e exames.</p>
      <ul>
        <li>
          <Link to="/consultas">Gerenciar Consultas</Link>
        </li>
        <li>
          <Link to="/exames">Gerenciar Exames</Link>
        </li>
      </ul>
    </div>
  );
};

export default Doctor;
