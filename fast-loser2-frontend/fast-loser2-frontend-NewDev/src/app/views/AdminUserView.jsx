import {
  faCakeCandles,
  faCarSide,
  faHouse,
  faMusic,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GiSteeringWheel } from 'react-icons/gi';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BanPopUp from '../components/Popups/BanPopUp';
import axios from 'axios';
import { URL_BACK } from '../constants/urls/urlBackEnd';
import Chat from '../components/chat/Chat';
import Notif from '../components/Notif';

const AdminUserView = () => {
  const [rides, setRides] = useState([]);
  const [user, setUser] = useState({});
  const [car, setCar] = useState({});
  const [images, setImages] = useState([]);
  const [banActive, setBanActive] = useState(false);
  const [chatActive, setChatActive] = useState(false);
  const [notifTheme, setNotifTheme] = useState('');
  const [banDate, setBanDate] = useState();

  const navigate = useNavigate();
  const userId = window.location.href.split("/")[5];

  ////Fetch des trajets + user/////
  useEffect(() => {
    axios
      .get(URL_BACK + "/api/trajets")
      .then((res) => setRides(res.data["hydra:member"].reverse()));
    axios
      .get(URL_BACK + `/api/users/${userId}`)
      .then((res) => setUser(res.data));
  }, []);

  ////Fetch du véhicule de l'utilisateur////
  useEffect(() => {
    axios.get(URL_BACK + `/get/cars_by_user_id/${user.id}`).then((res) => {
      if (res.data.length) {
        setCar(res.data[0]);
        const photosUrlArray = res.data[0].photosUrl?.split(",");
        setImages(photosUrlArray);
      }
    });
  }, [user]);

  ////Affiche les derniers trajets proposés par l'utilisateur////
  let lastTrajetsDisplayer = () => {
    const filter = rides.filter((ride) => ride.id_account.id === user.id);
    if (filter.length > 0) {
      return filter.slice(0, 10).map((ride, index) => (
        <li
          className="grid grid-cols-[10%,90%] text-white w-full  my-10"
          key={index}
        >
          <GiSteeringWheel className="h-8 text-3xl mr-2 my-auto" />
          <div className="grid grid-cols-[40%,20%,40%]">
            <div className="text-center m-auto">
              <p className="font-bold">{ride.depart}</p>
              <p className=" font-bold ">{ride.depart_hour}</p>
            </div>
            <div>
              <p className="text-center mb-2">{ride.depart_date}</p>
              <div className="arrow" />
            </div>

            <p className="pt-5 mx-auto pl-10 font-bold px-4">
              {ride.destination}
            </p>
          </div>
        </li>
      ));
    } else {
      return (
        <p className="pt-5 mx-auto pl-10 font-bold text-2xl px-4">
          Cet utilisateur n'a proposé aucun trajet
        </p>
      );
    }
  };

  ////Calcule l'âge grâce à la date de naissance////
  let calculateAge = (date) => {
    var formattedDate = date.split("-");
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

  return (
    <div className="relative">
      {banActive ? (
        <BanPopUp
          setActive={setBanActive}
          setNotifTheme={setNotifTheme}
          user_signal={user}
          theme="ban"
          setBanDate={setBanDate}
        />
      ) : null}
      {chatActive ? <Chat active={true} userToTalk={user} /> : null}

      <div
        className={
          banActive
            ? 'h-[90vh] bg-[#04ACBE] text-white flex justify-center items-center px-12 relative  z-0 bg-white-500 opacity-50'
            : 'h-[90vh] bg-[#04ACBE] text-white flex justify-center items-center px-12 relative   '
        }
      >
        {notifTheme === 'ban' || notifTheme === 'warn' ? (
          <Notif
            user={user}
            date={user.date_unban}
            page="user"
            theme={notifTheme}
            setNotifTheme={setNotifTheme}
          />
        ) : null}
        <div className="grid grid-cols-[1fr,1fr] w-[1500px] relative">
          <div className="absolute left-[25px] top-[10px]">
            <button
              onClick={() => setChatActive(true)}
              className="w-full bg-[#7cc474] hover:bg-[#54b44b] tracking-wider text-white font-extrabold py-2 px-4 block  rounded cursor-pointer my-4"
            >
              Contacter
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 tracking-wider text-white font-extrabold py-2 px-4 w-full rounded block  cursor-pointer my-4"
              onClick={() => setBanActive(true)}
            >
              Bannir
            </button>
          </div>
          <div className="flex items-center justify-center bg-blueBg p-8 rounded-l ">
            <div>
              <div className="text-white font-bold">
                <div className="flex items-center justify-center">
                  <FontAwesomeIcon className="text-2xl" icon={faUser} />
                  <p className="ml-3 text-2xl">
                    {user.prenom ? user.prenom + " " + user.nom : null}{" "}
                  </p>
                </div>

                <div className="flex items-center justify-center ">
                  <div className="flex justify-end items-center w-[170px]">
                    <FontAwesomeIcon
                      className="text-2xl"
                      icon={faCakeCandles}
                    />
                    <p className="ml-3 text-2xl">
                      {user.date_naissance
                        ? calculateAge(user.date_naissance) + " " + "ans"
                        : null}
                    </p>
                  </div>
                  <img
                    className="imgProfil h-40 my-4 w-40 rounded-full m-6"
                    src={
                      user && user.img_profil
                        ? user.img_profil
                        : "/src/app/assets/img/avatar.png"
                    }
                    alt=""
                  />
                  <div className="flex items-center w-[170px]">
                    <FontAwesomeIcon className="text-2xl" icon={faHouse} />
                    <p className="ml-3 text-2xl">
                      {user.ville ? user.ville : null}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <FontAwesomeIcon className="text-2xl" icon={faMusic} />
                  <p className="ml-3 text-2xl">
                    {user && user.id_music ? user.id_music.value : null}
                  </p>
                </div>
              </div>

              <div className="text-white text-center w-2/3 my-8 mx-auto rounded">
                {user.description ? user.description : null}
              </div>

              <div className="">
                <div className="flex text-center justify-center items-center m-auto w-1/2 text-white font-bold mb-4">
                  <FontAwesomeIcon className="text-3xl mr-4" icon={faCarSide} />
                  <p>
                    {car ? car.brand : null} {car ? car.model : null}
                  </p>
                </div>

                <ul className="flex justify-between rounded mx-auto w-2/3 max-w-2/3bg-white">
                  {images.map((img) => (
                    <div className="imgContainer ">
                      <img
                        className="photo w-44 max-w-none max-h-[100px] object-contain inline-block"
                        src={img}
                      />
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-blueBg p-8 border-l-4 w-full rounded-r">
            <h4 className="bg-[#7EC472] text-white w-fit px-10 py-2  rounded mx-auto mb-8">
              Historique des trajets
            </h4>
            <ul className=" overflow-y-auto max-h-[57vh]">
              {lastTrajetsDisplayer()}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserView;
