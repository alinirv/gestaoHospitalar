const authService = {
    login: (username, password) => {
     
      const users = [
        { username: 'admin', password: '123', role: 'admin' },
        { username: 'doctor', password: '123', role: 'doctor' },
        { username: 'patient', password: '123', role: 'patient' },
      ];
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user.role));
      }
      return user;
    },
    getCurrentUser: () => JSON.parse(localStorage.getItem('user')),
    logout: () => localStorage.removeItem('user'),
  };
  
  export default authService;
  