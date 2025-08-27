import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { 
  TextField, 
  Autocomplete, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { Box } from '@mui/system';

function Form() {
  const [dataLancamento, setDataLancamento] = useState(null);
  const [tipoPessoa, setTipoPessoa] = useState(null);
  const [tipoLancamento, setTipoLancamento] = useState(null);
  const [categoria, setCategoria] = useState(null);
  const [planoDeContas, setPlanoDeContas] = useState(null);
  const [valor, setValor] = useState('');
  const [formaPagamento, setFormaPagamento] = useState(null);
  const [pessoa, setPessoa] = useState(null);
  const [conta, setConta] = useState(null);
  const [parcelamento, setParcelamento] = useState(null);
  const [baixa, setBaixa] = useState(false);
  // Novo estado para o campo Observações
  const [observacoes, setObservacoes] = useState('');

  const tiposPessoa = [
    { label: 'Pessoa física', value: 'fisica' },
    { label: 'Pessoa jurídica', value: 'juridica' },
  ];

  const tiposLancamento = [
    { label: 'Receita', value: 'receita' },
    { label: 'Despesa', value: 'despesa' },
  ];

  const categorias = []; 
  const planosDeContas = [];
  const formasPagamento = [];
  const pessoas = [];
  const contas = [];
  const tiposParcelamento = [];

  const handleValorChange = (event) => {
    const inputValue = event.target.value;
    const regex = /^\d*[,]?\d{0,2}$/;

    if (regex.test(inputValue) || inputValue === '') {
      setValor(inputValue);
    }
  };
  
  const handleBaixaChange = (event) => {
    setBaixa(event.target.checked);
  };

  const handleObservacoesChange = (event) => {
    setObservacoes(event.target.value);
  };

  return (
    <form>
      <Box sx={{ my: 2 }}>
        <DatePicker
          label="Data"
          value={dataLancamento}
          onChange={(newValue) => setDataLancamento(newValue)}
          format="DD/MM/YYYY"
        />
      </Box>

      <Box sx={{ my: 2 }}>
        <Autocomplete
          disablePortal
          id="tipo-pessoa-autocomplete"
          options={tiposPessoa}
          onChange={(event, newValue) => {
            setTipoPessoa(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Tipo Pessoa" />}
        />
      </Box>
      
      <Box sx={{ my: 2 }}>
        <Autocomplete
          disablePortal
          id="tipo-autocomplete"
          options={tiposLancamento}
          onChange={(event, newValue) => {
            setTipoLancamento(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Tipo" />}
        />
      </Box>

      <Box sx={{ my: 2 }}>
        <Autocomplete
          disablePortal
          id="categoria-autocomplete"
          options={categorias}
          onChange={(event, newValue) => {
            setCategoria(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Categoria" />}
        />
      </Box>

      <Box sx={{ my: 2 }}>
        <Autocomplete
          disablePortal
          id="plano-de-contas-autocomplete"
          options={planosDeContas}
          onChange={(event, newValue) => {
            setPlanoDeContas(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Plano de Contas" />}
        />
      </Box>
      
      <Box sx={{ my: 2 }}>
        <Autocomplete
          disablePortal
          id="forma-pagamento-autocomplete"
          options={formasPagamento}
          onChange={(event, newValue) => {
            setFormaPagamento(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Forma de pagamento" />}
        />
      </Box>

      <Box sx={{ my: 2 }}>
        <Autocomplete
          disablePortal
          id="pessoa-autocomplete"
          options={pessoas}
          onChange={(event, newValue) => {
            setPessoa(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Pessoa" />}
        />
      </Box>
      
      <Box sx={{ my: 2 }}>
        <Autocomplete
          disablePortal
          id="conta-autocomplete"
          options={contas}
          onChange={(event, newValue) => {
            setConta(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Conta" />}
        />
      </Box>

      <Box sx={{ my: 2 }}>
        <Autocomplete
          disablePortal
          id="parcelamento-autocomplete"
          options={tiposParcelamento}
          onChange={(event, newValue) => {
            setParcelamento(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Parcelamento" />}
        />
      </Box>

      <Box sx={{ my: 2 }}>
        <TextField
          label="Valor (R$)"
          name="valor"
          fullWidth
          value={valor}
          onChange={handleValorChange}
        />
      </Box>
      
      <Box sx={{ my: 2 }}>
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
      </Box>
      
      {/* Novo campo de texto Observações */}
      <Box sx={{ my: 2 }}>
        <TextField
          label="Observações"
          name="observacoes"
          fullWidth
          multiline
          rows={4} // Inicia com 4 linhas, mas expande conforme a digitação
          value={observacoes}
          onChange={handleObservacoesChange}
        />
      </Box>

      <button type="submit">Salvar</button>
    </form>
  );
}

export default Form;