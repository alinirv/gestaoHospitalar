// src/routes/DoctorRoutes.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Doctor from '../components/Doctor';
import ConsultationList from '../components/consultations/ConsultationList';
import ExamSchedule from '../components/exams/ExamSchedule';

const isDoctorAuthenticated = true; // Simulação de autenticação

const DoctorRoutes = () => {
  return isDoctorAuthenticated ? (
    <>
      <Route path="/painel-medico" component={DoctorDashboard} />
      <Route path="/consultas" component={ConsultationList} />
      <Route path="/exames" component={ExamSchedule} />
    </>
  ) : (
    <Redirect to="/login" />
  );
};

export default DoctorRoutes;
