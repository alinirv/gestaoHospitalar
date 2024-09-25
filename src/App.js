import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Doctor from './components/pages/Doctor';
import Admin from './components/pages/Admin';
import Patient from './components/pages/Patient';
import AccessLogs from './components/logs/AccessLogs';
import Appointment from './components/Appointments/Appointment';
import AppointmentsLogs from './components/logs/AppointmentsLogs';
import Exam from './components/exams/exam';
import ExamsLogs from './components/logs/ExamsLogs';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/doctor" element={<Doctor/>} />
        <Route path="/patient" element={<Patient/>} />
        <Route path="/exams" element={<Exam/>} />
        <Route path="/accesslogs" element={<AccessLogs/>} />
        <Route path="/appointmentScheduling" element={<Appointment/>} />
        <Route path="/appointmentLogs" element={<AppointmentsLogs/>} />
        <Route path="/examsLogs" element={<ExamsLogs/>} />
      </Routes>
    </Router>
  );
}

export default App;
