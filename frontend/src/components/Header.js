import React, { useState } from 'react';
import {
  FormControlLabel,
  Switch
} from '@mui/material';

function Header() {
  const [baixa, setBaixa] = useState(false);

  const handleBaixaChange = (event) => {
    setBaixa(event.target.checked);
  };

  return (
    <FormControlLabel
      control={
        <Switch
          checked={baixa}
          onChange={handleBaixaChange}
          name="baixa"
        />
      }
      label="Baixa"
      labelPlacement="start"
    />
  );
}

export default Header;