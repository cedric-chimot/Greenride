import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { URL_BACK } from '../constants/urls/urlBackEnd';
import BanPopUp from '../components/Popups/BanPopUp';
import Notif from '../components/Notif';

const AdminAlert = () => {
  const [alert, setAlert] = useState({});
  const [userAlertList, setUserAlertList] = useState([]);
  const [banActive, setBanActive] = useState('');
  const [banDate, setBanDate] = useState();
  const [notifTheme, setNotifTheme] = useState('');
  let id = useParams();
  let url = window.location.href;
  const navigate = useNavigate();

  ////Fetch de l'alerte dans la bdd////////
  useEffect(() => {
    axios.get(URL_BACK + `/api/alerts/${id.id}`).then((res) => {
      setAlert(res.data);
    });
  }, [id, url, notifTheme]);

  ////Fetch toutes les alertes de l'utilisateur signalé///////
  useEffect(() => {
    if (alert['user_signal']) {
      axios
        .get(URL_BACK + `/get/alerts_by_user_id/${alert['user_signal'].id}`)
        .then((res) => setUserAlertList(res.data));
    }
  }, [alert]);

  /////Affiche les signalements fetchés au dessus//////
  let signalListDisplayer = () => {
    if (userAlertList.length > 0) {
      return userAlertList.map((alerte) => (
        <li className="grid grid-cols-[1fr,150px] w-full border-y-2 border-blueBg p-2 text-black">
          <p className="my-auto">{alerte.reason}</p>
          <button
            className="bg-[#7cc474] hover:bg-[#54b44b] tracking-wider text-white font-extrabold py-2 px-4 rounded  cursor-pointer"
            onClick={() => navigate(`/Admin/alert/${alerte.id}`)}
          >
            Voir
          </button>
        </li>
      ));
    } else
      return (
        <p className="text-black px-4 py-2">
          Cet utilisateur n'a fait l'objet d'aucun signalement pour le moment.
        </p>
      );
  };

  return (
    <div className="h-[90vh] relative w-full bg-[#04ADBF] flex flex-col justify-center pt-16">
      {banActive != '' ? (
        <BanPopUp
          setActive={setBanActive}
          setBanDate={setBanDate}
          setNotifTheme={setNotifTheme}
          user_signal={alert['user_signal']}
          theme={banActive}
        />
      ) : null}

      <div className="text-Whitesmoke flex items-center text-center mx-auto font-bold text-4xl">
        <h3>
          {alert['user_plaint']
            ? alert['user_plaint'].prenom +
              ' ' +
              alert['user_plaint'].nom +
              ' a signalé ' +
              alert['user_signal'].prenom +
              ' ' +
              alert['user_signal'].nom +
              ' pour ' +
              alert.reason
            : null}
        </h3>
      </div>
      <div
        className={
          banActive
            ? 'h-[90vh] text-white p-4 z-0 bg-white-500 opacity-30 flex items-center'
            : 'h-[90vh] bg-[#04ACBE] text-white p-4 flex items-center '
        }
      >
        <div className="flex w-full justify-around items-center h-fit">
          <div className="w-950 bg-slate-200 h-full p-2 text-white rounded relative">
            {notifTheme === 'ban' || notifTheme === 'warn' ? (
              <Notif
                user={alert['user_signal']}
                date={alert['user_signal'].date_unban}
                theme={notifTheme}
                setNotifTheme={setNotifTheme}
                page=""
              />
            ) : null}
            <div className="bg-blueBg text-center py-4 mb-4">
              <h4 className="mb-4">{alert.reason}</h4>
              <div className="flex justify-around px-12">
                <div className="text-center">
                  <p className="text-xl">Signalé par</p>
                  <img
                    className="imgProfil h-24 my-4 w-24 rounded-full object-cover mx-auto"
                    src={
                      alert['user_plaint'] && alert['user_plaint'].img_profil
                        ? alert['user_plaint'].img_profil
                        : '/src/app/assets/img/avatar.png'
                    }
                    alt=""
                  />
                  <p className="text-2xl font-bold">
                    {alert['user_plaint']
                      ? alert['user_plaint'].prenom +
                        ' ' +
                        alert['user_plaint'].nom
                      : null}
                  </p>
                </div>
                <div className="arrow-alert" />
                <div className="text-center">
                  <p className="text-xl">A propos de</p>
                  <img
                    className="imgProfil h-24 w-24 my-4 rounded-full object-cover mx-auto"
                    src={
                      alert['user_signal'] && alert['user_signal'].img_profil
                        ? alert['user_signal'].img_profil
                        : '/src/app/assets/img/avatar.png'
                    }
                    alt=""
                  />
                  <p className="text-2xl font-bold">
                    {' '}
                    {alert['user_signal']
                      ? alert['user_signal'].prenom +
                        ' ' +
                        alert['user_signal'].nom
                      : null}
                  </p>
                  <button
                    onClick={() => setBanActive('warn')}
                    className="w-full bg-[#7cc474] hover:bg-[#54b44b] tracking-wider text-white font-extrabold py-2 px-4 block  rounded cursor-pointer my-4"
                  >
                    Avertir
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 tracking-wider text-white font-extrabold py-2 px-4 w-full rounded block  cursor-pointer my-4"
                    onClick={() => setBanActive('ban')}
                  >
                    Bannir
                  </button>
                </div>
              </div>
            </div>
            <div className="flex">
              <div className=" w-1/2 text-black border-2 border-blueBg">
                <h6 className="text-center bg-blueBg text-Whitesmoke">
                  Détails du signalement
                </h6>
                <div className="p-4">
                  <p className="py-2">
                    <strong>Date :</strong> {alert.date ? alert.date : null}
                  </p>
                  <p className="py-2">
                    <strong>Commentaire : </strong>
                    {alert.commentaire}
                  </p>
                </div>
              </div>
              <div className=" border-2 border-blueBg w-1/2 ">
                <h6 className="text-center bg-blueBg">
                  Historique des signalements de{' '}
                  {alert['user_signal']
                    ? alert['user_signal'].prenom +
                      ' ' +
                      alert['user_signal'].nom
                    : null}
                </h6>
                <ul className="h-full max-h-48 overflow-y-auto ">
                  {signalListDisplayer()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAlert;
