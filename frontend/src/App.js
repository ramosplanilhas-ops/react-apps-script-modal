import React from 'react';
import './App.css';
import Form from './components/Form';
import Header from './components/Header';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AppBar, Toolbar, Box } from '@mui/material';

function App() {
  return (
    <div>
      {/* AppBar para criar um cabeçalho fixo no topo da tela */}
      <AppBar position="fixed" color="default">
        <Toolbar sx={{ justifyContent: 'center' }}>
          {/* Título centralizado com Box */}
          <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
            <h1>Lançamentos</h1>
          </Box>
          {/* O componente Header (o Switch) alinhado à direita com Box */}
          <Box sx={{ flexShrink: 0, marginLeft: 'auto' }}>
            <Header />
          </Box>
        </Toolbar>
      </AppBar>
      {/* Espaçamento para o conteúdo não ficar escondido atrás do header fixo */}
      <main className="App-main" style={{ paddingTop: '64px' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Form />
        </LocalizationProvider>
      </main>
    </div>
  );
}

export default App;