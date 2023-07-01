import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { URL_BACK } from '../constants/urls/urlBackEnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Field, Form, Formik } from 'formik';
import Chat from '../components/chat/Chat';

/**
 * View/Page VoirProfil
 *
 * @author Océane Gontier
 */
const VoirprofilView = () => {
  const currentUser = useSelector((state) => state.user);
  const { id } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState({});
  const [userTrajets, setUserTrajets] = useState([]);
  const [car, setUserCars] = useState({});
  const [moyenneRating, setMoyenneRating] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [chatActive, setChatActive] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      await axios
        .get(URL_BACK + '/api/users/' + id)
        .then((resUsers) => {
          setUsers(resUsers.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchTrajets = async () => {
      try {
        if (users.id) {
          let somme = 0;
          let count = 0;
          const resultsTrajets = await axios.get(
            URL_BACK + '/get/trajets/' + users.id
          );
          setUserTrajets(resultsTrajets.data);
          document.title = 'Profil de ' + users.nom + ' ' + users.prenom;
          const resultsComments = await axios.get(
            URL_BACK + '/get/comments/' + users.id
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
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchTrajets();
  }, [users]);

  let calculateAge = (date) => {
    var formattedDate = date.split('-');
    var birthdateTimeStamp = new Date(
      formattedDate[2],
      formattedDate[1],
      formattedDate[0]
    );
    var currentDate = new Date().getTime();
    var difference = currentDate - birthdateTimeStamp;
    var currentAge = Math.floor(difference / 31557600000);
    return currentAge;
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        if (users.id) {
          const UserCars = await axios.get(URL_BACK + '/get/cars/' + users.id);
          setUserCars(UserCars.data);
          console.log(UserCars.data);
          const photosUrlArray = UserCars.data.photosUrl.split(',');
          setImages(photosUrlArray);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchCars();
  }, [users]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (userTrajets != 0) {
          let somme = 0;
          let count = 0;
          const resultsComments = await axios.post(
            URL_BACK + '/post/comments_by_trajets_id',
            userTrajets
          );
          if (resultsComments.data.length > 0) {
            resultsComments.data.forEach((element) => {
              somme = somme + element.rating;
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
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchComments();
  }, [userTrajets]);

  return (
    <>
      <div className="flex justify-center items-center h-[84vh] bg-Teal relative">
        {chatActive ? <Chat active={true} userToTalk={users} /> : null}
        <div
          className={`flex justify-center items-center overflow-x-hidden overflow-y-auto fixed backdrop-opacity-20 backdrop-invert bg-white/30 inset-0 z-50 outline-none focus:outline-none${
            showModal ? '' : ' hidden'
          }`}
        >
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-solid border-4 border-Teal rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t bg-Teal">
                <h3 className="text-3xl font=semibold text-Whitesmoke">
                  Avis sur{' '}
                  {users.nom && users.prenom
                    ? users.nom + ' ' + users.prenom
                    : ''}
                </h3>
              </div>
              <div className="relative p-6 flex-auto">
                <div className="bg-Teal shadow-md rounded px-8 pt-6 pb-8 w-full">
                  <Formik
                    initialValues={{
                      rating: '1',
                      content: '',
                    }}
                    onSubmit={(values) => {
                      let comment = {
                        rate: Number(values.rating),
                        content: values.content,
                        ratingUserId: '/api/users/' + currentUser.id,
                        ratedUserId: '/api/users/' + id,
                      };
                      axios
                        .post(URL_BACK + '/api/comments', comment)
                        .then((res) => {
                          console.log(res);
                          if (res.status === 201 && res.data) {
                            setShowModal(false);
                          }
                        });
                    }}
                  >
                    <Form className="mt-12 w-full max-w-full">
                      <div className="flex flex-col">
                        <div className="md:w-1/3">
                          <label
                            className="block text-[#FFFFFF] font-bold md:text-left mb-1 md:mb-0 pr-4"
                            htmlFor="passager"
                          >
                            Note :
                          </label>
                        </div>
                        <div className="w-2/12 mb-10">
                          <Field
                            as="select"
                            id="rating"
                            name="rating"
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-full w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#7cc474] border-transparent focus:ring-0"
                          >
                            <option key="1" value="1">
                              1
                            </option>
                            <option key="2" value="2">
                              2
                            </option>
                            <option key="3" value="3">
                              3
                            </option>
                            <option key="4" value="4">
                              4
                            </option>
                            <option key="5" value="5">
                              5
                            </option>
                          </Field>
                        </div>
                        <div className="span">
                          <span className="block text-[#FFFFFF] font-bold text-left mb-1 md:mb-0 pr-4">
                            Commentaire (350 caractères max) :
                          </span>
                        </div>
                        <div className="textarea">
                          <Field
                            as="textarea"
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-3xl w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#7cc474] border-transparent focus:ring-0"
                            id="content"
                            name="content"
                            rows="4"
                            cols="80"
                            maxLength="350"
                          ></Field>
                        </div>
                      </div>
                      <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b bg-Teal">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Annuler
                        </button>
                        <button
                          className="text-white bg-Mantis active:bg-Mantis font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                          type="submit"
                        >
                          Valider
                        </button>
                      </div>
                    </Form>
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" bg-Moonstone h-5/6 w-11/12 rounded-lg mx-auto my-auto flex align-center">
          <div className="flex h-4/6 w-11/12 rounded-lg mx-auto my-auto items-center align-center">
            <div className="flex justify-center ">
              <img
                className="imgProfil h-60 w-60 rounded-full object-cover "
                src={users.img_profil}
                alt="50point"
              />
            </div>
            <div className="flex w-9/12 ml-16">
              <div className="bg-Teal justify-center mr-20 w-1/2 py-8">
                <div className="flex justify-center mt-8 mb-20">
                  <h1 className="text-Whitesmoke font-extrabold text-[30px]">
                    {users.nom} {users.prenom}
                  </h1>
                </div>
                <div className="flex justify-center mt-8">
                  <h1 className="text-paragraphe text-Whitesmoke ml-10">
                    {users.date_naissance
                      ? calculateAge(users.date_naissance) + ' ' + 'ans'
                      : null}{' '}
                  </h1>
                  <h1 className="text-paragraphe text-Whitesmoke ml-auto mr-10">
                    {users.ville}
                  </h1>
                </div>

                <div className="flex bg-white rounded mx-auto justify-center items-center p-3 h-24 w-11/12 mt-10">
                  <div className="flex items-center">
                    <h1 className="flex text-paragraphe ml-3">
                      {users.description}{' '}
                    </h1>
                  </div>
                </div>
                <div className="flex mt-8 ml-10">
                  <h1 className="text-paragraphe text-Whitesmoke">
                    Voiture : {car.brand} {car.model}
                  </h1>
                </div>
                <div className="flex justify-center mt-8 mx-3">
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
              <div className="bg-Teal w-1/2 py-8">
                <div className="flex justify-end bg-[#7cc474]  w-11/12 h-10 items-center mt-2 mx-auto">
                  <h1 className="flex text-[30px] mx-auto text-white">
                    Historique des trajets
                  </h1>
                </div>
                <div className="flex justify-center w-full mt-8">
                  {userTrajets != 0 ? (
                    <div>
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
                    <div className={'histor text-justify mt-10 ml-14'}>
                      <p className="text-white mb-8">Aucun trajet</p>
                    </div>
                  )}
                </div>
                <div className="flex justify-end bg-[#7cc474]  w-11/12 h-10 items-center mt-2 mx-auto">
                  <h1 className="flex text-[30px] mx-auto text-white ">
                    Avis des utilisateurs
                  </h1>
                </div>
                <div className="flex my-6">
                  <div className="flex mx-auto my-auto px-12 justify-center items-center ">
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
                        for (
                          let i = 0;
                          i < 5 - Math.floor(moyenneRating);
                          i++
                        ) {
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
                <div className="flex my-auto justify-center items-center h-20 mx-10">
                  <div className=" flex justify-center items-center">
                    <button
                      className="items-center text-white drop-shadow-2xl my-auto mx-0 bg-[#7cc474] hover:bg-[#54b44b] font-extrabold py-4 px-10 cursor-pointer rounded"
                      onClick={() => setShowModal(true)}
                    >
                      Laisser un avis
                    </button>
                  </div>
                  <div className="flex justify-center items-center ml-auto">
                    <button
                      onClick={() => setChatActive(true)}
                      className="items-center text-white drop-shadow-2xl my-auto mx-0 bg-[#7cc474] hover:bg-[#54b44b] font-extrabold py-4 px-10 cursor-pointer rounded"
                    >
                      Envoyer un message
                    </button>
                  </div>
                </div>
                <div className="flex my-auto justify-center items-center h-20 mx-10">
                  <div className=" flex justify-center items-center">
                    <button
                      className="bg-[#d63939] hover:bg-[#960000] text-white font-extrabold py-4 px-32 cursor-pointer rounded ml-auto mr-6"
                      onClick={() => navigate(`/make/alert/${id}`)}
                    >
                      Signaler
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VoirprofilView;
