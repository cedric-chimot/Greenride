import { faEye, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';
import ConfirmPopUp from '../components/Popups/ConfirmPopUp';
import CreateAdmin from '../components/Popups/CreateAdmin';
import { URL_BACK } from '../constants/urls/urlBackEnd';
import Notif from '../components/Notif';

const AdminGestionView = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [title, setTitle] = useState('');
  const [notif, setNotif] = useState('');
  const [dataToDelete, setDataToDelete] = useState();
  const [popUpActive, setPopUpActive] = useState(false);
  const [create, setCreate] = useState();
  const [createPopUp, setCreatePopUp] = useState(false);

  let url = window.location.href;
  let result = data;
  const navigate = useNavigate();

  /////Fetch la data en fonction de l'url et la stocke dans le state data//////
  useEffect(() => {
    let url = window.location.href;

    if (url.includes('manage/users')) {
      setTitle('utilisateurs');
      axios.get(URL_BACK + `/api/users`).then((res) => {
        setData(res.data['hydra:member']);
        setFilteredData(res.data['hydra:member']);
      });
    } else if (url.includes('manage/rides')) {
      setTitle('trajets');
      axios.get(URL_BACK + `/api/trajets`).then((res) => {
        setData(res.data['hydra:member']);
        setFilteredData(res.data['hydra:member']);
      });
    } else if (url.includes('manage/alerts')) {
      setTitle('alertes et signalements');
      axios
        .get(URL_BACK + `/api/alerts`)
        .then((res) => setData(res.data['hydra:member']));
    } else if (url.includes('manage/messages')) {
      setTitle('messages');
      axios
        .get(URL_BACK + `/api/contacts`)
        .then((res) => setData(res.data['hydra:member'].reverse()));
    } else if (url.includes('manage/admins')) {
      setTitle('administrateurs');
      axios
        .get(URL_BACK + `/api/users`)
        .then((res) => setData(res.data['hydra:member']));
    }
  }, [url]);

  /////Filtre la data quand on tape dans la barre de recherche/////
  useEffect(() => {
    dataFilter();
  }, [search, data]);

  /////Affiche un spinner puis les données/////
  let spinnerDisplayer = (data) => {
    if (
      data === undefined ||
      data.includes('undefined') ||
      data === null ||
      data['user_plaint']
    ) {
      return <PuffLoader color="#3DCC85" size={40} />;
    } else return data;
  };

  /////Fonction de filtrage des données/////
  let dataFilter = () => {
    if (search != '') {
      result = data.filter(function (data) {
        if (url.includes('manage/users')) {
          if (
            data.prenom.toUpperCase().includes(search.toUpperCase()) ||
            data.nom.toUpperCase().includes(search.toUpperCase()) ||
            data.email.toUpperCase().includes(search.toUpperCase())
          ) {
            console.log('reussi');
            return true;
          } else return false;
        }
        if (url.includes('manage/rides')) {
          if (
            data.depart.toUpperCase().includes(search.toUpperCase()) ||
            data.destination.toUpperCase().includes(search.toUpperCase()) ||
            data.depart_date.includes(search)
          ) {
            return true;
          } else return false;
        }
        if (url.includes('manage/alerts')) {
          if (
            data['user_plaint'].prenom
              .toUpperCase()
              .includes(search.toUpperCase()) ||
            data['user_plaint'].nom
              .toUpperCase()
              .includes(search.toUpperCase()) ||
            data.reason.toUpperCase().includes(search.toUpperCase())
          ) {
            return true;
          } else return false;
        }
        if (url.includes('manage/messages')) {
          if (
            data.nom.toUpperCase().includes(search.toUpperCase()) ||
            data.prenom.toUpperCase().includes(search.toUpperCase()) ||
            data.date.includes(search)
          ) {
            return true;
          } else return false;
        }
        if (url.includes('manage/admins')) {
          if (
            data.prenom.toUpperCase().includes(search.toUpperCase()) ||
            data.nom.toUpperCase().includes(search.toUpperCase()) ||
            data.email.toUpperCase().includes(search.toUpperCase())
          ) {
            return true;
          } else return false;
        }
      });
    }
    if (url.includes('manage/users')) {
      setFilteredData(
        result.filter((user) => !user.roles.includes('ROLE_ADMIN'))
      );
    } else if (url.includes('manage/admins')) {
      setFilteredData(result.filter((user) => user.roles.length > 1));
    } else setFilteredData(data);
  };

  /////Affiche la data///////
  let dataDisplayer = () => {
    return filteredData.map((data, index) => (
      <li
        key={index}
        className="flex bg-blueBg justify-between items-center w-full mb-1 border-y-2 h-16 text-center "
      >
        <div className="w-5/12 flex items-center">
          {url.includes('manage/users') ? (
            <p
              className="m-auto cursor-pointer"
              onClick={() => navigate(`/Admin/user/${data.id}`)}
            >
              {spinnerDisplayer(data.prenom + ' ' + data.nom)}
            </p>
          ) : null}

          {url.includes('manage/rides') ? (
            <p className="m-auto ">
              {spinnerDisplayer(data.depart + ' le ' + data.depart_date)}
            </p>
          ) : null}

          {url.includes('manage/alerts') ? (
            <p className="m-auto">
              {data['user_plaint']
                ? spinnerDisplayer(
                    data['user_plaint'].prenom + ' ' + data['user_plaint'].nom
                  )
                : spinnerDisplayer(undefined)}
            </p>
          ) : null}

          {url.includes('manage/messages') ? (
            <p className="m-auto">
              {data['id_user']
                ? spinnerDisplayer(
                    data['id_user'].prenom + ' ' + data['id_user'].nom
                  )
                : spinnerDisplayer(undefined)}
            </p>
          ) : null}

          {url.includes('manage/admins') ? (
            <p
              className="m-auto cursor-pointer"
              onClick={() => navigate(`/Admin/admin/${data.id}`)}
            >
              {spinnerDisplayer(data.prenom + ' ' + data.nom)}
            </p>
          ) : null}
        </div>
        <div className="w-5/12 flex items-center border-x-2 h-full ">
          <p className="m-auto">
            {url.includes('manage/users') || url.includes('manage/admins')
              ? spinnerDisplayer(data.email)
              : null}
            {url.includes('manage/rides')
              ? spinnerDisplayer(data.destination)
              : null}
            {url.includes('manage/alerts')
              ? spinnerDisplayer(data.reason)
              : null}
            {url.includes('manage/messages')
              ? spinnerDisplayer(data.objet)
              : null}
          </p>
        </div>

        <div className="flex justify-around w-2/12">
          {url.includes('manage/users') ? (
            <FontAwesomeIcon
              className="cursor-pointer"
              icon={faEye}
              onClick={() => navigate(`/Admin/user/${data.id}`)}
            />
          ) : null}
          {url.includes('manage/rides') ? (
            <FontAwesomeIcon
              className="cursor-pointer"
              icon={faEye}
              onClick={() => navigate(`/Admin/ride/${data.id}`)}
            />
          ) : null}

          {url.includes('manage/alerts') ? (
            <FontAwesomeIcon
              className="cursor-pointer"
              icon={faEye}
              onClick={() => navigate(`/Admin/alert/${data.id}`)}
            />
          ) : null}

          {url.includes('manage/messages') ? (
            <FontAwesomeIcon
              className="cursor-pointer"
              icon={faEye}
              onClick={() => navigate(`/Admin/message/${data.id}`)}
            />
          ) : null}

          {url.includes('manage/admins') ? (
            <FontAwesomeIcon
              className="cursor-pointer"
              icon={faEye}
              onClick={() => navigate(`/Admin/admin/${data.id}`)}
            />
          ) : null}

          {!url.includes('manage/admins') ? (
            <FontAwesomeIcon
              className="cursor-pointer"
              icon={faTrashCan}
              onClick={() => popUpDisplayer(data)}
            />
          ) : null}
        </div>
      </li>
    ));
  };

  ///Affiche le popUp de suppression et stocke les données à supprimer dans un state/////
  let popUpDisplayer = (data) => {
    setDataToDelete(data);
    setPopUpActive(true);
  };

  ///Affiche le popUp de création d'Admin et stocke les données à supprimer dans un state/////
  let createDisplayer = (create) => {
    setDataToDelete(create);
    setCreatePopUp(true);
  };

  return (
    <div className="relative">
      {popUpActive ? (
        <ConfirmPopUp
          data={dataToDelete}
          active={setPopUpActive}
          setNotif={setNotif}
        />
      ) : null}
      {url.includes('manage/admins') && createPopUp ? (
        <CreateAdmin create={dataToDelete} active={setCreatePopUp} />
      ) : null}
      <div
        className={
          popUpActive || createPopUp
            ? 'h-[90vh] bg-[#04ACBE] text-white p-8  z-0 bg-white-500 opacity-50'
            : 'h-[90vh] bg-[#04ACBE] text-white p-8  '
        }
      >
        <h1 className="text-center mb-8">Gestion des {title}</h1>

        <div className="w-1/2 max-w-[800px] bg-blueBg m-auto border-2 border-white ">
          {notif != '' ? <Notif theme={notif} /> : null}
          <input
            type="text"
            placeholder={'Recherche ...'}
            className="p-4 w-full bg-blueBg border-0 h-[10%] text-white placeholder:text-white text-xl font-bold focus:ring-0"
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="bg-white p-1">
            <div className="flex bg-blueBg justify-between items-center w-full mb-1 border-y-2 h-16 text-center ">
              <div className="w-5/12 flex items-center h-full">
                {url.includes('manage/users') ||
                url.includes('manage/alerts') ||
                url.includes('manage/admins') ||
                url.includes('manage/messages') ? (
                  <p className="m-auto cursor-pointer font-bold tracking-wider">
                    {'Nom et prénom'.toUpperCase()}
                  </p>
                ) : null}
                {url.includes('manage/rides') ? (
                  <p className="m-auto cursor-pointer font-bold tracking-wider">
                    {'Départ'.toUpperCase()}
                  </p>
                ) : null}
              </div>
              <div className="w-5/12 flex items-center border-x-2 h-full ">
                <p className="m-auto font-bold tracking-wider">
                  {url.includes('manage/users') ? 'Email'.toUpperCase() : null}
                  {url.includes('manage/admins') ? 'Email'.toUpperCase() : null}
                  {url.includes('manage/rides')
                    ? 'Destination'.toUpperCase()
                    : null}
                  {url.includes('manage/alerts') ? 'Objet'.toUpperCase() : null}
                  {url.includes('manage/messages')
                    ? 'Objet'.toUpperCase()
                    : null}
                </p>
              </div>

              <div className="flex justify-around w-2/12">
                <p className="m-auto font-bold tracking-wider">
                  {'Action'.toUpperCase()}
                </p>
              </div>
            </div>
            <ul className="max-h-[500px] overflow-y-auto scrollbar-hide">
              {dataDisplayer()}
            </ul>
          </div>
        </div>
        <div className="absolute top-[100px] left-[150px]">
          {url.includes('manage/admins') ? (
            <button
              className="text-white text-xl bg-Mantis active:bg-Mantis font-bold text-sm px-6 py-4 rounded shadow hover:shadow-lg outline-none focus:outline-none"
              type="submit"
              onClick={() => createDisplayer(create)}
            >
              Ajouter un admin
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AdminGestionView;
