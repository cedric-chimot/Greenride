import { Formik, Field, Form, ErrorMessage } from 'formik';
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import Button from '../components/Button';
import InputT from '../components/InputT';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { URL_BACK } from '../constants/urls/urlBackEnd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomToast from '../components/toast/CustomToast';
import AsyncSelect from 'react-select/async';

const RidePostView = () => {
  document.title = 'Proposer un trajet | Greenride';

  const [inputValueDepart, setValueDepart] = useState('');
  const [userCar, setUserCar] = useState(null);
  const [selectedValueDepart, setSelectedValueDepart] = useState(null);
  const [inputValueDestination, setValueDestination] = useState('');
  const [selectedValueDestination, setSelectedValueDestination] = useState(null);

  let user = useSelector((state) => state.user);
  const navigate = useNavigate();

  /////Modifie le format de la date, remplace les / par des - /////
  let dateHandler = (date) => {
    let newDate = date;
    newDate =
      date.split('-')[2] + '-' + date.split('-')[1] + '-' + date.split('-')[0];
    return newDate;
  };

  const validationSearch = Yup.object().shape({
    departDate: Yup.date().required('Veuillez indiquer une date de départ'),
    departHour: Yup.string()
      .matches(
        /^([0-2][0-9]:[0-5][0-9])$/,
        'Veuillez indiquer une heure de départ correcte'
      )
      .required('Veuillez indiquer une heure de départ'),
    etapes: Yup.string().matches(
      /^[a-zA-Z\-]+$/,
      'Veuillez indiquer une étape correcte'
    ),
    places: Yup.number().default(1).min(1).max(5).required(),
    petitsBagages: Yup.number().default(1).min(1).max(8).required(),
    grandsBagages: Yup.number().default(1).min(1).max(8).required(),
    notes: Yup.string().max(255),
  });

  useEffect(() => {
    async function fetchCar() {
      if (user) {
        await axios
          .get(URL_BACK + '/get/cars_by_user_id/' + user.id)
          .then((resCar) => {
            if (resCar.data.length > 0) {
              console.log(resCar.data)
              setUserCar(resCar.data[0]);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    fetchCar();
  }, [user])


  // handle input change event
  const handleInputChangeDepart = value => {
    setValueDepart(value);
  };

  const handleInputChangeDestination = value => {
    setValueDestination(value);
  };

  // handle selection
  const handleChangeDepart = value => {
    setSelectedValueDepart(value);
  }

  const handleChangeDestination = value => {
    setSelectedValueDestination(value);
  }

  const handleAutocompleteDropdown = (value) => {
    return fetch('https://geo.api.gouv.fr/communes?nom=' + value + '&fields=departement&boost=population&limit=5').then(res => res.json());
  };

  return (
    <div className="grid grid-cols-2 bg-Teal h-[84vh]">
      <div className="h-740 w-740 m-auto bg-Moonstone text-white p-5 rounded-xl text-center flex flex-col">
        <h1 className="mb-4 font-bold  text-center text-4xl ">
          Proposer un trajet
        </h1>
        {userCar != null ? (
          <Formik
            initialValues={{
              departDate: '',
              departHour: '',
              lieuDepart: '',
              destination: '',
              etapes: '',
              places: 1,
              petitsBagages: 0,
              grandsBagages: 0,
              notes: '',
            }}
            validationSchema={validationSearch}
            onSubmit={(values) => {
              if (selectedValueDepart != null && selectedValueDestination != null) {
                let trajet = {
                  depart: selectedValueDepart.nom,
                  destination: selectedValueDestination.nom,
                  etapes: values.etapes,
                  places: Number(values.places),
                  notes: values.notes,
                  departDate: dateHandler(values.departDate),
                  postDate: new Date().toLocaleDateString().replaceAll('/', '-'),
                  departHour: values.departHour,
                  bagagesPetits: Number(values.petitsBagages),
                  bagagesGrands: Number(values.grandsBagages),
                  idAccount: `/api/users/${user.id}`,
                  idCar: '/api/cars/' + userCar.id,
                };
                axios.post(URL_BACK + '/api/trajets', trajet).then((res) => {
                  if (res.status === 201 && res.data) {
                    toast.success(
                      <CustomToast message="Votre trajet a été posté !" />,
                      {
                        position: toast.POSITION.BOTTOM_RIGHT,
                      }
                    );
                    navigate(`/ride/infos/${res.data.id}`);
                  } else {
                    toast.error(
                      <CustomToast message="Votre trajet n'a pas pu être posté, veuillez réessayer." />,
                      {
                        position: toast.POSITION.BOTTOM_RIGHT,
                      }
                    );
                  }
                });
              } else {
                alert("Veuillez sélectionner un départ et une destination.")
              }
            }}
          >
            <Form className="flex flex-col justify-around h-full">
              <div className="grid grid-cols-2 w-full">
                <div>
                  <div className="flex justify-between items-center">
                    <label className="text-xl font-bold w-1/2 text-left">
                      Date de départ :{' '}
                    </label>
                    <InputT
                      width="2/5"
                      name={'departDate'}
                      id={'departDate'}
                      type="date"
                    />
                  </div>
                  <div className="text-red-700 text-left mt-2 text-sm font-extrabold">
                    <ErrorMessage name={'departDate'} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center w-full">
                    <label className="text-xl font-bold w-1/2 text-left pl-4">
                      Heure de départ :{' '}
                    </label>
                    <InputT
                      width="3/8"
                      name={'departHour'}
                      id={'departHour'}
                      type="time"
                    />
                  </div>
                  <div className="text-red-700 text-left pl-4  mt-2 text-sm font-extrabold">
                    <ErrorMessage name={'departHour'} />
                  </div>
                </div>
              </div>

              <div className="flex justify-between w-full">
                <label className="text-xl font-bold text-left items-start">Départ :</label>
                <AsyncSelect
                  className='text-left items-start appearance-none border-2 border-gray-200 rounded-full px-4 text-gray-700 leading-tight h-10 focus:outline-none focus:border-[#7cc474] border-transparent w-4/5 focus:ring-0'
                  getOptionLabel={e => e.nom + ' (' + e.code + ')'}
                  getOptionValue={e => e.nom}
                  loadOptions={handleAutocompleteDropdown}
                  onInputChange={handleInputChangeDepart}
                  onChange={handleChangeDepart}
                  name='lieuDepart'
                  id='lieuDepart'
                  isClearable={true}
                />
              </div>
              <div className="text-red-700  mt-2 text-sm font-extrabold">
                <ErrorMessage name={'lieuDepart'} />
              </div>
              <div className="flex justify-between items-center w-full m-0">
                <label className="text-xl font-bold  text-left">
                  Destination :
                </label>
                <AsyncSelect
                  className='text-left items-start appearance-none border-2 border-gray-200 rounded-full px-4 text-gray-700 leading-tight h-10 focus:outline-none focus:border-[#7cc474] border-transparent w-4/5 focus:ring-0'
                  cacheOptions
                  defaultOptions
                  value={selectedValueDestination}
                  getOptionLabel={e => e.nom + ' (' + e.code + ')'}
                  getOptionValue={e => e.nom}
                  loadOptions={handleAutocompleteDropdown}
                  onInputChange={handleInputChangeDestination}
                  onChange={handleChangeDestination}
                  name='destination'
                  id='destination'
                  isClearable={true}
                />
              </div>
              <div className="text-red-700  mt-2 text-sm font-extrabold">
                <ErrorMessage name={'destination'} />
              </div>
              <div className="flex justify-between items-center w-full m-0">
                <label className="text-xl font-bold  text-left">Etape(s) :</label>
                <InputT type="text" name="etapes" width="3/4" />
              </div>
              <div className="flex items-center w-full" id="places">
                <label className="text-xl font-bold  text-left">
                  Nombre de places :{' '}
                </label>
                <Field
                  className={
                    'text-black ml-12 w-20 rounded-3xl border-0 cursor-pointer'
                  }
                  as="select"
                  name="places"
                  id="places"
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </Field>
              </div>

              <div className="flex items-center w-full ">
                <label className="w-1/4 text-left">Places pour bagages :</label>
                <div className="w-3/4 flex items-center">
                  <div className="flex items-center border-2 pl-4 border-white rounded-3xl">
                    <label className="mr-4">Petits</label>
                    <Field
                      className={
                        'items-center rounded-3xl  border-0 text-black cursor-pointer'
                      }
                      as="select"
                      name="petitsBagages"
                      id="petitsBagages"
                    >
                      <option value={0}>0</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                      <option value={7}>7</option>
                      <option value={8}>8</option>
                    </Field>
                  </div>
                  <div
                    className="flex items-center border-2 pl-4 border-white rounded-3xl ml-6"
                    id="grandBagage"
                  >
                    <label className="mr-4">Grands</label>
                    <Field
                      className={
                        ' items-center border-0 rounded-3xl pl-4 text-black cursor-pointer'
                      }
                      as="select"
                      name="grandsBagages"
                      id="grandsBagages"
                    >
                      <option value={0}>0</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </Field>
                  </div>
                </div>
              </div>

              <label id="notes">Note à destination des utilisateurs</label>
              <Field
                className={
                  'w-full h-24 rounded-md p-2 text-black resize-none border-0'
                }
                as="textarea"
                maxLength={255}
                name={'notes'}
                id={'notes'}
              />
              <Button children={'Proposer trajet'} />
            </Form>
          </Formik>
        ) : (
          <label id="notes">Vous devez avoir un véhicule associé à votre compte pour poster un trajet</label>
        )}
      </div>
      <div className="h-740 w-740 m-auto bg-Moonstone text-white p-5 flex flex-col rounded-xl">
        <img
          className="h-full w-full "
          src="/src/app/assets/img/Rectangle34.png"
          alt="Map"
        />
      </div>
    </div>
  );
};

export default RidePostView;
