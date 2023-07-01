import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { URL_BACK } from "../constants/urls/urlBackEnd";
import '../assets/styles/components/card.css';
import axios from 'axios';
import { PuffLoader } from 'react-spinners';

const Card = (props) => {
  const [userInfos, setUserInfos] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(URL_BACK + `/api/users/${props.id_account}`)
      .then((res) => setUserInfos(res.data));
  }, []);
  
  return (
    <li
      className={
        userInfos
          ? 'flex items-center border-b-2 border-white h-40 py-3 text-white font-normal'
          : 'border-b-2 border-white h-40 py-3 text-white font-normal'
      }
    >
      {userInfos.id ? (
        <div className="grid grid-cols-[1fr,200px] w-full">
          <div>
            <div className="flex items-center">
              <img className="h-16 w-16 rounded-full object-cover mr-5" src={userInfos.img_profil} alt="id" />
              <h3 className={props.small ? 'text-xl' : 'text-2xl'}>
                <span className={'font-bold text-2xl'}>
                  {userInfos.prenom && userInfos.nom
                    ? userInfos.prenom + ' ' + userInfos.nom
                    : ''}
                </span>{' '}
                propose ce trajet le <span>{props.date}</span>
              </h3>
            </div>

            <div className=" mt-5">
              <div className="grid grid-cols-[40%,20%,40%]">
                <div className="text-center">
                  <p className="font-bold">{props.depart}</p>
                  <p className=" font-bold ">{props.departHour}</p>
                </div>
                <div className="arrow" />
                <p className="m-auto pl-10 font-bold px-4">
                  {props.destination}
                </p>
              </div>
            </div>
          </div>

          <button
            className="bg-[#7cc474] hover:bg-[#54b44b] tracking-wider text-white font-extrabold py-2 px-4 rounded w-full cursor-pointer h-10 m-auto"
            onClick={() => navigate(`/ride/infos/${props.id_ride}`)}
          >
            En savoir plus
          </button>
        </div>
      ) : (
        <div className="m-auto h-28 w-28">
          <PuffLoader color="#3DCC85" size={112} />
        </div>
      )}
    </li>
  );
};

export default Card;
