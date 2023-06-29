import axios from 'axios';
import React from 'react';
import { URL_BACK } from '../../constants/urls/urlBackEnd';
import { useSelector } from 'react-redux';
import InputT from '../InputT';
import { Form, Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import * as Yup from 'yup';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BuyPopUp = (props) => {
  let url = window.location.href;
  let user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const elements = useElements();
  const stripe = useStripe();

  ////Ajoute les tokens achetés à l'acheteur et enlève les tokens au vendeur (fonction dans le controller)////
  const buyHandler = () => {
    let date = new Date().toLocaleDateString().replaceAll('/', '-');
    axios
      .get(
        URL_BACK +
          `/sellTokens/${props.annonces['vendeur'].id}/${user.id}/${props.annonces.nb_tokens}/${props.annonces.id}/${date}`
      )
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          props.setPopUpActive(false);
          props.setNotifActive('success');
        } else props.setNotifActive('failure');
      });
  };

  const paymentElementOptions = {
    layout: 'tabs',
    paymentMethodOrder: ['card'],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const error = stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:5173',
      },
    });

    buyHandler();
  };

  return (
    <div className="w-96 bg-blueBg text-white text-xl  font-bold rounded border-2 absolute top-1/2 left-1/2 translate-x-50 translate-y-50 z-20">
      <FontAwesomeIcon
        icon={faXmark}
        className="absolute right-[10px] top-[5px] cursor-pointer"
        onClick={() => props.setPopUpActive(false)}
      />
      <div className="px-8 py-6">
        <p>
          Vous vous apprêtez à acheter {props.annonces.nb_tokens} tokens à{' '}
          {props.annonces['vendeur'].prenom} {props.annonces['vendeur'].nom},
          indiquez vos informations de paiement pour poursuivre.
        </p>

        <form
          className="mt-6 relative text-center text-white text-xl "
          onSubmit={(e) => handleSubmit(e)}
        >
          <PaymentElement
            options={paymentElementOptions}
            className="text-white"
          />
          <div className="flex justify-between  mt-8">
            <button
              className="border-2 py-1 px-3 rounded text-white bg-[#7FC473] hover:bg-[#56B448] cursor-pointer"
              type="submit"
            >
              Confirmer
            </button>
            <button
              className="border-2 py-1 px-3 rounded text-white bg-[#7FC473] hover:bg-red-700 cursor-pointer"
              onClick={() => props.setPopUpActive(false)}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuyPopUp;
