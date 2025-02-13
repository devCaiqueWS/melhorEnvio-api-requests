import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>
      <h1>Aplicativo de Cálculo de Frete</h1>
      <Outlet />
    </div>
  );
}

export default App;
