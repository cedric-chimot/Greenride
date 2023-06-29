import {
  faComments,
  faPaperPlane,
  faWindowMinimize,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { URL_BACK } from '../../constants/urls/urlBackEnd';

const Chat = (props) => {
  const [active, setActive] = useState(false);
  const activeRef = useRef();
  ///////////////////DATA//////////////////////////////
  const [userList, setUserList] = useState([]);
  const [userChatList, setUserChatList] = useState([]);
  const [counterNotifs, setCounterNotifs] = useState(0);
  ////////////////CONVERSATION ACTIVE///////////////////
  const [activeChatId, setActiveChatId] = useState(0);
  const activeChatIdRef = useRef();
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null)
  const [userToTalk, setUserToTalk] = useState({});
  /////////////////////////RECHERCHE///////////////////
  const [searchedUser, setSearchedUser] = useState('');
  const [filteredUserList, setFilteredUserList] = useState([]);
  /////////////////CHAT/////////////////////////
  const [chat, setChat] = useState('');

  const user = useSelector((state) => state.user);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    activeChatIdRef.current = activeChatId;
  }, [activeChatId]);

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  ////Fetch les conversation de l'utilisateur et les messages si une conversation est active////
  useEffect(() => {
    if (props.active === true) {
      axios.get(URL_BACK + `/get/chat_by_user_id/${user.id}`).then((res) => {
        if (res.data.length < 1) setActiveChatId('newChat');
        else {
          for (let key in res.data) {
            if (
              res.data[key].id_user_1 === props.userToTalk.id ||
              res.data[key].id_user_2 === props.userToTalk.id
            ) {
              setActiveChatId(res.data[key].id);
            } else setActiveChatId('newChat');
          }
        }
        setUserToTalk(props.userToTalk);
      });
    }

    if (user.id != null) {
      axios.get(URL_BACK + `/get/chat_by_user_id/${user.id}`).then((res) => {
        setUserChatList(res.data);
        getUserList();
      });
    }
    if (activeChatId != 0 && activeChatId != 'newChat') {
      axios
        .get(URL_BACK + `/get/messages_by_chat_id/${activeChatId}`)
        .then((res) => setMessages(res.data));
    }
  }, [user, activeChatId]);

  ////Fetch la liste des utilisateurs////
  let getUserList = () => {
    axios
      .get(URL_BACK + '/api/users')
      .then((res) => setUserList(res.data['hydra:member']));
  };

  ////Filtre les utilisateurs si une recherche est en cours////
  let userListFilter = (username) => {
    setSearchedUser(username);
    setFilteredUserList(
      userList.filter((user) => {
        if (
          (user.prenom + ' ' + user.nom)
            .toUpperCase()
            .includes(username.toUpperCase()) &&
          !user.roles.includes('ROLE_ADMIN')
        ) {
          return true;
        } else return false;
      })
    );
  };

  ////Affiche les messages de la conversation en cours////
  let messagesDisplayer = () => {
    return messages.map((message, index) => (
      <li
        className={
          message.id_user === user.id
            ? 'flex  flex-row-reverse items-center my-4 '
            : 'flex items-center my-4 '
        }
        key={index}
      >
        <img className="h-10 w-10 rounded-full mx-2" src={message.id_user === user.id ? user.imgProfil : userToTalk.imgProfil} />
        <p
          className={
            message.id_user === user.id
              ? 'bg-[#047C89] w-170 font-bold rounded-xl text-white px-4 py-2'
              : 'bg-slate-200 w-170 font-bold  rounded-xl px-4 py-2'
          }
        >
          {message.text}
        </p>
      </li>
    ));
  };

  ////Création d'un nouveau message et d'une conversation si premier message dans la bdd////
  let newMessageHandler = (e) => {
    e.preventDefault();
    document.getElementById('input').value = '';
    if (activeChatId === 'newChat') {
      let newChat = {
        date: new Date().toLocaleDateString(),
        idUser1: user.id,
        idUser2: userToTalk.id,
      };
      console.log(newChat);
      axios.post(URL_BACK + '/api/chats', newChat).then((res) => {
        setActiveChatId(res.data.id);
        let id = res.data.id;
        let newMessage = {
          idUser: user.id,
          text: chat,
          idChat: res.data.id,
        };
        axios.post(URL_BACK + '/api/message_chats', newMessage).then((res) => {
          axios
            .get(URL_BACK + `/get/messages_by_chat_id/${id}`)
            .then((res) => {
              const dataMercure = {
                topic: 'https://localhost/messages/' + userToTalk.id,
                data: {
                  "type": "message-chat",
                  "content": "Vous avez un nouveau message",
                  "date": new Date().toLocaleDateString().replaceAll('/', '-'),
                  "lu": false,
                  "userId": userToTalk.id,
                  "trajetId": null
                }
              }
              axios.post(URL_BACK + '/mercure/post/notification', dataMercure)
                .then(response => console.log(response));
              setMessages(res.data)
            });
        });
      });
      return;
    }
    let newMessage = {
      idUser: user.id,
      text: chat,
      idChat: activeChatId,
    };

    axios.post(URL_BACK + '/api/message_chats', newMessage).then((res) => {
      axios
        .get(URL_BACK + `/get/messages_by_chat_id/${activeChatId}`)
        .then((res) => {
          const dataMercure = {
            topic: 'https://localhost/messages/' + userToTalk.id,
            data: {
              "type": "message-chat",
              "content": "Vous avez un nouveau message",
              "date": new Date().toLocaleDateString().replaceAll('/', '-'),
              "lu": false,
              "userId": userToTalk.id,
              "trajetId": null
            }
          }
          axios.post(URL_BACK + '/mercure/post/notification', dataMercure)
            .then(response => console.log(response));
          setMessages(res.data)
        });
    });
  };

  ////Affiche les conversations de l'utilisateur////
  let conversationDisplayer = () => {
    let userTalkedTo = [];
    for (let clé in userChatList) {
      for (let key in userList) {
        if (
          (userList[key].id === userChatList[clé].id_user_1 &&
            user.id === userChatList[clé].id_user_2) ||
          (userList[key].id === userChatList[clé].id_user_2 &&
            user.id === userChatList[clé].id_user_1)
        ) {
          userTalkedTo.push(userList[key]);
        }
      }
    }

    return userTalkedTo.map((userTalked, index) => (
      <li
        key={index}
        onClick={() => userOnclickHandler(userTalked)}
        className="flex bg-[#047C89]  mb-1 items-center py-2  cursor-pointer rounded border-y-1 text-white hover:bg-slate-200 hover:text-black"
      >
        <img className="h-10 w-10 rounded-full mx-2" src={userTalked.imgProfil} />
        <p className="font-bold">
          {userTalked && userTalked.prenom
            ? userTalked.prenom + ' ' + userTalked.nom
            : null}
        </p>
      </li>
    ));
  };

  /////Passe la conversation en cours dans un state ou passe newChat si nouvelle conversation////
  let userOnclickHandler = (userTalked) => {
    if (userTalked && userTalked.id) {
      setUserToTalk(userTalked);
      for (let key in userChatList) {
        if (
          [user.id, userTalked.id].includes(userChatList[key].id_user_1) &&
          [user.id, userTalked.id].includes(userChatList[key].id_user_2)
        ) {
          setActiveChatId(userChatList[key].id);
          return;
        }
      }
      setActiveChatId('newChat');
    }
  };

  ////Affiche la liste des utilisateurs correspondant à la recherche////
  let usersDisplayer = () => {
    if (searchedUser != '') {
      return filteredUserList.map((user, index) => (
        <li
          key={index}
          onClick={() => userOnclickHandler(user)}
          className="flex bg-[#047C89]  mb-1 items-center py-2  cursor-pointer rounded border-y-1 text-white hover:bg-slate-200 hover:text-black"
        >
          <img className="h-10 w-10 rounded-full mx-2" src={user.imgProfil} />
          <p className="font-bold">{user.prenom + ' ' + user.nom}</p>
        </li>
      ));
    } else return conversationDisplayer();
  };


  useEffect(() => {
    if (user.id) {

      fetchNotifs();

      const url = new URL("https://localhost/.well-known/mercure");
      url.searchParams.append('topic', 'https://localhost/messages/' + user.id);

      const eventSource = new EventSource(url, {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOlsiKiJdfX0.a8cjcSRUAcHdnGNMKifA4BK5epRXxQI0UBp2XpNrBdw',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Methods': '*',
        }
      });
      function getRealtimeData(data) {
        console.log(activeRef.current)
        console.log(activeChatIdRef.current)
        if (activeRef.current) {
          if (activeChatIdRef.current != 0) {
            axios
            .get(URL_BACK + `/get/messages_by_chat_id/${activeChatIdRef.current}`)
            .then((res) => {
              setMessages(res.data)
            });
          }
        } else if (!activeRef.current) {
          fetchNotifs()
        }
      }
      eventSource.onmessage = e => getRealtimeData(e);
      eventSource.onerror = () => {
        // error log here 

        eventSource.close();
      }
      /*return () => {
        eventSource.close();
      };*/
    }
  }, [user]);

  function fetchNotifs() {
    axios
      .get(URL_BACK + '/get/notifications/' + user.id)
      .then((resNotifs) => {
        console.log(resNotifs.data.filter(notif => notif.type == "message-chat").filter(notif => notif.lu == false))
        setCounterNotifs(resNotifs.data.filter(notif => notif.type == "message-chat").filter(notif => notif.lu == false).length)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleOpen = () => {
    if (user.id) {
      console.log(active)
      if (counterNotifs > 0) {
        axios
          .get(URL_BACK + '/put/notifications_lu/' + user.id + "/chat")
          .then((resNotifs) => {
            fetchNotifs();
          })
          .catch((err) => {
            console.log(err);
          });
      }
      setActive(!active)
    }
  };

  return (
    <div>
      {active === false ? (
        <div
          onClick={handleOpen}
          className="fixed bottom-4 right-4 bg-[#7CC474] p-6 border-2 rounded-full cursor-pointer text-white"
        >
          <FontAwesomeIcon className="h-8 w-8" icon={faComments} />
          {counterNotifs > 0 ? (
            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">{counterNotifs}</div>
          ) : null}
        </div>
      ) : (
        <div
          className={
            props.active === true
              ? 'fixed bottom-4 right-4  bg-[#7CC474] rounded border-2 z-50'
              : 'fixed bottom-4 right-4  bg-[#7CC474] rounded border-2 grid grid-cols-[240px,1fr] z-50'
          }
        >
          {' '}
          {props.active === true ? null : (
            <div className="flex flex-col border-r-2 flex-start overflow-y-auto w-60 h-500 max-h-500 py-2 px-1">
              <input
                type="text"
                placeholder="Rechercher un utilisateur"
                className="w-full mx-auto appearance-none border-2 border-gray-200 rounded-full 
          py-2 px-4 text-gray-700 leading-tight h-10 focus:outline-none 
           focus:border-[#7cc474] border-transparent w-full focus:ring-0"
                onChange={(e) => userListFilter(e.target.value)}
              />
              <ul className="text-center py-2 w-full ">{usersDisplayer()}</ul>
            </div>
          )}
          <div
            className={
              'border-l-2 h-500' + props.active === true ? 'absolute' : null
            }
          >
            <div className="relative h-[56px] flex items-center justify-center   bg-[#047C89]">
              {userToTalk.prenom ? (
                <div className="flex items-center justify-center">
                  <img
                    className="h-10 w-10 rounded-full mx-2"
                    src={userToTalk.img_profil}
                  />
                  <p className="font-bold text-white">
                    {userToTalk.prenom + ' ' + userToTalk.nom}{' '}
                  </p>
                </div>
              ) : null}

              <FontAwesomeIcon
                onClick={() => setActive(!active)}
                className="absolute right-2 my-auto w-6 h-6 text-white cursor-pointer mb-4"
                icon={faWindowMinimize}
              />
            </div>
            <ul className=" justify-around h-[392px] w-[300px] overflow-y-auto md:[overflow-anchor:auto]">
              {messagesDisplayer()}
              <div ref={messagesEndRef} />
            </ul>
            <form
              className="flex justify-around items-center w-full bg-[#047C89] h-[52px]"
              onSubmit={(e) => newMessageHandler(e)}
            >
              <input
                name="chat"
                type="text"
                id="input"
                className="border-2 border-gray-200 rounded-full 
                    py-2 px-4 text-gray-700 leading-tight h-10  focus:outline-none 
                     focus:border-[#7cc474] border-transparent w-[70%] focus:ring-0 `"
                max={255}
                onChange={(e) => setChat(e.target.value)}
              />
              <button
                type="submit"
                className="bg-[#7CC474] rounded-full h-10 w-10 flex justify-center items-center"
              >
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  className="h-5 w-5 m-auto text-white "
                />{' '}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
