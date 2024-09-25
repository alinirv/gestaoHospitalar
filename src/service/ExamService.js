const examService = {
    // Obtém todos os exames do localStorage
    getExams: () => {
      const exams = localStorage.getItem('exams');
      return exams ? JSON.parse(exams) : [];
    },
  
    // Adiciona um novo exame ao localStorage
    addExam: (exam) => {
      const exams = examService.getExams();
      exams.push(exam);
      localStorage.setItem('exams', JSON.stringify(exams));
    },
  
    // Remove um exame pelo ID
    removeExam: (id) => {
      let exams = examService.getExams();
      exams = exams.filter((exam) => exam.id !== id);
      localStorage.setItem('exams', JSON.stringify(exams));
    },
  
    // Atualiza um exame pelo ID
    updateExam: (updatedExam) => {
      const exams = examService.getExams();
      const index = exams.findIndex((exam) => exam.id === updatedExam.id);
      if (index !== -1) {
        exams[index] = updatedExam;
        localStorage.setItem('exams', JSON.stringify(exams));
      }
    }
  };
  
  export default examService;
  