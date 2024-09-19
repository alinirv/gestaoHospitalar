import React from 'react';
import Header from '../utils/Heder';
import Footer from '../utils/Footer';


const Doctor = () => {
  return (
    <div className="home-container">
      <Header />
      <div className="home-content">
        <h1>Painel do Médico</h1>
        <p><h3>Bem-vindo ao seu painel. Aqui você pode gerenciar suas consultas e exames.</h3></p>
      </div>

      <div className="login-container">
      <h2>Solicitar Exames</h2>
        <form action="/agendar-consulta" method="POST">
          <div className="form-group">
            <label for="doctor">Exame</label>
            <input type="text" id="doctor" name="doctor" required/>
          </div>

          <div className="form-group">
            <label for="patient">Paciente</label>
            <input type="text" id="patient" name="patient" required/>
          </div>

          <div className="form-group">
            <label for="patient">Médico Solicitante</label>
            <input type="text" id="patient" name="patient" required/>
          </div>

          <button type="submit" className="login-btn">Solicitar Exame</button>
        </form>
      </div>
      
      <Footer />
    </div>
  );
};

export default Doctor;
