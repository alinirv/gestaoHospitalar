import React, { useEffect, useState } from 'react';
import Header from '../utils/Header';
import Footer from '../utils/Footer';
import fileService from '../../service/fileService';

const AppointmentsLogs = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [filterAction, setFilterAction] = useState('');

  useEffect(() => {
    const loadedLogs = fileService.getAppointmentsLogs('logs_appointments.txt');
    console.log(loadedLogs);
    setLogs(loadedLogs);
    setFilteredLogs(loadedLogs);
  }, []);

  // Formata a data do log para o formato YYYY-MM-DD
  const formatLogDate = (logDate) => {
    const [datePart] = logDate.split(',');
    const [day, month, year] = datePart.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  //filtro por data
  const handleFilterByDate = () => {
    if (filterDate) {
      const filtered = logs.filter(log => {
        const formattedLogDate = formatLogDate(log.date);
        return formattedLogDate === filterDate;
      });
      setFilteredLogs(filtered);
    } else {
      setFilteredLogs(logs);
    }
  };

  //filtro por ação
  const handleFilterByAction = () => {
    if (filterAction) {
      const filtered = logs.filter(log => log.action === filterAction);
      setFilteredLogs(filtered);
    } else {
      setFilteredLogs(logs);
    }
  };

  const handleSaveLogs = () => {
    fileService.saveFile('logs_acessos.txt');
  };

  return (
    <div className="home-container">
      <Header />
      <div className="home-content">
        <h1>Logs de Consultas</h1>

        <div className="filters">
          <div>
            <label htmlFor="filter-date">Filtrar por Data:</label>
            <input
              type="date"
              id="filter-date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
            <button onClick={handleFilterByDate}>Filtrar</button>
          </div>

          <div>
            <label htmlFor="action">Filtrar por Ação:</label>
            <select
              name="action"
              id="filter-date"
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="LOGIN">Login</option>
              <option value="LOGOUT">Logout</option>
            </select>
            <button onClick={handleFilterByAction}>Filtrar</button>
          </div>
        </div>

        <div className="control-buttons">
          <button onClick={handleSaveLogs}>Salvar Logs em Arquivo</button>
        </div>

        <table className="logs-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Hora</th>
              <th>Tipo de Usuário</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
          {filteredLogs.map((log, index) => (
              <tr key={index}>
                <td>{log.date}</td>
                <td>{log.hora}</td>
                <td>{log.userType}</td>
                <td>{log.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default AppointmentsLogs;
