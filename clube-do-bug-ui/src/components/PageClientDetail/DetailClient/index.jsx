import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useHome from '../../../hooks/useHome';
import ModalEditRegisterCharge from "../../General/ModalEditRegisterCharge";
import ModalEditRegisterClient from '../../General/ModalEditRegisterClient';
import ModalRegisterCharge from '../../General/ModalRegisterCharge';
import Popup from '../../General/Popup';
import ClientsDetails from '../ClientsDetails';
import api from '../../../services/api';
import "./style.css";

function DetailClient() {
  const { id } = useParams();
  const { isModalEditRegisterClient, isPopup, setIsPopup, isModalRegisterCharge, isModalEditRegisterCharge, setCurrentClient, setShowAllClients } = useHome();

  async function getClientById() {
    try {
      const { data: client } = (await api.get(`/client/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, }}));
      setCurrentClient(client);
    } catch (error) {
      console.log(error);
      return;
    }
    
  }

  useEffect(() => {
    setShowAllClients(false);
    getClientById();
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setIsPopup(false)
    }, 2000)
  }, [isPopup])

  return (
    <div  className='container-clients'>
            {isModalRegisterCharge && <ModalRegisterCharge />}
            {isPopup && <Popup />}
            <ClientsDetails />
            {isModalEditRegisterClient && <ModalEditRegisterClient />}
            {isModalEditRegisterCharge && <ModalEditRegisterCharge />}
    </div>
  );
}

export default DetailClient;