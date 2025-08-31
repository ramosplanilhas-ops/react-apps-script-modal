import React from 'react';
import { FormControlLabel, Switch } from '@mui/material';

function Header({ baixa, onBaixaChange }) {
  const handleToggle = (event) => {
    onBaixaChange(event.target.checked);
  };

  return (
    <FormControlLabel
      control={<Switch checked={baixa} onChange={handleToggle} />}
      label="Realizado"
      labelPlacement="start"
    />
  );
}

export default Header;