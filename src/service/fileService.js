import { saveAs } from 'file-saver';

const fileService = {

    //adiciona log
    appendToFile: (log, fileName) => {

        let logs = localStorage.getItem(fileName) || '';
        logs += log + '\n';
        localStorage.setItem(fileName, logs);
    },
    // Salva arquivo de log
    saveFile: (fileName) => {
        const logs = localStorage.getItem(fileName) || '';
        const blob = new Blob([logs], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, fileName);
    },

    

};

export default fileService;