import fileService  from './fileService';

const authService = {
  login: (username, password) => {

    const users = [
      { username: 'admin', password: '123', role: 'admin' },
      { username: 'Everton', password: '123', role: 'doctor' },
      { username: 'Daniel', password: '123', role: 'patient' },
      { username: 'Aline', password: '123', role: 'patient' },
      { username: 'Elise', password: '123', role: 'doctor' },
      { username: 'Ronaldo', password: '123', role: 'doctor' }
    ];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      // Gerar log de login
      const timestamp = new Date().toLocaleString();
      const log = `[${timestamp}] - ${user.role} - ${username} - LOGIN`;
      fileService.appendToFile(log, 'logs_acessos.txt');
    }
    return user;
  },
  getCurrentUser: () => JSON.parse(localStorage.getItem('user')),

  logout: (navigate) => {
    const user = JSON.parse(localStorage.getItem('user'));

    const timestamp = new Date().toLocaleString();
    const log = `[${timestamp}] - ${user.role} - ${user.username} - LOGOUT`;    
    fileService.appendToFile(log, 'logs_acessos.txt');
    localStorage.removeItem('user');
    if (navigate) navigate('/login');
  }
};

export default authService;
