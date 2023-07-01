import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/layouts/Navbar';
import {
  isAdmin,
  selectIsLogged,
  signIn,
  signOut,
} from './redux-store/authenticationSlice';
import { setUser, clearUser } from './redux-store/userSlice';
import Routes from './routes/Routes';
import {
  getToken,
  getPayloadToken,
  getUserService,
} from './services/tokenServices';
import axios from 'axios';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import Sidebar from './components/layouts/Sidebar';
import { URL_BACK } from "./constants/urls/urlBackEnd";

import { gapi } from 'gapi-script'

const contextClass = {
  success: 'bg-green-600',
  error: 'bg-red-600',
  info: 'bg-blue-600',
  warning: 'bg-yellow-500',
  default: 'bg-indigo-600',
  dark: 'bg-white-600 font-gray-300',
};

function IdleTimerCustom() {
  return null;
}

/**
 * Component RouteWithNavigation
 * To create the structure of the application (nav bar, routes, toast, etc...)
 *
 * @author Peter Mollet
 */
const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [ban, setBan] = useState(false);
  const isLogged = useSelector(selectIsLogged);
  const url = window.location.href;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const stateActions = () => {
    dispatch(signOut());
    dispatch(clearUser());
    window.location.replace('http://localhost:5173/');
  };

  useEffect(() => {
   function start() {
    gapi.auth2.init({
      clientId: "75832900698-3a72do8k1bm3ov6163hj3fvkndnniao3.apps.googleusercontent.com",
      scope: ""
    })
   };
   gapi.load('client:auth2', start);
  }, [])
  

  useEffect(() => {
    const userToken = getUserService();
    if (userToken) dispatch(setUser(userToken));
    const token = getToken();
    if (token) {
      dispatch(signIn(token));
      const claims = getPayloadToken(token);
      let splitAt = claims.username.split('@');
      let name = splitAt[0];
      let domain = splitAt[1].split('.')[0];
      let ext = splitAt[1].split('.')[1];
      axios
        .get(
          URL_BACK + `/get/user_by_email/${name}/${domain}/${ext}`
        )
        .then((res) => {
          dispatch(setUser(res.data[0]));
        });
    }
    setIsLogin(false);
  }, []);

  useEffect(() => {
    if (Number(user.date_unban) > Number(Date.now())) {
      setBan(true);
    }
  }, [user]);

  if (isLogin) return null;

  const banDisplayer = () => {
    if (ban) {
      let unban = new Date(Number(user.date_unban)).toLocaleDateString('fr-FR');
      return (
        <div className="h-[100vh] bg-blueBg flex items-center">
          <div className="h-96 w-96 bg-Moonstone m-auto p-12 flex flex-col justify-center items-center rounded">
            <p className="text-2xl text-white text-center">
              Vous avez été banni du site jusqu'au {unban}{' '}
            </p>
            <button
              className="font-bold px-4 py-2 rounded-xl text-white hover:bg-[#56b448] mt-8 transition bg-[#7cc474]"
              onClick={() => stateActions()}
            >
              Déconnexion
            </button>
          </div>
        </div>
      );
    } else if (isAdmin && url.includes('Admin') && ban === false) {
      return (
        <div>
          <Header />
          <div className="flex">
            <Sidebar />
            <main className="h-[90vh] w-full">{<Routes />}</main>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Navbar />
          <main>{<Routes />}</main>
          <Footer />
          <ToastContainer
            toastClassName={({ type }) =>
              contextClass[type || 'default'] +
              ' relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer'
            }
            bodyClassName={() => 'text-sm font-white font-med block p-3'}
            position="bottom-left"
            autoClose={3000}
          />
        </div>
      );
    }
  };

  return (
    <BrowserRouter>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
      />
      <div className="flex h-full cursor-default relative flex-col bg-gray-100">
        {banDisplayer()}
      </div>
    </BrowserRouter>
  );
};

export default App;
