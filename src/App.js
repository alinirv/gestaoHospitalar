import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Doctor from './components/pages/Doctor';
import Admin from './components/pages/Admin';
import Patient from './components/pages/Patient';
import MedicalTests from './components/pages/MedicalTests';
import Appointments from './components/pages/Appointments';
import AccessLogs from './components/logs/AccessLogs';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/doctor" element={<Doctor/>} />
        <Route path="/patient" element={<Patient/>} />
        <Route path="/tests" element={<MedicalTests/>} />
        <Route path="/appointments" element={<Appointments/>} />
        <Route path="/accesslogs" element={<AccessLogs/>} />
      </Routes>
    </Router>
  );
}

export default App;