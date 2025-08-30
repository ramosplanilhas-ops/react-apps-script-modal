import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import Header from './components/Header';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Typography, Container, CssBaseline, Button } from '@mui/material';

function App() {
  const [baixa, setBaixa] = useState(false);
  const [isTableActive, setIsTableActive] = useState(false);

  return (
    <form>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <CssBaseline />
        
        <Box
          sx={{
            backgroundColor: 'background.paper',
            color: 'text.primary',
            borderBottom: '1px solid #ccc',
            position: 'sticky',
            top: 0,
            zIndex: 1100,
            p: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexShrink: 0
          }}
        >
          <Button variant="outlined">Limpar</Button>
          <Button type='submit' variant="outlined">Salvar</Button>
          <Typography variant="h4" component="h1" sx={{ flexGrow: 1, textAlign: 'center' }}>            
          </Typography>
          <Box sx={{ flexShrink: 0, marginLeft: 'auto' }}>
            {!isTableActive && (
              <Header
                baixa={baixa}
                onBaixaChange={setBaixa}
              />
            )}
          </Box>
        </Box>

        <Container component="main" sx={{ flexGrow: 1, overflowY: 'auto', mt: 2, mb: 4 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Form
              baixa={baixa}
              onBaixaChange={setBaixa}
              onTableActiveChange={setIsTableActive}
            />
          </LocalizationProvider>
        </Container>
      </Box>      
    </form>
    
  );
}

export default App;