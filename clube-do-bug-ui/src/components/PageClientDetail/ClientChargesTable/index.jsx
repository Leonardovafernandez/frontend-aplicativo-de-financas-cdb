import { createTheme, ThemeProvider } from '@mui/material';
import { useParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import useHome from '../../../hooks/useHome';
import api from '../../../services/api';
import btnOrderClients from './assets/btn-order-clients.svg';
import DeleteClient from './assets/delete-client.svg';
import EditClient from './assets/edit-client.svg';
import './style.css';

export default function ClientChargesTable() {
  const { id } = useParams();

  const theme = createTheme({
    palette: {
      divider: '#fff'
    }
  })

  const { currentClient, setIsModalEditRegisterCharge, setIsModalRegisterCharge,
    chargeList, setCurrentClient,
    setIsModalDeleteCharge, setCurrentCharge, updateRender } = useHome();

  const [clientCharges, setClientCharges] = useState([]);

  function openModalDeleteCharge(charge) {
    setCurrentCharge(charge)
    setIsModalDeleteCharge(true)
  }

  const openModalEditCharge = (charge) => {
    setIsModalEditRegisterCharge(true);
    setCurrentCharge(charge);
  };

  const getClientCharges = async () => {
    try {
      const { data } = await api.get(`/charge/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, }})
      setClientCharges(data)

    } catch (error) {
      return console.log(error);
    }
  }

  async function getChargesList() {
    const { data: allCharges } = await api.get('/charge', { headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, }});

    return allCharges;
  };


  useEffect(() => {
    getChargesList();
    getClientCharges(chargeList);
  }, [updateRender])

  return (

    <div className='flex-column client-data clients-details margin-t-24'>
      <div className='flex-row justify-between'>
        <span className='title3-b'>Cobranças do cliente</span>
        <button className='bg-pink' onClick={() => setIsModalRegisterCharge(true)}>+ Nova cobrança</button>
      </div>
      <ThemeProvider theme={theme}>
        <TableContainer className='margin-t-32'>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <div className='flex-row align-center' style={{ gap: '1rem' }}>
                    <img src={btnOrderClients} alt='Botão ordenar clientes na tabela' />
                    <span className='subtitle'>ID Cob.</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex-row align-center' style={{ gap: '1rem' }}>
                    <img src={btnOrderClients} alt='Botão ordenar clientes na tabela' />
                    <span className='subtitle'>Data de venc.</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className='subtitle'>Valor</span>
                </TableCell>
                <TableCell>
                  <span className='subtitle'>Status</span>
                </TableCell>
                <TableCell>
                  <span className='subtitle'>Descrição</span>
                </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {
                clientCharges.length > 0 && clientCharges.map((charge, i) => {
                  return (
                    <TableRow key={charge.id}>
                      <TableCell>
                        <span className='gray6 medium-body'>{i + 1}</span>
                      </TableCell>
                      <TableCell>
                        <span className='gray6 medium-body'>{charge.due_date}</span>
                      </TableCell>
                      <TableCell>
                        <span className='gray6 medium-body'>{`R$ ${Number(charge.value).toFixed(2)}`}</span>
                      </TableCell>
                      <TableCell>
                        <span className='gray6 medium-body'>
                          {
                            charge.status === 'paga' ?
                              <span className='client-status pd-26 cyan bg-cyan'>Paga</span>
                              : charge.status === 'pendente' ? <span className='client-status pd-8 yellow bg-light-red'>Pendente</span> :
                                <span className='client-status pd-17 red bg-light-red'>Vencida</span>
                          }
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className='gray6 medium-body'>{charge.description}</span>
                      </TableCell>
                      <TableCell>
                        <div className='flex-row' style={{ justifyContent: 'space-around' }}>
                          <img
                            src={EditClient}
                            alt='Botão editar cobrança'
                            style={{ cursor: 'pointer' }}
                            onClick={() => openModalEditCharge(charge)}
                          />

                          <img
                            src={DeleteClient}
                            alt='Botão remover cobrança'
                            style={{ cursor: 'pointer' }}
                            onClick={() => openModalDeleteCharge(charge)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
    </div>
  )
}  