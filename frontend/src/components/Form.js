import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Autocomplete, TextField, Switch, FormControlLabel} from '@mui/material';

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
      <Grid container spacing={2} marginLeft={5} marginRight={5}>
        {/* Linha 1: 4 campos */}
        <Grid item size={{ xs:12, md:3}}>
          <DatePicker            
            label="Data"
            value={dataLancamento}
            onChange={(newValue) => setDataLancamento(newValue)}
            format="DD/MM/YYYY"
            renderInput={(params) => <TextField {...params} fullWidth/>}
          />
        </Grid>
        <Grid item size={{ xs:12, md:3}}>
          <TextField
            fullWidth
            label="Valor (R$)"
            name="valor"
            value={valor}
            onChange={handleValorChange}
          />
        </Grid>
        <Grid item size={{ xs:12, md:3}}>
          <Autocomplete
            disablePortal
            id="parcelamento-autocomplete"
            options={tiposParcelamento}
            onChange={(event, newValue) => {
              setParcelamento(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Parcelamento" fullWidth />}
          />
        </Grid>
        <Grid item size={{ xs:12, md:3}}>
          <Autocomplete
            disablePortal
            id="forma-pagamento-autocomplete"
            options={formasPagamento}
            onChange={(event, newValue) => {
              setFormaPagamento(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Forma de pagamento" fullWidth />}
          />
        </Grid>

        {/* Linha 2: 4 campos */}
        <Grid item size={{ xs:12, md:3}}>
          <Autocomplete
            disablePortal
            id="tipo-pessoa-autocomplete"
            options={tiposPessoa}
            onChange={(event, newValue) => {
              setTipoPessoa(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Tipo Pessoa" fullWidth />}
          />
        </Grid>
        <Grid item size={{ xs:12, md:3}}>
          <Autocomplete
            disablePortal
            id="tipo-autocomplete"
            options={tiposLancamento}
            onChange={(event, newValue) => {
              setTipoLancamento(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Tipo" fullWidth />}
          />
        </Grid>
        <Grid item size={{ xs:12, md:3}}>
          <Autocomplete
            disablePortal
            id="categoria-autocomplete"
            options={categorias}
            onChange={(event, newValue) => {
              setCategoria(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Categoria" fullWidth />}
          />
        </Grid>
        <Grid item size={{ xs:12, md:3}}>
          <Autocomplete
            disablePortal
            id="plano-de-contas-autocomplete"
            options={planosDeContas}
            onChange={(event, newValue) => {
              setPlanoDeContas(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Plano de Contas" fullWidth />}
          />
        </Grid>

        {/* Linha 3: 2 campos */}
        <Grid item size={{ xs:12, md:3}}>
          <Autocomplete
            disablePortal
            id="pessoa-autocomplete"
            options={pessoas}
            onChange={(event, newValue) => {
              setPessoa(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Pessoa" fullWidth />}
          />
        </Grid>
        <Grid item size={{ xs:12, md:3}}>
          <Autocomplete
            disablePortal
            id="conta-autocomplete"
            options={contas}
            onChange={(event, newValue) => {
              setConta(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Conta" fullWidth />}
          />
        </Grid>
        
        <Grid item size={{ xs:6 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Data</TableCell>
                  <TableCell>Parcela</TableCell>
                  <TableCell>Valor</TableCell>
                  <TableCell>Baixa</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/*Aqui, você mapeará o array 'parcelas'}
                  {parcelas.map((parcela, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {/* Campo de Data editável (DatePicker ou TextField) }
                      </TableCell>
                      <TableCell>{parcela.parcelaTexto}</TableCell> {/* Campo não editável }
                      <TableCell>
                        {/* Campo de Valor editável (TextField) }
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={parcela.baixa}
                          onChange={(event) => handleToggleBaixa(index, event.target.checked)}
                          name={`baixa-${index}`}
                        />
                      </TableCell>
                    </TableRow>
                  ))*/}                
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item size={{ xs:6 }}>
          <TextField            
            label="Observações"
            name="observacoes"
            fullWidth
            multiline
            rows={4}
            value={observacoes}
            onChange={handleObservacoesChange}
          />
        </Grid>

        {/* Linha 5: Switch de Baixa (em largura total) */}
        <Grid item size={{ xs:12 }}>
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
        </Grid>
      </Grid>
      <button type="submit">Salvar</button>
    </form>
  );
}

export default Form;