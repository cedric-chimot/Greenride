import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { Icon } from 'leaflet';
import MapRouting from '../components/leaflet/MapRouting';
import axios from 'axios';
import { URL_BACK } from '../constants/urls/urlBackEnd';
import Button from '../components/FormComponents/Button';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
L.Icon.Default.imagePath = '../../src/app/assets/img/';
import gRate from '../assets/img/mdi_leaf-circle_white.png';
import bRate from '../assets/img/mdi_leaf-circle.png';
import ConfirmPopUp from '../components/Popups/ConfirmPopUp';

const provider = new OpenStreetMapProvider();

const AdminRide = () => {
  const { id } = useParams();

  const [trajet, setTrajet] = useState({});
  const [car, setCar] = useState({});
  const [user, setUser] = useState({});
  const [images, setImages] = useState([]);
  const [comments, setComments] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [popUpActive, setPopUpActive] = useState(false);
  console.log(id);

  useEffect(() => {
    async function fetchTrajet() {
      await axios
        .get(URL_BACK + '/api/trajets/' + id)
        .then((resTrajet) => {
          setTrajet(resTrajet.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchTrajet();
  }, []);

  useEffect(() => {
    if (trajet['id_account']) {
      axios
        .get(URL_BACK + `/get/comments_by_user_id/${trajet['id_account'].id}`)
        .then((res) => {
          setComments(res.data);
          console.log(trajet);
          const photosUrlArray = trajet['id_car'].photos_url.split(',');
          setImages(photosUrlArray);
        });
    }

    const fetchData = async () => {
      try {
        if (trajet) {
          const resultsCar = await axios.get(URL_BACK + trajet.id_car['@id']);
          setCar(resultsCar.data);
          const photosUrlArray = resultsCar.data.photosUrl.split(',');
          setImages(photosUrlArray);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [trajet]);

  let ratingDisplayer = (rate) => {
    let ratingArray = [
      { img: 0 },
      { img: 0 },
      { img: 0 },
      { img: 0 },
      { img: 0 },
    ];
    for (let i = 0; i < rate; i++) {
      ratingArray[i].img = 1;
    }
    return ratingArray.map((rate) => {
      if (rate.img === 0) {
        return <img className="w-8 h-8" src={gRate}></img>;
      } else return <img className="w-8 h-8" src={bRate}></img>;
    });
  };

  let commentsDisplayer = () => {
    if (comments.length > 0) {
      return comments.map((comment, index) => (
        <div key={index} className="w-full p-2  mb-2 border-b-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                className="imgProfil h-20 mr-4 my-4 w-20 rounded-full object-cover mx-auto"
                src={
                  comment['rating_user_id'] &&
                  comment['rating_user_id'].img_profil
                    ? comment['rating_user_id'].img_profil
                    : '/src/app/assets/img/avatar.png'
                }
                alt=""
              />
              <span className="w-full lg:font-extrabold lg:text-2xl">
                {comment.isAnonymized
                  ? 'User anonyme'
                  : comment.rating_user_id.prenom +
                    ' ' +
                    comment.rating_user_id.nom}
              </span>
            </div>
            <div className="flex">{ratingDisplayer(Number(comment.rate))}</div>
          </div>
          <div className="mt-4 p-2 ">
            <p>{comment.content}</p>
          </div>
        </div>
      ));
    } else
      return (
        <p className="text-2xl font-bold text-center my-auto">
          Cet utilisateur n'a reçu aucune évaluation pour le moment.
        </p>
      );
  };

  return (
    <div>
      {popUpActive ? (
        <ConfirmPopUp data={trajet} active={setPopUpActive} />
      ) : null}
      <div
        className={
          popUpActive
            ? 'h-[90vh] bg-[#04ACBE] text-white  z-0 bg-white-500 opacity-50'
            : 'h-[90vh] bg-[#04ACBE] text-white   '
        }
      >
        {trajet != 0 && user != 0 ? (
          <div className="bg-Moonstone h-[90vh] p-8">
            <div className="flex items-center w-fit mx-auto">
              <img
                className="imgProfil h-24 my-4 mr-4 w-24 rounded-full object-cover mx-auto"
                src={
                  trajet['id_account'] && trajet['id_account'].img_profil
                    ? trajet['id_account'].img_profil
                    : '/src/app/assets/img/avatar.png'
                }
                alt=""
              />
              <h4 className="text-Whitesmoke flex items-center text-left">
                <b>
                  {trajet['id_account']
                    ? trajet['id_account'].prenom +
                      ' ' +
                      trajet['id_account'].nom +
                      ' propose ce trajet de ' +
                      trajet.depart +
                      " jusqu'à " +
                      trajet.destination
                    : null}
                </b>
              </h4>
              <button
                className="border-2 bg-red-800  py-1 px-3 rounded text-white bg-[#7FC473] hover:bg-red-800 cursor-pointer ml-36"
                onClick={() => setPopUpActive(true)}
              >
                Supprimer
              </button>
            </div>
            <div className={'flex justify-around pt-6'}>
              <div className="m-4 w-600 h-600 rounded-lg bg-Teal p-6 shadow-lg shadow-teal-900 block text-white">
                <h4 className="text-center mb-8">Avis sur ce conducteur</h4>
                {commentsDisplayer()}
              </div>

              <div className="m-4 w-600 h-600 rounded-lg bg-Teal p-6 shadow-lg shadow-teal-900  flex flex-wrap text-Whitesmoke">
                <h4 className="mb-6 mt-0.5 text-center w-full">Informations</h4>
                <p className="w-full text-xl ">
                  <b>Date de départ : </b>
                  {trajet.depart_date}
                </p>
                <p className="w-full text-xl ">
                  <b>Heure de Départ : </b>
                  {trajet.depart_hour}
                </p>
                <p className="w-full text-xl ">
                  <b>Nombre de place disponible : </b>
                  {trajet.places}
                </p>
                <p className="w-full text-xl ">
                  <b>Nombre de petit bagages par personne : </b>
                  {trajet.bagages_petits}
                </p>
                <p className="w-full text-xl ">
                  <b>Nombre de gros bagages par personne : </b>
                  {trajet.bagages_grands}
                </p>
                <p className="w-full text-xl ">
                  <b>Le conducteur souhaite le silence : </b>
                  {trajet.id_account ? ( trajet.id_account.silence === "true" ? 'oui' : 'non' ) : ''}
                </p>
                <p className="w-full text-xl ">
                  <b>Type de Musique : </b>{trajet.id_account ? trajet.id_account.id_music.value : ''}
                </p>
                <p className="w-full text-xl ">
                  <b>Marque de Voiture : </b>
                  {trajet['id_car']
                    ? trajet['id_car'].brand + ' ' + trajet['id_car'].model
                    : null}
                </p>
                <p className="w-full text-xl ">
                  <b>Photos du véhicule : </b>
                </p>
                <div className="w-full flex flex-row overflow-x-scroll whitespace-nowrap scrollbar-thumb-Mantis scrollbar-track-white scrollbar-rounded-full scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                  {images.map((img) => (
                    <div className="imgContainer ml-5">
                      <img
                        className="photo w-44 max-w-none max-h-[100px] object-contain inline-block"
                        src={img}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={'h-[90vh] bg-Teal flex pt-6'}>
            <h3 className="mb-6 mt-0.5 text-center w-full text-Whitesmoke">
              Chargement...
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminRide;
