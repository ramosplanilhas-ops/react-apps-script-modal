/* global google */
import React, { useState, useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Autocomplete, TextField, Switch, FormControlLabel} from '@mui/material';
import { DateField } from '@mui/x-date-pickers/DateField';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

function Form({ baixa, onBaixaChange, onTableActiveChange }) {
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
  const [observacoes, setObservacoes] = useState('');
  const [tiposParcelamento, setTiposParcelamento] = useState([]);
  const [formasPagamento, setFormasPagamento] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [planosDeContas, setPlanosDeContas] = useState([]);
  const [pessoas, setPessoas] = useState([]);
  const [contas, setContas] = useState([]);
  const [parcelas, setParcelas] = useState([]);

  const [isCategoriaDisabled, setIsCategoriaDisabled] = useState(true);
  const [isPlanoDeContasDisabled, setIsPlanoDeContasDisabled] = useState(true);
  const [isPessoaDisabled, setIsPessoaDisabled] = useState(true);
  const [isContaDisabled, setIsContaDisabled] = useState(true);

  useEffect(() => {
    if (typeof google !== 'undefined' && google.script && google.script.run) {
      google.script.run
        .withSuccessHandler(response => {
          if (response.status === 'success') {
            setTiposParcelamento(response.data);
          } else {
            console.error('Erro ao carregar opções de parcelamento:', response.message);
          }
        })
        .withFailureHandler(error => {
          console.error('Falha na comunicação com o Apps Script:', error);
        })
        .getParcelamentoOptions();
      
      google.script.run
        .withSuccessHandler(response => {
          if (response.status === 'success') {
            setFormasPagamento(response.data);
          } else {
            console.error('Erro ao carregar opções de forma de pagamento:', response.message);
          }
        })
        .withFailureHandler(error => {
          console.error('Falha na comunicação com o Apps Script:', error);
        })
        .getPaymentMethodsOptions();
    }
  }, []);

  useEffect(() => {
    if (tipoPessoa && tipoLancamento) {
      setIsCategoriaDisabled(false);
      google.script.run
        .withSuccessHandler(response => {
          if (response.status === 'success') {
            setCategorias(response.data);
          } else {
            console.error('Erro ao carregar opções de categoria:', response.message);
          }
        })
        .withFailureHandler(error => {
          console.error('Falha na comunicação com o Apps Script:', error);
        })
        .getCategoriesOptions(tipoLancamento.value, tipoPessoa.label);
    } else {
      setCategorias([]);
      setCategoria(null);
      setIsCategoriaDisabled(true);
    }
  }, [tipoPessoa, tipoLancamento]);

  useEffect(() => {
    if (tipoPessoa && tipoLancamento && categoria) {
      setIsPlanoDeContasDisabled(false);
      google.script.run
        .withSuccessHandler(response => {
          if (response.status === 'success') {
            setPlanosDeContas(response.data);
          } else {
            console.error('Erro ao carregar opções de plano de contas:', response.message);
          }
        })
        .withFailureHandler(error => {
          console.error('Falha na comunicação com o Apps Script:', error);
        })
        .getAccountPlansOptions(tipoPessoa.label, tipoLancamento.value, categoria.label);
    } else {
      setPlanoDeContas([]);
      setPlanoDeContas(null);
      setIsPlanoDeContasDisabled(true);
    }
  }, [tipoPessoa, tipoLancamento, categoria]);

  useEffect(() => {
    if (tipoPessoa) {
      setIsPessoaDisabled(false);
      google.script.run
        .withSuccessHandler(response => {
          if (response.status === 'success') {
            setPessoas(response.data);
          } else {
            console.error('Erro ao carregar opções de pessoa:', response.message);
          }
        })
        .withFailureHandler(error => {
          console.error('Falha na comunicação com o Apps Script:', error);
        })
        .getPeopleOptions(tipoPessoa.label);
    } else {
      setPessoas([]);
      setPessoa(null);
      setIsPessoaDisabled(true);
    }
  }, [tipoPessoa]);

  useEffect(() => {
    if (tipoPessoa && pessoa) {
      setIsContaDisabled(false);
      google.script.run
        .withSuccessHandler(response => {
          if (response.status === 'success') {
            setContas(response.data);
          } else {
            console.error('Erro ao carregar opções de conta:', response.message);
          }
        })
        .withFailureHandler(error => {
          console.error('Falha na comunicação com o Apps Script:', error);
        })
        .getAccountOptions(tipoPessoa.label, pessoa.label);
    } else {
      setContas([]);
      setConta(null);
      setIsContaDisabled(true);
    }
  }, [tipoPessoa, pessoa]);

  useEffect(() => {
    if (dataLancamento && valor && parcelamento && parcelamento.value > 1) {
      const parsedValor = parseFloat(valor.replace(',', '.')) || 0;
      const numParcelas = parcelamento.value;
      
      const novasParcelas = Array.from({ length: numParcelas }, (_, i) => {
        const dataParcela = dayjs(dataLancamento).add(i, 'month');
        const valorParcela = (parsedValor / numParcelas).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        return {
          id: i,
          data: dataParcela,
          parcelaTexto: `${i + 1} de ${numParcelas}`,
          valor: valorParcela,
          baixa: baixa,
        };
      });
      setParcelas(novasParcelas);
      onTableActiveChange(true);
    } else {
      setParcelas([]);
      onTableActiveChange(false);
    }
  }, [dataLancamento, valor, parcelamento, baixa]); 
  
  const tiposPessoa = [
    { label: 'Pessoa física', value: 'fisica' },
    { label: 'Pessoa jurídica', value: 'juridica' },
  ];

  const tiposLancamento = [
    { label: 'Receita', value: 'receita' },
    { label: 'Despesa', value: 'despesa' },
  ];

  const handleValorChange = (event) => {
    const inputValue = event.target.value;
    const regex = /^\d*[,]?\d{0,2}$/;
    if (regex.test(inputValue) || inputValue === '') {
      setValor(inputValue);
    }
  };
  
  const handleToggleBaixa = (index, newCheckedState) => {
    const newParcelas = [...parcelas];
    newParcelas[index].baixa = newCheckedState;
    setParcelas(newParcelas);

    const allChecked = newParcelas.every(p => p.baixa);
    if (onBaixaChange) {
      onBaixaChange(allChecked);
    }
  };

  const handleParcelaDateChange = (index, newValue) => {
    const newParcelas = [...parcelas];
    newParcelas[index].data = newValue;
    setParcelas(newParcelas);
  };

  const handleParcelaValueChange = (index, event) => {
    const inputValue = event.target.value;
    const regex = /^\d*[,]?\d{0,2}$/;
    if (regex.test(inputValue) || inputValue === '') {
      const newParcelas = [...parcelas];
      newParcelas[index].valor = inputValue;
      setParcelas(newParcelas);
    }
  };

  const handleObservacoesChange = (event) => {
    setObservacoes(event.target.value);
  };

  return (    
    <Grid container spacing={2} marginLeft={5} marginRight={5}>
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
          getOptionLabel={(option) => option.label || ""}
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
          getOptionLabel={(option) => option.label || ""}
          onChange={(event, newValue) => {
            setFormaPagamento(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Forma de pagamento" fullWidth />}
        />
      </Grid>

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
          value={categoria}
          getOptionLabel={(option) => option.label || ""}
          disabled={isCategoriaDisabled}
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
          value={planoDeContas}
          getOptionLabel={(option) => option.label || ""}
          disabled={isPlanoDeContasDisabled}
          onChange={(event, newValue) => {
            setPlanoDeContas(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Plano de Contas" fullWidth />}
        />
      </Grid>

      <Grid container size={6}>
          <Grid item size={{ xs:12, md:6}}>
            <Autocomplete
              disablePortal
              id="pessoa-autocomplete"
              options={pessoas}
              value={pessoa}
              getOptionLabel={(option) => option.label || ""}
              disabled={isPessoaDisabled}
              onChange={(event, newValue) => {
                setPessoa(newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Pessoa" fullWidth />}
            />
          </Grid>
          <Grid item size={{ xs:12, md:6}}>
            <Autocomplete
              disablePortal
              id="conta-autocomplete"
              options={contas}
              value={conta}
              getOptionLabel={(option) => option.label || ""}
              disabled={isContaDisabled}
              onChange={(event, newValue) => {
                setConta(newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Conta" fullWidth />}
            />
          </Grid>
          <Grid item size={{ xs:12, md:12}}>
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
      </Grid>
      <Grid item size={{ xs:12, md:6}}>
        <TableContainer sx={{ maxHeight: 300, overflowY: 'auto' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ py: 0.5, px: 1, width: '25%' }}>Data</TableCell>
                <TableCell sx={{ py: 0.5, px: 1, width: '20%' }}>Parcela</TableCell>
                <TableCell sx={{ py: 0.5, px: 1, width: '35%' }}>Valor</TableCell>
                <TableCell sx={{ py: 0.5, px: 1, width: '20%' }}>Baixa</TableCell>
              </TableRow>
            </TableHead>
            {parcelas.length > 0 && (
              <TableBody>
                {parcelas.map((parcela, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ py: 0.4, px: 1, width: '15%' }}>
                      <DateField
                        value={parcela.data}
                        onChange={(newValue) => handleParcelaDateChange(index, newValue)}
                        format="DD/MM/YYYY"
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        size="small"
                      />
                    </TableCell>
                    <TableCell sx={{ py: 0.4, px: 1, width: '25%' }}>{parcela.parcelaTexto}</TableCell>
                    <TableCell sx={{ py: 0.4, px: 1, width: '50%' }}>
                      <TextField
                        value={parcela.valor}
                        onChange={(event) => handleParcelaValueChange(index, event)}
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        size="small"
                      />
                    </TableCell>
                    <TableCell sx={{ py: 0.4, px: 1, width: '10%' }}>
                      <Switch
                        checked={parcela.baixa}
                        onChange={(event) => handleToggleBaixa(index, event.target.checked)}
                        name={`baixa-${index}`}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Grid>        
    </Grid>          
  );
}

export default Form;