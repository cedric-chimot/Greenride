import axios from 'axios';
import React from 'react';
import { URL_BACK } from '../../constants/urls/urlBackEnd';
import { useSelector } from 'react-redux';

const ConfirmPopUp = (props) => {
  let url = window.location.href;
  let user = useSelector((state) => state.user);

  ////Supprime un utilisateur, un trajet ou une vente de tokens de la bdd selon l'url////
  let deleteUser = () => {
    if (url.includes('manage/users')) {
      axios.delete(URL_BACK + `/api/users/${props.data.id}`).then((res) => {
        if (res.status === 204) {
          props.setNotif('userDelete_success');
          props.active(false);
        }
      });
    }
    if (url.includes('manage/rides') || url.includes('Admin/ride')) {
      axios.get(
        URL_BACK + `/delete/ride_and_alerts_by_ride_id/${props.data.id}`
      );
      // axios
      //   .delete(`https://127.0.0.1:8000/get/alerts_by_ride_id/${props.data.id}`)
      //   .then(
      //     axios
      //       .delete(`https://127.0.0.1:8000/api/trajets/${props.data.id}`)
      //       .then(props.active(false))
      //   );
    }
    if (url.includes('sellTokens')) {
      axios.delete(URL_BACK + `/api/annonces/${props.data.id}`).then((res) => {
        if (res.status === 204) {
          axios.get(
            URL_BACK + `/calcTokens/add/${user.id}/${props.data.nb_tokens}`
          );
          props.refresh(true);
          props.active(false);
        }
      });
    }
  };

  ////Affiche le contenu selon l'url////
  let contentDisplayer = () => {
    if (url.includes('manage/users')) {
      return (
        <p>
          Vous vous apprêtez à supprimer le compte de
          <span className="text-red-600 text-2xl font-bold">
            {' ' + props.data.prenom + ' ' + props.data.nom + ' '}
          </span>
          , cliquez sur confirmer pour effectuer la suppression.
        </p>
      );
    }
    if (url.includes('manage/rides') || url.includes('Admin/ride')) {
      return (
        <p>
          Vous vous apprêtez à supprimer le trajet
          <span className="text-red-600 text-2xl font-bold">
            {' ' +
              props.data.depart +
              ' - ' +
              props.data.destination +
              ' du ' +
              props.data.depart_date +
              ' '}
          </span>
          , cliquez sur confirmer pour effectuer la suppression.
        </p>
      );
    }
    if (url.includes('sellTokens')) {
      return (
        <p>
          Voulez-vous vraiment supprimer cette annonce ? Cliquez sur confirmer
          pour effectuer la suppression.
        </p>
      );
    }
  };

  return (
    <div className="w-96 bg-blueBg text-white text-xl px-8 py-6 font-bold rounded border-2 absolute top-1/2 left-1/2 translate-x-50 translate-y-80 z-20">
      {contentDisplayer()}
      <div className="mt-6 flex justify-around">
        <button
          className="border-2 py-1 px-3 rounded text-white bg-[#7FC473] hover:bg-red-700 cursor-pointer"
          onClick={() => deleteUser()}
        >
          Confirmer
        </button>
        <button
          className="border-2 py-1 px-3 rounded text-white bg-[#7FC473] hover:bg-[#56B448] cursor-pointer"
          onClick={() => props.active(false)}
        >
          Annuler
        </button>
      </div>
    </div>
  );
};

export default ConfirmPopUp;
