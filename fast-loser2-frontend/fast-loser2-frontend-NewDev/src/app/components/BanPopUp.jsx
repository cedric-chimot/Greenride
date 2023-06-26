import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';
import { URL_BACK } from '../constants/urls/urlBackEnd';

const BanPopUp = (props) => {
  const [banDuration, setBanDuration] = useState(604800000);
  const [banDate, setBanDate] = useState();
  const [confirm, setConfirm] = useState(false);

  const confirmHandler = () => {
    if (props.theme === 'ban' && confirm === false) {
      setBanDate(Number(Date.now()) + Number(banDuration));
      setConfirm(true);
    }
    if (props.theme === 'ban' && confirm) {
      banHandler();
    }
    if (props.theme === 'warn') {
      warningHandler();
    }
  };

  const banHandler = () => {
    let id = props.user_signal.id;
    props.setBanDate(banDate);

    axios.get(URL_BACK + `/ban/${banDate}/${id}`).then((res) => {
      if (res.status === 200) {
        props.setNotifTheme('ban');
        props.setActive(false);
      }
    });
  };

  const warningHandler = () => {
    axios
      .get(
        URL_BACK +
          `/warn/${Number(props.user_signal.avertissements) + 1}/${
            props.user_signal.id
          }`
      )
      .then((res) => {
        if (res.status === 200) {
          if (res.data.avertissements === 2) {
            let banDate = Number(Date.now()) + 604800000;
            axios.get(URL_BACK + `/ban/${banDate}/${props.user_signal.id}`);
          }
          if (res.data.avertissements === 3) {
            let banDate = Number(Date.now()) + 2419200000;
            axios.get(URL_BACK + `/ban/${banDate}/${props.user_signal.id}`);
          }
          if (res.data.avertissements === 4) {
            let banDate = 2419200000000;
            axios.get(URL_BACK + `/ban/${banDate}/${props.user_signal.id}`);
          }

          props.setNotifTheme('warn');
          props.setActive(false);
        }
      });
  };

  return (
    <div
      className="w-96 bg-blueBg text-white text-xl  
    font-bold rounded border-2 absolute top-1/2 left-1/2 
    translate-x-50 translate-y-80 z-20 text-center"
    >
      <div className="relative px-8 py-6">
        <FontAwesomeIcon
          icon={faXmark}
          className="absolute right-[10px] top-[5px] cursor-pointer"
          onClick={() => props.setActive(false)}
        />
        {confirm && props.theme === 'ban' ? (
          <p className="mb-8 leading-relaxed">
            {'Vous vous apprêtez à bannir ' +
              (
                props.user_signal.prenom +
                ' ' +
                props.user_signal.nom
              ).toUpperCase() +
              " jusqu'au " +
              new Date(banDate).toLocaleDateString() +
              ' , confirmer ?'}
          </p>
        ) : null}
        {props.theme === 'ban' && confirm === false ? (
          <div>
            <p className="font-bold">
              {(
                props.user_signal.prenom +
                ' ' +
                props.user_signal.nom
              ).toUpperCase()}
            </p>
            <p className="mt-4">Durée du bannissement</p>
            <select
              className="block w-2/3 mx-auto bg-transparent border-[1px] border-white text-white rounded mt-3 mb-5 cursor-pointer appearance-none"
              onChange={(e) => setBanDuration(e.target.value)}
            >
              <option className="text-black font-bold" value={604800000}>
                1 semaine
              </option>
              <option className="text-black font-bold" value={1209600000}>
                2 semaines
              </option>
              <option className="text-black font-bold" value={2419200000}>
                1 mois
              </option>
              <option className="text-black font-bold" value={7257600000}>
                3 mois
              </option>
              <option className="text-black font-bold" value={14515200000}>
                6 mois
              </option>
              <option className="text-black font-bold" value={1}>
                Définitivement
              </option>
            </select>
          </div>
        ) : null}
        {props.theme === 'warn' ? (
          <p className="mb-8 leading-relaxed">
            {'Vous vous apprêtez à envoyer un avertissement à ' +
              (
                props.user_signal.prenom +
                ' ' +
                props.user_signal.nom
              ).toUpperCase() +
              ' , confirmer ?'}
          </p>
        ) : null}

        <div className="flex justify-between">
          <button
            className="border-2 py-1 px-3 rounded text-white bg-[#7FC473] hover:bg-[#56B448] cursor-pointer"
            onClick={() => {
              confirmHandler();
            }}
          >
            Confirmer
          </button>
          <button
            className="border-2 py-1 px-3 rounded text-white bg-[#7FC473] hover:bg-red-700 cursor-pointer"
            onClick={() => props.setActive(false)}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default BanPopUp;
