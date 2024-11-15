import { useState } from 'react';
import axios from 'axios';

const useCepSearch = () => {
    const [addressData, setAddressData] = useState({
        address: '',
        city: '',
        state: '',
    });

    const fetchAddressByCep = async (cep) => {
        if (cep.length === 8) {
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                const { logradouro, localidade, uf } = response.data;

                if (logradouro) {
                    setAddressData({
                        address: logradouro,
                        city: localidade,
                        state: uf,
                    });
                } else {
                    alert('CEP não encontrado.');
                }
            } catch (error) {
                console.error('Erro ao buscar o CEP:', error);
                alert('Erro ao buscar o CEP.');
            }
        } else {
            alert('O CEP deve ter 8 dígitos.');
        }
    };

    return { addressData, fetchAddressByCep };
};

export default useCepSearch;
