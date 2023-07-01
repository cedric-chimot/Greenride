import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { URL_BACK } from '../constants/urls/urlBackEnd';
import defaultPic from '../assets/img/photoprofil.png';
import Chat from '../components/chat/Chat';

const AdminContactView = () => {
  const [data, setData] = useState({});
  const [chatActive, setChatActive] = useState(false);
  const id = useParams();

  /////Fetch du contact/////
  useEffect(() => {
    axios
      .get(URL_BACK + '/api/contacts/' + id.id)
      .then((res) => setData(res.data));
  }, []);

  return (
    <div className="h-[90vh] bg-[#04ADBF] flex justify-center items-center relative">
      <div>
        <div className="flex justify-center text-Whitesmoke font-bold mb-8">
          <h1>{data.objet}</h1>
        </div>
        {chatActive ? (
          <Chat active={true} userToTalk={data['id_user']} />
        ) : null}
        <div className="w-[450px] bg-blueBg p-8 text-white rounded">
          <div className="flex items-center w-fit mb-8">
            <img
              className="h-24 mr-4 rounded-full"
              src={
                data.id_user && data['id_user'].img_profil
                  ? data['id_user'].img_profil
                  : defaultPic
              }
            />
            <div>
              <h4 className="font-bold">
                {data['id_user'] ? data['id_user'].prenom : null}{' '}
                {data['id_user'] ? data['id_user'].nom : null}{' '}
              </h4>
              <p className="text-xl">
                {data['id_user'] ? data['id_user'].email : null}
              </p>
            </div>
          </div>

          <p className="mb-8 text-xl">
            {' '}
            {data.date ? 'Message envoyé le ' + data.date : null}
          </p>
          <p className="text-xl mb-10 break-words">{data.message}</p>
          <div className="w-full flex justify-center">
            <button
              className="bg-[#7cc474] hover:bg-[#54b44b] tracking-wider text-white font-extrabold py-2 px-4 rounded mx-auto cursor-pointer"
              onClick={() => setChatActive(true)}
            >
              Répondre
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContactView;
