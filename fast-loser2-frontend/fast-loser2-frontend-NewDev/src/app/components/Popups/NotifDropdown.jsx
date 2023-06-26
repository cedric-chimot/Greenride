import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from "axios";
import { URL_BACK } from '../../constants/urls/urlBackEnd';
import { useSelector } from 'react-redux';

const NotificationDropdown = () => {

  const currentUser = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [counterNotifs, setCounterNotifs] = useState(0);

  async function fetchNotifs() {
    await axios
      .get(URL_BACK + '/get/notifications/' + currentUser.id)
      .then((resNotifs) => {
        setNotifications(resNotifs.data.filter(notif => notif.type != "message-chat"));
        setCounterNotifs(resNotifs.data.filter(notif => notif.type != "message-chat").filter(notif => notif.lu == false).length)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (currentUser.id) {

      fetchNotifs();

      const url = new URL("https://localhost/.well-known/mercure");
      url.searchParams.append('topic', 'https://localhost/notification/' + currentUser.id);

      const eventSource = new EventSource(url, {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOlsiKiJdfX0.a8cjcSRUAcHdnGNMKifA4BK5epRXxQI0UBp2XpNrBdw',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Methods': '*',
        }
      });
      function getRealtimeData(data) {
        console.log(isOpen)
        fetchNotifs();
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
  }, [currentUser]);

  const toggleDropdown = () => {
    if (currentUser.id) {
      if (counterNotifs > 0) {
        axios
          .get(URL_BACK + '/put/notifications_lu/' + currentUser.id + "/notifications")
          .then((resNotifs) => {
            fetchNotifs();
          })
          .catch((err) => {
            console.log(err);
          });
      }
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      <button type="button" className="relative inline-flex items-center p-3 ml-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={toggleDropdown}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"> <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" fill="white"></path> </svg>
        <span className="sr-only">Notifications</span>
        {notifications != undefined ? (
          counterNotifs > 0 ? (
            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">{counterNotifs > 0 ? counterNotifs : null}</div>
          ) : null
        ) : null}

      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 max-h-72 bg-white rounded-md shadow-lg mr-6 z-10 overflow-y-scroll scrollbar-thumb-Teal scrollbar-track-[#04adbf] scrollbar-thin border-8 border-r-0 border-[#04adbf]">
          {notifications.length > 0 && notifications != undefined ? (
            notifications.map((notif) => (
              <span className={`block px-4 py-2 text-gray-800 hover:bg-gray-200 border-b-4 border-b-[#04adbf]${notif.lu ? '' : ' bg-blue'}`}>
                {notif.content}.
                {notif.type == 'validate-reservation' ? (
                  <NavLink to={`/ride/infos/${notif.trajetId.split('/')[3]}`} target='_blank'><span className='underline'>Voir le trajet</span></NavLink>
                ) : null}
                {notif.type == 'request-reservation' ? (
                  <NavLink to={`/profils/${notif.userId.split('/')[3]}`} target='_blank'><span className='underline'>Voir le profil</span></NavLink>
                ) : null}
              </span>
            ))
          ) : (
            <span className="block px-4 py-2 text-gray-800 hover:bg-gray-200 border-b-4 border-b-[#04adbf]">
              Aucunes Notifications
            </span>
          )}

        </div>
      )}
    </>
  );
};

export default NotificationDropdown;