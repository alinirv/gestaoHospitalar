import React from 'react';
import Header from '../utils/Heder';
import Footer from '../utils/Footer';


const Doctor = () => {
  return (
    <div className="home-container">
      <Header />
      <div className="home-content">
        <h1>Painel do Médico</h1>
        <p>Bem-vindo ao seu painel. Aqui você pode gerenciar suas consultas e exames.</p>
      </div>
      <Footer />
    </div>
  );
};

export default Doctor;
