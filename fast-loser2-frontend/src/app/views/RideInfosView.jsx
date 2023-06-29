import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { Icon } from 'leaflet';
import MapRouting from '../components/leaflet/MapRouting';
import axios from 'axios';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { useSelector } from 'react-redux';
import { URL_BACK } from '../constants/urls/urlBackEnd';

L.Icon.Default.imagePath = '../../src/app/assets/img/';

const provider = new OpenStreetMapProvider();

const RideInfosView = () => {
  document.title = 'Informations du trajet';
  const { id } = useParams();
  const currentUser = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [latDepart, setlatDepart] = useState(0);
  const [lngDepart, setlngDepart] = useState(0);
  const [latArrivee, setlatArrivee] = useState(0);
  const [lngArrivee, setlngArrivee] = useState(0);

  const [trajet, setTrajet] = useState({});
  const [car, setCar] = useState({});
  const [user, setUser] = useState({});
  const [images, setImages] = useState([]);
  const [comments, setComments] = useState([]);
  const [isReservation, setIsReservation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [distanceTrajet, setDistanceTrajet] = useState(0);

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
    const fetchData = async () => {
      try {
        if (trajet) {
          const resultsDepart = await provider.search({ query: trajet.depart });
          const resultsArrivee = await provider.search({
            query: trajet.destination,
          });
          const resultsCar = await axios.get(URL_BACK + trajet.id_car['@id']);
          const resultsComments = await axios.get(
            URL_BACK + '/get/comments/' + trajet.id
          );
          const resultsUser = await axios.get(
            URL_BACK + trajet.id_account['@id']
          );
          const resultReservation = await axios.get(
            URL_BACK + '/get/reservation/' + trajet.id + '/' + currentUser.id
          );
          if (resultReservation.data) {
            setIsReservation(true);
          } else {
            setIsReservation(false);
          }
          setlatDepart(resultsDepart[0].y);
          setlngDepart(resultsDepart[0].x);
          setlatArrivee(resultsArrivee[0].y);
          setlngArrivee(resultsArrivee[0].x);
          setCar(resultsCar.data);
          setUser(resultsUser.data);
          const photosUrlArray = resultsCar.data.photosUrl.split(',');
          setImages(photosUrlArray);
          setComments(resultsComments.data);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [trajet]);

  useEffect(() => {
    if (!currentUser.id) {
      setIsReservation(false);
    }
  }, [isReservation]);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleReserver = () => {
    if (currentUser.id) {
      const reservation = {
        userId: currentUser.id,
        trajetId: Number(id),
        isValidate: false,
      };
      axios.post(URL_BACK + '/post/reservation', reservation).then((res) => {
        if (res.status == 201) {
          setIsReservation(true);
          setShowModal(false);
          const newTokens = currentUser.tokens - distanceTrajet;
          let newData = {
            tokens: newTokens,
          };
          axios.put(URL_BACK + '/api/users/' + currentUser.id, newData);
          const dataMercure = {
            topic: 'https://localhost/notification/' + user.id,
            data: {
              "type": "request-reservation",
              "content": "Vous avez une demande de réservation en attente",
              "date": new Date().toLocaleDateString().replaceAll('/', '-'),
              "lu": false,
              "userId": user.id,
              "trajetId": trajet.id
            }
          }
          axios.post(URL_BACK + '/mercure/post/notification', dataMercure)
            .then(response => console.log(response));
        }
      });
    } else {
      alert('Veuillez vous connecter pour réserver ce trajet');
    }
  };

  const handleCancelReserver = () => {
    if (currentUser.id) {
      axios
        .delete(URL_BACK + '/delete/reservation/' + id + '/' + currentUser.id)
        .then((res) => {
          if (res.status == 201) {
            setIsReservation(false);
            setShowModal(false);
            const newTokens = currentUser.tokens + distanceTrajet;
            let newData = {
              tokens: newTokens,
            };
            axios.put(URL_BACK + '/api/users/' + currentUser.id, newData);
          }
        });
    } else {
      setIsReservation(false);
      alert('Veuillez vous connecter');
    }
  };

  const handleDistance = (value) => {
    setDistanceTrajet(Math.floor(value.routes[0].summary.totalDistance / 1000));
  };

  return (
    <div>
      {trajet != 0 && car != 0 && images != 0 && user != 0 ? (
        <div className="bg-Teal">
          <div className="pl-6 h-12 w-full flex-auto pt-6 mb-6">
            <h4 className="text-Whitesmoke pt-2 h-auto flex items-center text-left">
              <img
                className="h-16 w-16 rounded-full object-cover mr-5"
                src={user.img_profil}
                alt="id"
              />
              <b>
              <NavLink to={`/profils/${user.id}`}><span className='underline'>{user.prenom} {user.nom}</span></NavLink> propose le trajet de {trajet.depart}{' '}
                jusqu'à {trajet.destination}
              </b>
              {/*<button
                className="bg-[#d63939] hover:bg-[#960000] text-white font-extrabold py-4 px-32 cursor-pointer rounded ml-auto mr-6"
                onClick={() => navigate(`/make/alert/${id}`)}
              >
                Signaler
              </button>*/}
              {trajet.places > 0 ? (
                isReservation ? (
                  <button
                    className="bg-[#d63939] hover:bg-[#960000] text-white font-extrabold py-4 px-32 cursor-pointer rounded ml-auto mr-6"
                    onClick={handleShowModal}
                  >
                    Annuler la réservation
                  </button>
                ) : (
                  <button
                    className="bg-[#7cc474] hover:bg-[#54b44b] text-white font-extrabold py-4 px-32 cursor-pointer rounded ml-auto mr-6"
                    onClick={handleShowModal}
                  >
                    Réserver ce trajet
                  </button>
                )
              ) : (
                <span className="bg-[#969696] text-white font-extrabold py-4 px-32 rounded ml-auto mr-6">
                  Trajet complet
                </span>
              )}
            </h4>

            <div
              className={`flex justify-center items-center overflow-x-hidden overflow-y-auto fixed backdrop-opacity-20 backdrop-invert bg-white/30 inset-0 z-50 outline-none focus:outline-none${showModal ? '' : ' hidden'}`}
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-solid border-4 border-Teal rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t bg-lightBlue">
                    <h3 className="text-3xl font=semibold">Réservation</h3>
                  </div>
                  <div className="relative p-6 flex-auto">
                    <div className="bg-lightBlue shadow-md rounded px-8 pt-6 pb-8 w-full">
                      <p className="block text-black text-sm font-bold mb-1">
                        {isReservation
                          ? 'Jetons récupérés: '
                          : 'Coût en jeton: '}
                        <b>{distanceTrajet}</b>
                      </p>
                      {!isReservation ? (
                        currentUser.tokens > distanceTrajet ? (
                          <p className="block text-black text-sm font-bold mb-1">
                            Vous receverez une notification pour vous confirmer
                            ou non votre demande de réservation.
                          </p>
                        ) : (
                          <p className="block text-black text-sm font-bold mb-1">
                            Vous n'avez pas assez de jetons pour réserver ce
                            trajet, veuillez en ajouter.
                          </p>
                        )
                      ) : (
                        <p className="block text-black text-sm font-bold mb-1">
                          Êtes vous sur de vouloir annuler votre demande de
                          réservation ?
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b bg-lightBlue">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Annuler
                    </button>
                    {!isReservation ? (
                      currentUser.tokens > distanceTrajet ? (
                        <button
                          className="text-white bg-Mantis active:bg-Mantis font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                          onClick={handleReserver}
                        >
                          Confirmer
                        </button>
                      ) : (
                        <button
                          className="text-white bg-Mantis active:bg-Mantis font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                          onClick={() => navigate('/')}
                        >
                          Acheter
                        </button>
                      )
                    ) : (
                      <button
                        className="text-white bg-Mantis active:bg-Mantis font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        onClick={handleCancelReserver}
                      >
                        Confirmer
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={'h-[90vh] bg-Teal flex pt-6'}>
            <div className="m-4 w-1/2 rounded-lg bg-Keppel p-6 shadow-lg shadow-teal-900 block z-10">
              {latDepart != 0 &&
              lngDepart != 0 &&
              latArrivee != 0 &&
              lngArrivee != 0 ? (
                <MapContainer
                  center={[latDepart, lngDepart]}
                  zoom={5}
                  whenReady={() =>
                    setDistanceTrajet(
                      parseInt(document.getElementById('displayDistance'))
                    )
                  }
                >
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <MapRouting
                    latDepart={latDepart}
                    lngDepart={lngDepart}
                    latArrivee={latArrivee}
                    lngArrivee={lngArrivee}
                    onDistance={handleDistance}
                  />
                </MapContainer>
              ) : (
                <h3 className="mb-6 mt-0.5 text-center w-full text-Whitesmoke">
                  Chargement...
                </h3>
              )}
            </div>

            <div className="m-4 w-1/2 rounded-lg bg-Keppel p-6 shadow-lg shadow-teal-900 flex-auto flex flex-wrap text-Whitesmoke">
              <h2 className="mb-6 mt-0.5 text-center w-full">Informations</h2>
              <p className="w-full text-2xl ml-8">
                <b>Date de départ: </b>
                {trajet.depart_date.includes('-')
                  ? trajet.depart_date.replaceAll('-', '/')
                  : trajet.depart_date}
              </p>
              <p className="w-full text-2xl ml-8">
                <b>Heure de Départ: </b>
                {trajet.depart_hour}
              </p>
              <p className="w-full text-2xl ml-8">
                <b>Nombre de place disponible: </b>
                {trajet.places}
              </p>
              <p className="w-full text-2xl ml-8">
                <b>Nombre de petit bagages par personne: </b>
                {trajet.bagages_petits}
              </p>
              <p className="w-full text-2xl ml-8">
                <b>Nombre de gros bagages par personne: </b>
                {trajet.bagages_grands}
              </p>
              <p className="w-full text-2xl ml-8">
                <b>Le conducteur souhaite le silence: </b>
                {user.silence ? 'oui' : 'non'}
              </p>
              <p className="w-full text-2xl ml-8">
                <b>Type de Musique: </b>{user.id_music.value}
              </p>
              <p className="w-full text-2xl ml-8">
                <b>Marque de Voiture: </b>
                {car.brand}&nbsp;{car.model}
              </p>
              <p className="w-full text-2xl ml-8">
                <b>Photos du véhicule: </b>
              </p>
              <div className="w-full flex flex-row overflow-x-scroll whitespace-nowrap scrollbar scrollbar-thumb-Mantis scrollbar-track-white scrollbar-rounded-full scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
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
          <div className="h-12 w-full flex-auto pt-6 mb-6">
            <h3 className="text-Whitesmoke p-2 h-auto text-center font-extrabold">
              Avis
            </h3>
          </div>
          <div
            className={
              'h-auto w-1/2 bg-Teal py-6 pl-20 text-Whitesmoke flex-wrap'
            }
          >
            {comments != 0 ? (
              comments.map((comment) => (
                <div className="w-full flex mb-12" key={comment.id}>
                  <img
                    className="object-cover rounded-full mr-5 w-16 h-16 order-1"
                    src={
                      comment.isAnonymized
                        ? '/src/app/assets/img/avatar.png'
                        : comment.id_user.img_profil
                    }
                    alt="id"
                  />
                  <div className="order-2 flex flex-wrap h-[150px]">
                    <span className="order-1 w-full lg:font-extrabold lg:text-3xl">
                      {comment.isAnonymized
                        ? 'Utilisateur anonyme'
                        : `${comment.id_user.prenom} ${comment.id_user.nom}`}
                    </span>
                    {(() => {
                      const arrUp = [];
                      for (let i = 0; i < comment.rate; i++) {
                        arrUp.push(
                          <img
                            src="/src/app/assets/img/mdi_leaf-circle.png"
                            className="w-[30px] h-[30px] order-2"
                          />
                        );
                      }
                      return arrUp;
                    })()}

                    {(() => {
                      const arrDown = [];
                      if (5 - comment.rate > 0) {
                        for (let i = 0; i < 5 - comment.rate; i++) {
                          arrDown.push(
                            <img
                              src="/src/app/assets/img/mdi_leaf-circle_white.png"
                              className="w-[30px] h-[30px] order-2"
                            />
                          );
                        }
                        return arrDown;
                      }
                    })()}
                    <span className="pt-2 flex text-left w-full order-3 h-[150px] lg:text-xl">
                      {comment.content}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className={'h-[90vh] bg-Teal flex pt-6'}>
                <h3 className="mb-6 mt-0.5 text-center w-full text-Whitesmoke">
                  Il n'y a aucun avis sur ce trajet
                </h3>
              </div>
            )}
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
  );
};

export default RideInfosView;
