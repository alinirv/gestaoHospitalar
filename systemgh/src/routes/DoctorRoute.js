// src/routes/DoctorRoutes.js
import React from 'react';
import { Route} from 'react-router-dom';
import Doctor from '../components/Doctor';
import ConsultationList from '../components/consultations/ConsultationList';
import ExamSchedule from '../components/exams/ExamSchedule';


const DoctorRoutes = () => {

  <Routes>
    <Route path="/painel-medico" component={DoctorDashboard} />
    <Route path="/consultas" component={ConsultationList} />
    <Route path="/exames" component={ExamSchedule} />
  </Routes>


};

export default DoctorRoutes;
