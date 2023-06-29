import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL_BACK } from '../constants/urls/urlBackEnd';
import BuyPopUp from '../components/Popups/BuyPopUp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomToast from '../components/toast/CustomToast';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

function Annonces() {
  const currentUser = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [annonces, setAnnonces] = useState([]);
  const [popUpActive, setPopUpActive] = useState(false);
  const [notifActive, setNotifActive] = useState('');
  const [storeTokens, setStoreTokens] = useState({});
  const [clientSecret, setClientSecret] = useState('');
  const [amount, setAmount] = useState(0);

  let user = useSelector((state) => state.user);

  const stripePromise = loadStripe(
    'pk_test_51NIpbkHGmb7AiX8YycmocmOufdj5VhBDznYvIl3VgtmJHCxVcdKeUXCcv2NRk10MgHoDVGA7K0a4IqVDccHI0Q4X00SuNWHhP3'
  );

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
  };

  const toastDisplayer = () => {
    if (notifActive === 'success') {
      toast.success(<CustomToast message="Achat réussi !" />, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      axios
        .get(URL_BACK + `/api/annonces`)
        .then((res) => setAnnonces(res.data['hydra:member']));
    }
    if (notifActive === 'failure') {
      toast.error(
        <CustomToast message="Votre achat a échoué, veuillez réessayer." />,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
        }
      );
    }
  };
  useEffect(() => {
    axios
      .get(URL_BACK + `/api/annonces`)
      .then((res) => setAnnonces(res.data['hydra:member']));
  }, []);

  useEffect(() => {
    toastDisplayer();
  }, [notifActive]);

  function popUpHandler(annonces) {
    axios
      .post(URL_BACK + `/stripe/payment/${annonces.montant}`)
      .then((res) => setClientSecret(res.data.clientSecret));
    setStoreTokens(annonces);
    setAmount(annonces.montant);
    setPopUpActive(true);
  }

  function annoncesDisplayer() {
    let filteredAnnonces = annonces.filter((annonce) => {
      if (annonce['vendeur'].id === user.id || annonce.statut === 'termine') {
        return false;
      } else return true;
    });

    if (filteredAnnonces.length > 0) {
      return (
        <div className="test flex flex-col justify-center items-center">
          <table className="table-auto mt-4 mb-4 border-collapse border border-slate-400 bg-Teal">
            <thead>
              <tr>
                <th className="border border-slate-300 px-8 py-2 text-Whitesmoke">
                  Vendeur
                </th>
                <th className="border border-slate-300 px-8 py-2 text-Whitesmoke">
                  Tokens
                </th>
                <th className="border border-slate-300 px-8 py-2 text-Whitesmoke">
                  Montant
                </th>
                <th className="border border-slate-300 px-8 py-2 text-Whitesmoke">
                  Annonce
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAnnonces.map((annonces) => (
                <tr>
                  <td className="border border-slate-300 px-8 py-2 text-center text-Whitesmoke">
                    {annonces['vendeur'] ? annonces['vendeur'].prenom : null}{' '}
                    {annonces['vendeur'] ? annonces['vendeur'].nom : null}
                  </td>
                  <td className="border border-slate-300 px-8 py-2 text-center text-Whitesmoke">
                    {annonces.nb_tokens ? annonces.nb_tokens : null}
                  </td>
                  <td className="border border-slate-300 px-8 py-2 text-center text-Whitesmoke">
                    {annonces.montant ? annonces.montant + ' €' : null}
                  </td>
                  <td className="border border-slate-300 px-8 py-2 text-center text-Whitesmoke">
                    <button
                      className="font-bold px-4 py-2 rounded-xl text-white hover:bg-[#56b448] m-0 transition bg-[#7cc474]"
                      onClick={() => popUpHandler(annonces)}
                    >
                      Acheter
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else
      return (
        <p className="text-2xl font-bold text-Whitesmoke">
          Aucune annonce disponible pour le moment.
        </p>
      );
  }

  

  return (
    <div className="bg-Teal relative">
      {popUpActive && clientSecret.length > 0 ? (
        <Elements stripe={stripePromise} options={options}>
          <BuyPopUp
            annonces={storeTokens}
            setPopUpActive={setPopUpActive}
            setNotifActive={setNotifActive}
            amount={amount}
          />
        </Elements>
      ) : null}
      <div
        className={
          popUpActive
            ? 'flex flex-col h-[84vh]  items-center  text-white bg-[#ffffff]  opacity-80'
            : 'flex flex-col h-[84vh]  items-center  text-white   '
        }
      >
        <div className="title mt-8 mb-4">
          <h1 className="text-Whitesmoke font-bold">Liste des annonces</h1>
        </div>
        <div className=" border-8 w-5/12 py-8 bg-Moonstone text-center justify-center rounded-lg">
          {annoncesDisplayer()}
        </div>
      </div>
    </div>
  );
}

export default Annonces;
