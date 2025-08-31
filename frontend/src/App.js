/* global google */
import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import Header from './components/Header';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Typography, Container, CssBaseline, Button, Autocomplete, TextField } from '@mui/material';
import dayjs from 'dayjs';

function App() {
  const [baixa, setBaixa] = useState(false);
  const [isTableActive, setIsTableActive] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Estados do formulário movidos para App.js
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
  const [parcelaInicial, setParcelaInicial] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [parcelas, setParcelas] = useState([]);

  // Novo estado para os campos que não serão limpos após o salvamento
  const [camposFixos, setCamposFixos] = useState([]);

  // Lista de campos para o Autocomplete, excluindo a tabela de parcelas
  const camposFormulario = [
    { label: 'Data', value: 'dataLancamento' },
    { label: 'Valor', value: 'valor' },
    { label: 'Parcelamento', value: 'parcelamento' },
    { label: 'Parcela incial', value: 'pacelaInicial' },
    { label: 'Forma de pagamento', value: 'formaPagamento' },
    { label: 'Tipo Pessoa', value: 'tipoPessoa' },
    { label: 'Tipo', value: 'tipoLancamento' },
    { label: 'Categoria', value: 'categoria' },
    { label: 'Plano de Contas', value: 'planoDeContas' },
    { label: 'Pessoa', value: 'pessoa' },
    { label: 'Conta', value: 'conta' },
    { label: 'Observações', value: 'observacoes' },
    { label: 'Baixa', value: 'baixa' },
  ];

  // Mapeamento dos campos para as funções de limpeza
  const resetters = {
    dataLancamento: () => setDataLancamento(null),
    valor: () => setValor(''),
    parcelamento: () => setParcelamento(null),
    parcelaInicial: () => setParcelaInicial(''),
    formaPagamento: () => setFormaPagamento(null),
    tipoPessoa: () => setTipoPessoa(null),
    tipoLancamento: () => setTipoLancamento(null),
    categoria: () => setCategoria(null),
    planoDeContas: () => setPlanoDeContas(null),
    pessoa: () => setPessoa(null),
    conta: () => setConta(null),
    observacoes: () => setObservacoes(''),
    baixa: () => setBaixa(false)
  };

  // useEffect para validar o formulário
  useEffect(() => {
    const validateForm = () => {
      // ✅ PONTO 1: Adicionando pessoa e conta na validação
      const requiredFieldsFilled =
        dataLancamento &&
        valor &&
        parcelamento &&
        formaPagamento &&
        tipoPessoa &&
        tipoLancamento &&
        categoria &&
        planoDeContas &&
        pessoa &&
        conta;

      if (!requiredFieldsFilled) {
        setIsFormValid(false);
        return;
      }

      if (parcelamento && parcelamento.value > 1) {
        const allParcelasValid = parcelas.every(parcela => parcela.data && parcela.valor);
        if (!allParcelasValid) {
          setIsFormValid(false);
          return;
        }
      }

      setIsFormValid(true);
    };

    validateForm();
  }, [dataLancamento, valor, parcelamento, formaPagamento, tipoPessoa, tipoLancamento, categoria, planoDeContas, pessoa, conta, parcelas]);

  const handleClear = () => {
    Object.values(resetters).forEach(reset => reset());
    setParcelas([]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();    
    const objFormData = {
      dataLancamento: dataLancamento ? dataLancamento.format('DD/MM/YYYY') : '',
      valor: valor,
      parcelamento: parcelamento,
      parcelaInicial: parcelaInicial,
      formaPagamento: formaPagamento,
      tipoPessoa: tipoPessoa,
      tipoLancamento: tipoLancamento,
      categoria: categoria,
      planoDeContas: planoDeContas,
      pessoa: pessoa,
      conta: conta,
      observacoes: observacoes,
      baixa: baixa,
      parcelas: parcelas.map(p => ({
        ...p,
        data: p.data ? p.data.format('DD/MM/YYYY') : ''
      })),    
    }

    google.script.run
        .withSuccessHandler(response => {
          if (response.status === 'success') {
            console.log('Lançamento cadastrado com sucesso');
          } else {
            console.error('Erro ao cadastrar o lançamento:', response.message);
          }
        })
        .withFailureHandler(error => {
          console.error('Falha na comunicação com o Apps Script:', error);
        })
        .submitForm(objFormData);

    // Limpeza seletiva após o salvamento
    const camposParaLimpar = camposFormulario.map(c => c.value).filter(c => !camposFixos.includes(c));
    camposParaLimpar.forEach(campo => {
      if (resetters[campo]) {
        resetters[campo]();
      }
    });
    setParcelas([]);
  };

  return (
    <form onSubmit={handleSubmit}>
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
            justifyContent: 'space-between',
            alignItems: 'center',
            flexShrink: 0
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button variant="outlined" sx={{ mr: 1 }} onClick={handleClear}>Limpar</Button>
            <Button type='submit' variant="contained" disabled={!isFormValid}>Salvar</Button>
            {/* ✅ PONTO 2: Estilizando o Autocomplete e ✅ PONTO 3: Filtrando as opções */}
            <Autocomplete
              multiple
              id="campos-fixos-autocomplete"
              options={camposFormulario.filter(campo => !camposFixos.includes(campo.value))}
              getOptionLabel={(option) => option.label || ""}
              value={camposFormulario.filter(campo => camposFixos.includes(campo.value))}
              onChange={(event, newValue) => {
                const newValues = newValue.map(option => option.value);
                setCamposFixos(newValues);
              }}
              sx={{ 
                minWidth: 400,
                maxWidth: 'auto',
                ml: 5,
                mr: 5
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Campos para não limpar ao salvar"
                  multiline
                  minRows={1}
                  maxRows={2}
                  sx={{
                    '.MuiInputBase-root': {
                      fontSize: '1rem', // Fonte menor
                      lineHeight: '1', // Espaçamento menor
                      //paddingTop: '0.5rem !important',
                      //paddingBottom: '0.2rem !important',                      
                    },
                    '.MuiChip-root': {
                      height: '1.2rem', // Altura do chip
                      fontSize: '0.7rem',
                    },
                    '.MuiAutocomplete-inputRoot': {
                      minHeight: 'auto',                      
                    },
                  }}
                />
              )}
            />
          </Box>
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
              // Passando os estados e setters como props
              dataLancamento={dataLancamento}
              setDataLancamento={setDataLancamento}
              tipoPessoa={tipoPessoa}
              setTipoPessoa={setTipoPessoa}
              tipoLancamento={tipoLancamento}
              setTipoLancamento={setTipoLancamento}
              categoria={categoria}
              setCategoria={setCategoria}
              planoDeContas={planoDeContas}
              setPlanoDeContas={setPlanoDeContas}
              valor={valor}
              setValor={setValor}
              formaPagamento={formaPagamento}
              setFormaPagamento={setFormaPagamento}              
              pessoa={pessoa}
              setPessoa={setPessoa}
              conta={conta}
              setConta={setConta}
              parcelamento={parcelamento}
              setParcelamento={setParcelamento}
              parcelaInicial={parcelaInicial}
              setParcelaInicial={setParcelaInicial}
              observacoes={observacoes}
              setObservacoes={setObservacoes}
              parcelas={parcelas}
              setParcelas={setParcelas}
              // Demais props
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