import React from 'react';
import Header from '../pages/Heder';
import Footer from '../pages/Footer';


const Patient = () => {
  return (
    <div className="home-container">
      <Header />
      <div className="home-content">
        <h1>Painel do Paciente</h1>
        <p>Bem-vindo ao seu painel. Aqui você pode acompanhar suas consultas e resultados de exames.</p>
      </div>
      <Footer />
    </div>
  );
};


export default Patient;