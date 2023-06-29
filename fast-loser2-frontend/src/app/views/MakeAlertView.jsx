import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { URL_BACK } from '../constants/urls/urlBackEnd';
import axios from 'axios';
import Notif from '../components/Notif';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomToast from '../components/toast/CustomToast';

const MakeAlertView = () => {
  const [user, setUser] = useState({});
  const [alertObject, setAlertObject] = useState('default');
  const [notifTheme, setNotifTheme] = useState('');
  const [commentaire, setCommentaire] = useState('');
  const { id } = useParams();
  const currentUser = useSelector((state) => state.user);
  const navigate = useNavigate();

  ////Fetch des infos de l'utilisateur à signaler////
  useEffect(() => {
    axios
      .get(URL_BACK + '/api/users/' + id)
      .then((resTrajet) => {
        setUser(resTrajet.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  ////Crée un objet alert + envoi à la bdd////
  const createAlert = (e) => {
    e.preventDefault();
    let alert = {
      date: new Date().toLocaleDateString('fr-FR'),
      commentaire: commentaire,
      userPlaint: `/api/users/${currentUser.id}`,
      userSignal: `/api/users/${id}`,
      reason: alertObject,
    };
    console.log(alert);
    axios.post(URL_BACK + '/api/alerts', alert).then((res) => {
      if (res.status === 200 || res.status === 201) {
        toast.success(<CustomToast message="Signalement envoyé !" />, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        navigate('/');
      } else {
        toast.error(
          <CustomToast message="Echec du signalement, veuillez réessayer" />,
          { position: toast.POSITION.BOTTOM_RIGHT }
        );
      }
    });
  };

  return (
    <div className=" bg-Teal h-[84vh] flex items-center">
      <div className=" w-[500px] m-auto bg-Moonstone text-white p-8 rounded-xl text-center flex flex-col relative border-4">
        {notifTheme === 'alert' ? (
          <Notif theme={notifTheme} setNotifTheme={setNotifTheme} />
        ) : null}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                className="h-16 w-16 rounded-full object-cover mr-3"
                src={user && user.img_profil ? user.img_profil : null}
                alt="id"
              />
              <div className="text-2xl font-bold">
                {user && user.nom ? user.prenom + ' ' + user.nom : ''}
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={(e) => createAlert(e)}>
          <label className="font-bold text-xl w-full">
            Veuillez indiquer l'objet du signalement
          </label>
          <select
            className="text-black font-bold text-lg cursor-pointer my-4 w-full mx-auto rounded"
            onChange={(e) => setAlertObject(e.target.value)}
            required
          >
            <option className="text-black font-bold text-lg" value=""></option>
            <option className="text-black font-bold text-lg" value="Insultes">
              Insultes
            </option>
            <option className="text-black font-bold text-lg" value="Retard">
              Retard
            </option>
            <option
              className="text-black font-bold text-lg"
              value="Conducteur pas venu"
            >
              Le conducteur n'est pas venu
            </option>
            <option
              className="text-black font-bold text-lg"
              value="Conduite dangereuse"
            >
              Conduite dangereuse
            </option>
            <option
              className="text-black font-bold text-lg"
              value="Passager déposé au mauvais endroit"
            >
              Le conducteur ne m'a pas déposé au bon endroit
            </option>
            <option className="text-black font-bold text-lg" value="autre">
              Autre
            </option>
          </select>
          {alertObject === 'default' ||
          alertObject === 'Insultes' ||
          alertObject === 'Retard' ||
          alertObject === 'Conducteur pas venu' ||
          alertObject === 'Conduite dangereuse' ||
          alertObject === 'Passager déposé au mauvais endroit' ? null : (
            <div>
              {' '}
              <label className="font-bold text-lg cursor-pointer my-4 w-full mx-auto rounded">
                Objet du signalement
              </label>
              <input
                type="text"
                maxLength={50}
                className="text-black font-bold text-lg my-4 w-full"
                onChange={(e) => setAlertObject(e.target.value)}
                required
              />
            </div>
          )}
          <label className="font-bold text-xl mb-4 block">
            Detail du signalement
          </label>
          <textarea
            maxLength={255}
            className="text-black font-bold text-lg h-[190px] resize-none w-full rounded"
            onChange={(e) => setCommentaire(e.target.value)}
          ></textarea>

          <input
            type="submit"
            value="Valider"
            className="bg-[#7cc474] hover:bg-[#54b44b] tracking-wider text-white font-extrabold py-2 px-4 rounded w-1/2 mx-auto cursor-pointer mt-8"
          />
        </form>
      </div>
    </div>
  );
};

export default MakeAlertView;
