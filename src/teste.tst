import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [formData, setFormData] = useState({
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    estado: '',
    cidade: '',
    bairro: ''
  });

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
  };

  $("#cep").blur(function() {
    const cep = $(this).val().replace(/\D/g, '');
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
      .catch((error) => console.error(error));'Cep inválido'
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>CEP:</label>
          <input type="text" name="cep" id='cep' value={formData.cep} onChange={handleChange} />
        </div>
        <div>
          <label>Logradouro:</label>
          <input type="text" name="logradouro" value={formData.logradouro} onChange={handleChange} />
        </div>
        <div>
          <label>Número:</label>
          <input type="text" name="numero" value={formData.numero} onChange={handleChange} />
        </div>
        <div>
          <label>Complemento:</label>
          <input type="text" name="complemento" value={formData.complemento} onChange={handleChange} />
        </div>
        <div>
          <label>Estado:</label>
          <input type="text" name="estado" value={formData.estado} onChange={handleChange} />
        </div>
        <div>
          <label>Cidade:</label>
          <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} />
        </div>
        <div>
          <label>Bairro:</label>
          <input type="text" name="bairro" value={formData.bairro} onChange={handleChange} />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </>
  )
}

export default App
