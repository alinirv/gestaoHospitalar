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
import EditPatient from './components/patient/EditPatient';
import PatientRegistration from './components/patient/PatientRegistration';
import PatientsList from './components/patient/ListPatient';
import PatientView from './components/patient/PatientView';
import EditDoctor from './components/doctor/EditDoctor';
import DoctorRegistration from './components/doctor/DoctorRegistration';
import DoctorsList from './components/doctor/ListDoctor';
import DoctorView from './components/doctor/DoctorView';
import AdminRegistration from './components/admin/AdminRegistration';
import AdminsList from './components/admin/ListAdmin';
import AdminView from './components/admin/AdminView';
import EditAdmin from  './components/admin/EditAdmin';

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
        <Route path='/patientRegistration' element={<PatientRegistration/>}/>
        <Route path="/listPatient" element={<PatientsList/>} />
        <Route path="/editPatient/:id" element={<EditPatient />} />
        <Route path="/patientsView/:id" element={<PatientView />} />
        <Route path='/doctorRegistration' element={<DoctorRegistration/>}/>
        <Route path="/listDoctor" element={<DoctorsList/>} />
        <Route path="/editDoctor/:id" element={<EditDoctor />} />
        <Route path="/doctorsView/:id" element={<DoctorView />} />
        <Route path='/adminRegistration' element={<AdminRegistration/>}/>
        <Route path="/listAdmin" element={<AdminsList/>} />
        <Route path="/editAdmin/:id" element={<EditAdmin />} />
        <Route path="/adminsView/:id" element={<AdminView />} />
      </Routes>
    </Router>
  );
}

export default App;
