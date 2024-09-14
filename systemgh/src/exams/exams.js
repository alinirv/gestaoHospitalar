// src/components/exams/ExamSchedule.js
import React, { useState } from 'react';

const ExamSchedule = () => {
  const [exame, setExame] = useState('');
  const [paciente, setPaciente] = useState('');
  const [data, setData] = useState('');

  const agendarExame = (e) => {
    e.preventDefault();

    // Cria um novo objeto com os dados do exame
    const novoExame = {
      exame,
      paciente,
      data,
    };

    // Verifica se já existem exames salvos no localStorage
    const examesSalvos = JSON.parse(localStorage.getItem('exames')) || [];

    // Adiciona o novo exame à lista de exames salvos
    examesSalvos.push(novoExame);

    // Salva a lista de exames de volta no localStorage
    localStorage.setItem('exames', JSON.stringify(examesSalvos));

    // Limpa os campos do formulário após o agendamento
    setExame('');
    setPaciente('');
    setData('');

    // Exibe uma mensagem de confirmação ou feedback
    console.log('Exame agendado com sucesso!');
  };

  return (
    <div>
      <h2>Agendar Exame</h2>
      <form onSubmit={agendarExame}>
        <div>
          <label>Exame:</label>
          <input
            type="text"
            value={exame}
            onChange={(e) => setExame(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Paciente:</label>
          <input
            type="text"
            value={paciente}
            onChange={(e) => setPaciente(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Data:</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </div>
        <button type="submit">Agendar</button>
      </form>
    </div>
  );
};

export default ExamSchedule;
