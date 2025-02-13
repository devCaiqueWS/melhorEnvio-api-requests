import { useState } from 'react';
import axios from 'axios';
import FreteOption from '../components/FreteOption';
import './Calcula.css';

function Calcula() {
  const [formData, setFormData] = useState({
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    estado: '',
    cidade: '',
    bairro: ''
  });

  const [apiResponse, setApiResponse] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    const requestBody = {
      from: {
        postal_code: '06056430' // Cep de envio fixo
      },
      to: {
        postal_code: formData.cep
      },
      package: {
        height: 0.2,
        width: 0.1,
        length: 0.02,
        weight: 0.05
      }
    };

    axios.post('/api/api/v2/me/shipment/calculate', requestBody, {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiY2FjNmM2ZGEwZTBlYTgxOGQzZDllMGJhMDI0YTMyNDA4ZDNmZjczNGI3MjI5MDVjMzUwODA1MTA1ZjA2ZmU3ZjYyNjI1OGMzZGEzMWRjODYiLCJpYXQiOjE3Mzk0NTI2MDYuMzcyOSwibmJmIjoxNzM5NDUyNjA2LjM3MjkwMiwiZXhwIjoxNzcwOTg4NjA2LjM1NjMzNywic3ViIjoiOWUzMjA1ZWEtNTBiYy00ZGQ3LWFkNWMtZWI0NDA2NzQwN2JlIiwic2NvcGVzIjpbInNoaXBwaW5nLWNhbGN1bGF0ZSJdfQ.QQqhoqfZAuT5DC9R-0P0cxFnoX-sopNH_dMoPIbieH9HZn70NW3gVQF3l8aibVD_TME2K9BCuB9pWjmZg1LvJB65VX_NATenY3RUVYTIHsNYfZecoJHMaW8YAXas2x4U41wwEgrpU4fbWzs241x_F1COrYmvNHm33qsz1Z-UwfaswwT2Qz3f0MvNhhHhYxH1UXWu-AqeYqTplqVWOEMJ28dZWXmyugIyWMYRHUinXdRbb0PJco5hEmpRMd4qCMjeJMGdsAEXr4Jif6q5NtZEvadJC4onSVBF3qomv_APF1R2-opWqN-pKRCtQ6UjONfx4j0GROTY_PNGW9QuDEQL7L7QdSyexAVeKEEV-0gpNi7i0spho_Xqkhuimw0lKdA4rafYEm-nOEcA3TcWlcHk02Irb3IUYOEQvA3skrLbr5x7X4c6hUeDEPvKlzn1a3RoEmd7h_lD2_45z7IGJvLPb3hW9cB222VFOmO6x8vPWMnpP272XGQOvBFnpzyGF4ZECaYCC1PKO5Q0osAGqUKA4_WjHniaFiJnU7b6W3mJHNoPeJR_K3qr9Rv8VXN3uOqN-dy4U7H7XWZYWSGlEWmjfHm3VZPZ6bte9LEHwVpIBl0k7uQZooYrNcjY67CPFP5y3c5vjter82HgHy81b-fgyNGO_SSNHipDDsE8XA8O_2g', 
        'Content-Type': 'application/json',
        'User-Agent': 'Aplicação wscaique16@gmail.com' 
      }
    })
    .then(response => {
      console.log('Success:', response.data);
      setApiResponse(response.data);
      alert('Frete calculado com sucesso!');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleBlur = (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    if (cep.length !== 8) {
      return;
    }
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((resp) => resp.json())
      .then((data) => {
        setFormData({
          ...formData,
          logradouro: data.logradouro,
          estado: data.uf,
          cidade: data.localidade,
          bairro: data.bairro
        });
      })
      .catch((error) => console.error('Cep inválido', error));
  };

  return (
    <div>
      <h1>Calcula Frete</h1>
      <h3>Endereço de entrega</h3>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>CEP:</label>
          <input type="text" name="cep" value={formData.cep} onChange={handleChange} onBlur={handleBlur} className="form-input" />
        </div>
        <div className="form-group">
          <label>Logradouro:</label>
          <input type="text" name="logradouro" value={formData.logradouro} onChange={handleChange} className="form-input" />
        </div>
        <div className="form-group">
          <label>Número:</label>
          <input type="text" name="numero" value={formData.numero} onChange={handleChange} className="form-input" />
        </div>
        <div className="form-group">
          <label>Complemento:</label>
          <input type="text" name="complemento" value={formData.complemento} onChange={handleChange} className="form-input" />
        </div>
        <div className="form-group">
          <label>Estado:</label>
          <input type="text" name="estado" value={formData.estado} onChange={handleChange} className="form-input" />
        </div>
        <div className="form-group">
          <label>Cidade:</label>
          <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} className="form-input" />
        </div>
        <div className="form-group">
          <label>Bairro:</label>
          <input type="text" name="bairro" value={formData.bairro} onChange={handleChange} className="form-input" />
        </div>
        <button type="submit" className="form-button">Enviar</button>
      </form>
      {apiResponse.map((option, index) => (
        <FreteOption key={index} option={option} index={index} />
      ))}
    </div>
  );
}

export default Calcula;
