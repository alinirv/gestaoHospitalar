import React from 'react';
import Header from '../utils/Heder';
import Footer from '../utils/Footer';


const Patient = () => {
  return (
    <div className="home-container">
      <Header />
      <div className="home-content">
        <h1>Painel do Paciente</h1>
        <p><h3>Bem-vindo ao seu painel. Aqui você pode agendar suas consultas e acompanhar seus exames.</h3></p>
      </div>

      <div className="login-container">
      <h2>Agendar Consultas</h2>
        <form action="/agendar-consulta" method="POST">
          <div className="form-group">
            <label for="doctor">Médico</label>
            <input type="text" id="doctor" name="doctor" required/>
          </div>

          <div className="form-group">
            <label for="patient">Paciente</label>
            <input type="text" id="patient" name="patient" required/>
          </div>

          <div className="form-group">
            <label for="date">Data</label>
            <input type="date" id="date" name="date" required/>
          </div>

          <div className="form-group">
            <label for="time">Hora</label>
            <input type="time" id="time" name="time" required/>
          </div>

          <button type="submit" className="login-btn">Agendar Consulta</button>
        </form>
      </div>
      
      <Footer />
    </div>
  );
};

export default Patient;