import React from 'react';
import Header from '../utils/Heder';
import Footer from '../utils/Footer';

const Appointments = () => {

  return (
    <div className="appointments-container">
      <Header />
      <div className="appointments-content">
        <h1>Consultas</h1>
        <p>Bem-vindo ao seu painel de consultas aqui você pode visualizar uma lista das consulatas já agendadas.</p>
      </div>
      <Footer />
    </div>
  );
};

export default Appointments;