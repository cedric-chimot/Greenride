import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faVolumeControlPhone,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { URL_BACK } from '../constants/urls/urlBackEnd';
import { Field, Form, Formik } from 'formik';
import Button from '../components/FormComponents/Button';
import Input from '../components/FormComponents/Input';

const Dashboard = () => {
  document.title = 'Profil utilisateur';
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user);
  const [userTrajets, setUserTrajets] = useState([]);
  const [images, setImages] = useState([]);
  const [car, setCar] = useState({});
  const [moyenneRating, setMoyenneRating] = useState(0);

  useEffect(() => {
    const fetchTrajets = async () => {
      try {
        if (currentUser.id) {
          let somme = 0;
          let count = 0;
          const resultsTrajets = await axios.get(
            URL_BACK + '/get/trajets/' + currentUser.id
          );
          const resultCar = await axios.get(
            URL_BACK + '/get/cars/' + currentUser.id
          );
          setUserTrajets(resultsTrajets.data);
          setCar(resultCar.data);
          const photosUrlArray = resultCar.data.photosUrl.split(',');
          setImages(photosUrlArray);
          const resultsComments = await axios.get(
            URL_BACK + '/get/comments/' + currentUser.id
          );
          if (resultsComments.data.length > 0) {
            resultsComments.data.forEach((element) => {
              somme = somme + element.rate;
              count++;
            });
            let moyenne = somme / count;
            let decimal = moyenne % 1;

            if (decimal < 0.5) {
              moyenne = moyenne - decimal;
            } else if (decimal >= 0.5) {
              moyenne = moyenne + (1 - decimal);
            } else {
              console.log('error');
            }
            setMoyenneRating(moyenne);
          }
        } else {
          // navigate("/Login")
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchTrajets();
  }, [currentUser]);

  const handleLogin = (values) => {
    console.log(values);
  };
  return (
    <div className="containerCard flex flex-col h-[84vh] bg-Teal items-center ">
      <div className="titleDashboard text-white text-3xl p-6">
        <h1>Mon profil</h1>
      </div>
      <div className="w-9/12 cardInfos flex box-border border-8 bg-Moonstone text-center items-center rounded-lg">
        <div className="flex flex-col ml-20">
          <img
            className="img_profil h-50 w-60 rounded-full object-cover"
            src={
              currentUser.imgProfil
                ? currentUser.imgProfil
                : '/src/app/assets/img/avatar.png'
            }
            alt=""
          />
          <div className="mt-10">
            <NavLink to="/modifier-profil">
              <button className="w-full bg-[#7cc474] hover:bg-[#54b44b] text-white font-bold py-4 rounded cursor-pointer">
                Modifier le profil
              </button>
            </NavLink>
          </div>
          <div className="mt-10">
            <NavLink to="/sellTokens">
              <button className="bg-[#7cc474] hover:bg-[#54b44b] text-white font-bold py-4 px-4 rounded cursor-pointer">
                Vente de tokens
              </button>
            </NavLink>
          </div>
        </div>

        <div className="renseig bg-Teal flex justify-center items-center w-6/12 h-5/6 pt-5 pb-5 mt-20 ml-20 rounded-xl mb-20 px-4">
          <div className="w-full">
            <p className="name text-white text-2xl mp-8 pb-10 font-semibold">
              {currentUser.prenom} {currentUser.nom}
              <br />
            </p>
            <p className=" text-white mb-8 text-2xl font-semibold">
              Token : {currentUser.tokens}
            </p>
            <p className=" text-white mb-8 text-2xl font-semibold">
              Véhicule :
            </p>
            {car != null ? (
              <div className="w-full">
                <p className=" text-white mb-8 text-2xl font-semibold">
                  {car.brand} {car.model}
                </p>
                <div className="mb-8 w-full flex flex-row overflow-x-scroll whitespace-nowrap scrollbar-thumb-Teal scrollbar-track-[#04adbf] scrollbar-thin">
                  {images.map((img) => (
                    <div className="imgContainer ml-5">
                      <img
                        className="photo w-24 max-h-[60px] object-contain inline-block"
                        src={img}
                      />
                    </div>
                  ))}
                </div>
                <div className="mb-8">
                  <NavLink to="/addCar">
                    <button className="w-8/12 acheter text-white my-auto mx-0 bg-[#7cc474] hover:bg-[#54b44b] font-extrabold py-4 cursor-pointer rounded">
                      Modifier le véhicule
                    </button>
                  </NavLink>
                </div>
              </div>
            ) : (
              <div className="mb-8">
                <NavLink to="/addCar">
                  <button className="acheter text-white my-auto mx-0 bg-[#7cc474] hover:bg-[#54b44b] font-extrabold py-4 px-20 cursor-pointer rounded">
                    Ajouter un véhicule
                  </button>
                </NavLink>
              </div>
            )}
          </div>
        </div>
        <div className="containerCardInfo flex justify-center items-center px-12 bg-Teal w-6/12 h-5/6 mr-20 mt-20 ml-20 rounded-xl mb-20">
          <div className="histor">
            {userTrajets != 0 ? (
              <div className={'histor text-center'}>
                <h3 className="text-white text-4xl font-semibold mb-8">
                  Historique des trajets
                </h3>
                {userTrajets.slice(0, 3).map((trajet) => (
                  <p className="text-white text-lg mb-8">
                    Le {trajet.depart_date.replaceAll('-', '/')} -{' '}
                    {trajet.depart}
                    <FontAwesomeIcon
                      className="FontAwesomeIcon1 ml-4 mr-4"
                      icon={faArrowRight}
                    />
                    {trajet.destination}
                  </p>
                ))}
              </div>
            ) : (
              <div className={'histor text-center mt-10'}>
                <h3 className="text-white text-4xl font-semibold mb-8">
                  Historique des trajets
                </h3>
                <p className="text-white mb-8">Aucun trajet</p>
              </div>
            )}
            <div className="mt-10 ">
              <NavLink to="/historique">
                <button className="acheter items-center text-white drop-shadow-2xl my-auto mx-0 bg-[#7cc474] hover:bg-[#54b44b] font-extrabold py-4 px-28 cursor-pointer rounded">
                  En voir plus
                </button>
              </NavLink>
            </div>
            <div>
              <p className="text-center text-white mt-12 mb-8 text-2xl font-semibold">
                Evaluations :
              </p>
              <div className="flex mx-auto px-12 justify-center">
                {(() => {
                  const arrUp = [];
                  for (let i = 0; i < Math.floor(moyenneRating); i++) {
                    arrUp.push(
                      <img
                        src="/src/app/assets/img/mdi_leaf-circle.png"
                        className="w-[30px] h-[30px]"
                      />
                    );
                  }
                  return arrUp;
                })()}

                {(() => {
                  const arrDown = [];
                  if (5 - Math.floor(moyenneRating) > 0) {
                    for (let i = 0; i < 5 - Math.floor(moyenneRating); i++) {
                      arrDown.push(
                        <img
                          src="/src/app/assets/img/mdi_leaf-circle_white.png"
                          className="w-[30px] h-[30px]"
                        />
                      );
                    }
                    return arrDown;
                  }
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
