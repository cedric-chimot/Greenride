import axios from 'axios';
import { Formik, Form, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '../components/Button';
import InputT from '../components/InputT';
import Card from '../components/Card';
import { URL_BACK } from '../constants/urls/urlBackEnd';
import AsyncSelect from 'react-select/async';

const RideSearchView = () => {
  document.title = 'Rechercher un trajet | Greenride';

  const [trajets, setTrajets] = useState([]);
  const [inputValueDepart, setValueDepart] = useState('');
  const [selectedValueDepart, setSelectedValueDepart] = useState(null);
  const [inputValueDestination, setValueDestination] = useState('');
  const [selectedValueDestination, setSelectedValueDestination] = useState(null);

  const navigate = useNavigate();

  ////Fetch tous les trajets puis inverse la liste pour avoir les plus récents en premier////
  useEffect(() => {
    axios
      .get(URL_BACK + '/api/trajets')
      .then((res) => setTrajets(res.data['hydra:member'].reverse()));
  }, []);

  /////Modifie le format de la date, remplace les / par des - /////
  let dateHandler = (date) => {
    let newDate = date;
    newDate =
      date.split('-')[2] + '-' + date.split('-')[1] + '-' + date.split('-')[0];
    return newDate;
  };

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

  ////////SCHEMA DE VALIDATION/////////////////
  const validationSearch = Yup.object().shape({
    departDate: Yup.date().required('Veuillez indiquer une date de départ'),
  });

  let ridesDisplayer = () => {
    return trajets
      .slice(0, 5)
      .map((ride) => (
        <Card
          depart={ride.depart}
          destination={ride.destination}
          departHour={ride.departHour}
          id_account={ride.id_account.id}
          date={ride.depart_date}
          id_ride={ride.id}
          small={true}
        />
      ));
  };
  return (
    <div className="flex justify-center items-center bg-Teal h-[84vh]">
      <div className="grid grid-cols-2 bg-blueBg w-full">
        <div className="h-[450px] w-740 m-auto bg-Moonstone text-white p-8 flex flex-col rounded-xl ">
          <h1 className="mb-4 font-bold  text-center text-4xl">
            Rechercher un trajet
          </h1>
          <Formik
            initialValues={{
              departDate: '',
              lieuDepart: '',
              destination: '',
            }}
            validationSchema={validationSearch}
            onSubmit={(values) => {
              if(selectedValueDepart != null && selectedValueDestination != null){
                navigate(
                `/search/results/${selectedValueDepart.nom}/${selectedValueDestination.nom
                }/${dateHandler(values.departDate)}`
              );
              }else{
                alert("Veuillez sélectionner un départ et une destination.")
              }
              
            }}
          >
            <Form className="flex flex-col justify-around h-full ">
              <div>
                <div className="flex justify-between items-center my-2 w-full ">
                  <label className="text-xl font-bold">Départ : </label>
                  <AsyncSelect
                    className='appearance-none border-2 border-gray-200 rounded-full px-4 text-gray-700 leading-tight h-10 focus:outline-none focus:border-[#7cc474] border-transparent w-4/5 focus:ring-0'
                    getOptionLabel={e => e.nom + ' (' + e.code + ')'}
                    getOptionValue={e => e.nom}
                    loadOptions={handleAutocompleteDropdown}
                    onInputChange={handleInputChangeDepart}
                    onChange={handleChangeDepart}
                    name='lieuDepart'
                    id='lieuDepart'
                    isClearable={true}
                    placeholder="Sélectionner un lieu de départ"
                  />
                </div>
                <div className="text-red-700 text-center mt-4 text-sm font-extrabold flex-row">
                  <ErrorMessage name={'lieuDepart'} />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center my-2 w-full ">
                  <label className="text-xl font-bold">Destination : </label>
                  <AsyncSelect
                    className='appearance-none border-2 border-gray-200 rounded-full px-4 text-gray-700 leading-tight h-10 focus:outline-none focus:border-[#7cc474] border-transparent w-4/5 focus:ring-0'
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
                    placeholder="Sélectionner un lieu d'arrivée"
                  />
                </div>
                <div className="text-red-700  mt-4 text-center text-sm font-extrabold flex-row">
                  <ErrorMessage name={'destination'} />
                </div>
              </div>

              <div className="grid grid-cols-2 w-full " id="date-hour">
                <div>
                  <div className="flex justify-between items-center">
                    <label className="text-xl font-bold w-1/2">
                      Date de départ :{' '}
                    </label>
                    <InputT
                      width="2/5 cursor-pointer"
                      name={'departDate'}
                      id={'departDate'}
                      type="date"
                    />
                  </div>

                  <div className="text-red-700  text-sm mt-2 font-extrabold flex-row">
                    <ErrorMessage name={'departDate'} />
                  </div>
                </div>
              </div>

              <Button type="submit" children="Rechercher" />
            </Form>
          </Formik>
        </div>
        <div className="w-800 bg-Moonstone m-auto rounded-xl p-4 ">
          <div className="bg-red-200 m-autoX mb-4 rounded-xl" />
          <div className="p-1 bg-blueBg">
            <h4 className="text-2xl text-center text-white font-bold bg-Moonstone rounded mb-2 p-2">
              Derniers trajets disponibles
            </h4>
            <div className="ride-container">
              <ul className="overflow-y-auto w-9/10 m-autoX h-350 px-4 scrollbar-hide">
                {ridesDisplayer()}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideSearchView;
