import { faHouse, faMusic, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URL_BACK } from "../constants/urls/urlBackEnd";

const AdminAdminView = () => {
  const [user, setUser] = useState({});
  const [chats, setChats] = useState([]);

  const navigate = useNavigate();
  const userId = window.location.href.split("/")[5];

  useEffect(() => {
    axios
      .get(URL_BACK + `/api/users/${userId}`)
      .then((res) => setUser(res.data));
    axios
      .get(URL_BACK + `/get/chat_by_user_id/${userId}`)
      .then(async (res) => {
        if (res.data) {
          const chats = res.data;
          const promises = [];
          chats.forEach((chat) => {
            const getChatInfo = async () => {
              const userId =
                chat.idUser1 === user.id ? chat.idUser1 : chat.idUser2;

              const response = await axios.get(
                URL_BACK + `/api/users/${userId}`
              );
              const contactUser = response.data;

              return {
                id: chat.id,
                fullName: `${contactUser.prenom} ${contactUser.nom}`,
                date: chat.date,
              };
            };

            promises.push(getChatInfo());
          });

          const results = await Promise.all(promises);
          setChats(results);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="relative">
      <div className="h-[90vh] bg-[#04ACBE] text-white flex justify-center items-center px-12">
        <div className="grid grid-cols-[1fr,1fr] w-[1500px] relative">
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
                  <img
                    className="imgProfil h-40 my-4 w-40 rounded-full m-6"
                    src={
                      user && user.img_profil
                        ? user.img_profil
                        : "/src/app/assets/img/avatar.png"
                    }
                    alt=""
                  />
                </div>
              </div>

              <div className="text-white text-center w-2/3 my-8 mx-auto rounded">
                {user.description ? user.description : null}
              </div>
            </div>
          </div>
          <div className="bg-blueBg p-8 border-l-4 w-full rounded-r">
            <h4 className="bg-[#7EC472] text-white w-fit px-10 py-2  rounded mx-auto mb-8">
              Historique des messages
            </h4>
            <table className="overflow-y-auto max-h-[57vh]">
              <thead>
                <tr>
                  <th className="px-4 py-2">Сhat avec</th>
                  <th className="px-4 py-2">Date</th>
                  </tr>
          </thead>
          <tbody>
              {chats.map((chat) => (
                <tr key={chat.id}>
                  <td className="px-4 py-2 border">{chat.fullName}</td>
                  <td className="px-4 py-2 border">{chat.date}</td>
                </tr>
              ))}
              </tbody>
            </table>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAdminView;
