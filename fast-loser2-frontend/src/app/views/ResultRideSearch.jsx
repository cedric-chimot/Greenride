import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import { PuffLoader } from 'react-spinners';
import { URL_BACK } from '../constants/urls/urlBackEnd';

const ResultRideSearch = () => {
  const [params, setParams] = useState({});
  const [result, setResult] = useState([]);
  const [ride, setRide] = useState([]);

  ////Récupère les paramètres dans l'url : depart, destination, date////
  let getParamFromUrl = () => {
    let url = window.location.href;
    setParams({
      depart: url.split('/')[5],
      destination: url.split('/')[6],
      date: url.split('/')[7],
    });
  };

  ////Recup paramètres + fetch de tous les trajets et les stocke dans le state ride/////
  useEffect(() => {
    getParamFromUrl();
    axios
      .get(URL_BACK + '/api/trajets')
      .then((res) => setRide(res.data['hydra:member']));
  }, []);

  ////Filtre les trajets en fonction des paramètres quand le state ride est modifié////
  useEffect(() => {
    resultFilter();
  }, [ride]);

  ////Filtre les trajets en fonction des paramètres////
  let resultFilter = () => {
    let result = ride.filter(function (ride) {
      if (
        ride.depart === params.depart &&
        ride.destination === params.destination &&
        ride.depart_date === params.date
      ) {
        return true;
      } else return false;
    });
    setResult(result);
  };

  /////Affiche les trajets qui passent le filtrage ou affiche un message d'excuse si pas de trajets correspondant/////
  let ridesDisplayer = () => {
    if (result.length > 0) {
      return result.map((ride) => (
        <Card
          depart={ride.depart}
          destination={ride.destination}
          id_account={ride.id_account.id}
          departHour={ride.depart_hour}
          date={ride.depart_date}
          id_ride={ride.id}
        />
      ));
    } else
      return (
        <h3 className="my-12 text-white">
          Nous sommes désolés, aucun trajet ne correspond à vos critères.
        </h3>
      );
  };

  return (
    <div className="min-h-[84vh] text-center py-12 bg-blueBg">
      <h1 className="mb-12 text-white">Résultat(s) de votre recherche</h1>
      <ul className="w-1/2 h-5/6 bg-blueBg m-auto border-t-2 border-t-white">
        {ride.length < 1 ? (
          <div className="h-40 w-40 m-auto py-12">
            <PuffLoader color="#3DCC85" size={160} />
          </div>
        ) : (
          ridesDisplayer()
        )}
      </ul>
    </div>
  );
};

export default ResultRideSearch;
