import React from 'react';
import './App.css';
import Form from './components/Form'; // Importa o novo componente

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Form /> {/* Renderiza o componente de formulário */}
      </header>
    </div>
  );
}

export default App;