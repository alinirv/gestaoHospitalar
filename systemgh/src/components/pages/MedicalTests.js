import React from 'react';
import Header from '../utils/Heder';
import Footer from '../utils/Footer';

const MedicalTests = () => {

  return (
    <div className="medicalTests-container">
      <Header />
      <div className="medicalTests-content">
        <h1>Exames</h1>
        <p>Bem-vindo ao seu painel. Aqui você pode gerenciar o sistema e visualizar logs de usuários</p>
      </div>
      <Footer />
    </div>
  );
};

export default MedicalTests;