import React from 'react';
import './App.css';
import Form from './components/Form';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Form />
        </LocalizationProvider>
      </header>
    </div>
  );
}

export default App;