import React, { useState, useEffect, useRef } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import axios from 'axios';
import { URL_BACK } from '../../constants/urls/urlBackEnd';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import InputT from '../InputT';
import { Form } from 'formik';
import { useNavigate } from 'react-router-dom';

const UnregisteredHomeView = () => {
  document.title = 'Accueil | Greenride';
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [rides, setRides] = useState([]);

  useEffect(() => {
    axios
      .get(URL_BACK + '/api/trajets')
      .then((res) => setRides(res.data['hydra:member'].reverse()));
  }, []);

  ////Recupère la liste des trajets//////
  let lastTrajetsDisplayer = () => {
    return rides
      .slice(0, 4)
      .map((ride) => (
        <Card
          depart={ride.depart}
          destination={ride.destination}
          departHour={ride.depart_hour}
          destinationHour={ride.destination_hour}
          date={ride.depart_date}
          id_account={ride.id_account.id}
          id_ride={ride.id}
        />
      ));
  };

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
  /* ANIMATION OBSERVER   --------------RIGHT TO LEFT-----------------     */

  const animElementRight = useRef(null);

  useEffect(() => {
    const animElement = animElementRight.current;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Déclencher l'animation ici
          animElement.classList.add('animate-slide-right');
        } else {
          animElement.classList.remove('animate-slide-right');
        }
      });
    });

    observer.observe(animElement);

    return () => {
      observer.unobserve(animElement);
    };
  }, []);

  /*--------------------------------LEFT TO RIGHT---------------------------------*/

  const animElementLeft = useRef(null);

  useEffect(() => {
    const animElement2 = animElementLeft.current;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Déclencher l'animation ici
          animElement2.classList.add('animate-slide-left');
        } else {
          animElement2.classList.remove('animate-slide-left');
        }
      });
    });

    observer.observe(animElement2);

    return () => {
      observer.unobserve(animElement2);
    };
  }, []);

  /*------------------------------TOP TO BOTTOM---------------------------------------*/

  const animElementBottom = useRef(null);

  useEffect(() => {
    const animElement3 = animElementBottom.current;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Déclencher l'animation ici
          animElement3.classList.add('animate-slide-in-down');
        } else {
          animElement3.classList.remove('animate-slide-in-down');
        }
      });
    });

    observer.observe(animElement3);

    return () => {
      observer.unobserve(animElement3);
    };
  }, []);

  /* FIN ANIMATION OBSERVER*/

  return (
    <>
      <div className="containerFull">
        <div className="flex justify-end bg-slate-200">
          <img
            ref={animElementRight}
            src="src/app/assets/img/accueil.png"
            alt="logo"
          />
        </div>
        <div className="flex flex-col bg-blueBg py-14">
          <div
            ref={animElementBottom}
            className="mb-14 text-center text-white mt-0"
          >
            <h1 className="text-5xl text-bold ">
              Découvrez les offres de trajets de nos{' '}
              <span className="text-[#b2ffa6]">utilisateurs</span>
            </h1>
          </div>

          <div className="grid grid-cols-[40%,60%] w-95 m-autoX">
            <div
              ref={animElementLeft}
              className="m-autoX  bg-lightBlue h-490 w-740 flex justify-center items-center rounded-tl-md rounded-bl-md rounded-br-md rounded-tr-3xl"
            >
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
                <Form className="flex flex-col items-center">
                  <div className="flex items-center w-400 justify-between mb-8">
                    <label
                      className="font-bold text-xl text-white "
                      htmlFor="from"
                    >
                      Départ :
                    </label>
                    <InputT
                      placeholder="Votre départ..."
                      type="text"
                      id="from"
                      name="depart"
                      width="2/3"
                    />
                  </div>
                  <div className="flex items-center w-400 justify-between mb-8">
                    <label
                      className="font-bold text-xl text-white"
                      htmlFor="to"
                    >
                      Destination :
                    </label>
                    <InputT
                      placeholder="Votre destination..."
                      type="text"
                      id="to"
                      name="destination"
                      width="2/3"
                    />
                  </div>
                  <div className="flex items-center w-400 justify-between mb-8">
                    <label
                      className="font-bold text-xl text-white"
                      htmlFor="to"
                    >
                      Date :
                    </label>
                    <InputT
                      className="rounded-3xl border-0 shadow-inner"
                      placeholder="Votre date..."
                      type="date"
                      id="to"
                      name="departDate"
                      width="2/3"
                    />
                  </div>
                  <input
                    className="bg-[#7ec573] hover:bg-[#56b448] w-80 h-12 rounded text-white text-2xl font-bold
                             mt-8 cursor-pointer shadow-md "
                    type="submit"
                    value="Rechercher un trajet"
                  />
                </Form>
              </Formik>
            </div>

            <ul className="w-800 m-auto">{lastTrajetsDisplayer()}</ul>
          </div>
        </div>{' '}
        <div className="order-3 flex items-center h-480 bg-[#c3eded]">
          <div className="flex justify-between items-center  w-4/5 m-auto ">
            <img
              className="m-auto h-72 w-72 min-w-fit  rounded-full"
              src="src/app/assets/img/50point.png"
              alt="50point"
            />

            <div className="text-6xl text-lightBlue font-bold w-3/5 m-autoX">
              <span className="text-6xl font-bold text-[#56b448]">
                GreenRide
              </span>{' '}
              est un site de covoiturage utilisant un système de
              <span className="ml-4 bg-[#56b448] text-white font-bold p-2 text-4xl rounded-tl-3xl rounded-br-3xl">
                Token
              </span>{' '}
            </div>
            <div className="m-auto">
              <button className="buttonEnsavoir text-3xl text-white py-2 px-4 w-52 h-20 rounded-full bg-[#7EC573] hover:bg-[#56b448]">
                En savoir +
              </button>
            </div>
          </div>
        </div>
        <div className="order-4 flex h-800 bg-blueBg font-bold w-full justify-end">
          <div className="flex items-center justify-center text-6xl">
            <h1 className="text-white w-4/5">
              Des trajets partagés pour un monde plus
              <span className="text-[#b2ffa6]"> durable</span>
            </h1>
          </div>

          <div className="image flex items-center">
            <img
              src="src/app/assets/img/section2accueil.png"
              className="max-w-none"
              alt="logo"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UnregisteredHomeView;
