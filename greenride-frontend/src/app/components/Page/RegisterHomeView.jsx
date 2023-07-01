import { Form } from 'formik';
import React, { useEffect, useState } from 'react';
import InputT from '../InputT';
import Card from '../Card';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';
import Chat from '../chat/Chat';
import axios from 'axios';
import { URL_BACK } from '../../constants/urls/urlBackEnd';

const RegisterHomeView = () => {
  document.title = 'Accueil | Greenride';
  const [rides, setRides] = useState([]);
  const navigate = useNavigate();

  ////Recupère la liste des trajets//////
  useEffect(() => {
    axios
      .get(URL_BACK + '/api/trajets')
      .then((res) => setRides(res.data['hydra:member'].reverse()));
  }, []);

  /////Modifie le format de la date, remplace les / par des - /////
  let dateHandler = (date) => {
    let newDate = date;
    newDate =
      date.split('-')[2] + '-' + date.split('-')[1] + '-' + date.split('-')[0];
    return newDate;
  };

  const validationSearch = Yup.object().shape({
    departDate: Yup.date().required('Veuillez indiquer une date de départ'),
    depart: Yup.string()
      .matches(/^[a-zA-Z\-]+$/, 'Veuillez indiquer un lieu de départ correct')
      .required('Veuillez indiquer un lieu de départ'),
    destination: Yup.string()
      .matches(/^[a-zA-Z\-]+$/, 'Veuillez indiquer une destination correcte')
      .required('Veuillez indiquer une destination'),
  });

  ////Affiche les 10 derniers trajets postés/////
  let lastTrajetsDisplayer = () => {
    return rides
      .slice(0, 10)
      .map((ride, index) => (
        <Card
          depart={ride.depart}
          destination={ride.destination}
          departHour={ride.depart_hour}
          id_account={ride.id_account.id}
          date={ride.depart_date}
          id_ride={ride.id}
          key={index}
        />
      ));
  };

  return (
    <div className="relative">
      <div className="flex justify-end bg-slate-200 ">
        <img src="src/app/assets/img/accueil.png" alt="logo" />
      </div>
      <Chat />
      <div className="bg-[#047C89] py-24 text-center">
        <h2 className="text-white font-bold mb-14">
          Rechercher le trajet qui vous correspond
        </h2>
        <div>
          <Formik
            initialValues={{
              depart: '',
              destination: '',
              departDate: '',
            }}
            validationSchema={validationSearch}
            onSubmit={(values) => {
              navigate(
                `/search/results/${values.depart}/${
                  values.destination
                }/${dateHandler(values.departDate)}/00:00`
              );
            }}
          >
            <Form className=" w-2/3 m-autoX mb-24 bg-[#04BEAC] p-8 rounded-md">
              <div className="flex justify-around  mb-12">
                <div className="flex flex-col">
                  <label className="mb-4 text-white text-xl font-bold">
                    Depart
                  </label>
                  <InputT type="text" name="depart" placeholder="Lille" />
                </div>
                <div className="flex flex-col">
                  <label className="mb-4 text-white text-xl font-bold">
                    Destination
                  </label>
                  <InputT type="text" name="destination" placeholder="Paris" />
                </div>
                <div className="flex flex-col">
                  <label className="mb-4 text-white text-xl font-bold">
                    Date
                  </label>
                  <InputT type="date" name="departDate" />
                </div>
              </div>
              <div className="flex justify-around w-full">
                <input
                  type="submit"
                  className="bg-[#7cc474] hover:bg-[#54b44b] tracking-wider text-white font-extrabold py-2 px-4 rounded  cursor-pointer w-1/3"
                  value="Rechercher"
                />
                <NavLink
                  to="/ride/search"
                  className="bg-[#7cc474] hover:bg-[#54b44b] tracking-wider text-white font-extrabold py-2 px-4 rounded  cursor-pointer w-1/3"
                >
                  Recherche avancée
                </NavLink>
              </div>
            </Form>
          </Formik>
        </div>
        <ul className="w-1/2 m-autoX">{lastTrajetsDisplayer()}</ul>
      </div>
    </div>
  );
};

export default RegisterHomeView;
