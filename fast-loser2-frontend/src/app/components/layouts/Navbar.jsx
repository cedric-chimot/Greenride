import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLogged, signOut, isAdmin } from '../../redux-store/authenticationSlice';
import { clearUser } from '../../redux-store/userSlice';
import NotificationDropdown from '../Popups/NotifDropdown';
import { GoogleLogin, GoogleLogout } from 'react-google-login'

const Navbar = () => {

  const isLogged = useSelector((state) => state.auth);
  const currentUser = useSelector((state) => state.user);
  const Admin = useSelector(isAdmin);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const responseGoogle = (response) => {
    console.log("fail : " + response);
  }

  const successGoogle = (response) => {
    console.log("success" + response);
    dispatch(signOut(), clearUser(), window.location.replace('http://localhost:5173/'))
  }

  return (
    <div className=" items-center bg-[#04ADBF]">
      <div className="flex items-center justify-around h-[8vh] w-[95%] m-autoX">

        <NavLink to="/">
          <img
            className="w-3/4"
            src="/src/app/assets/img/Rectangle54.png"
            alt="logo"
          />
        </NavLink>
        <div className="flex justify-around w-5/12 ">
          <NavLink
            className="text-xl font-bold font-roboto text-white hover:text-[#b2ffa6] my-auto"
            to="/"
          >
            Accueil
          </NavLink>

          <NavLink
            className="text-xl font-bold font-roboto text-white hover:text-[#b2ffa6] my-auto"
            to="/a-propos"
          >
            A propos
          </NavLink>

          {isLogged.isAuthenticated === true ? (
            <NavLink
              className="text-xl font-bold font-roboto text-white hover:text-[#b2ffa6] my-auto"
              to="/ride/post"
            >
              Proposer trajet
            </NavLink>
          ) : (
            <NavLink
              className="hidden text-xl font-bold font-roboto text-white hover:text-[#b2ffa6] my-auto"
              to="/login"
            >
              Proposer trajet
            </NavLink>
          )}

          {isLogged.isAuthenticated === true ? (
            <NavLink
              className="text-xl font-bold font-roboto text-white hover:text-[#b2ffa6] my-auto"
              to="/annonces"
            >
              Annonces
            </NavLink>
          ) : (
            <NavLink
              className="hidden text-xl font-bold font-roboto text-white hover:text-[#b2ffa6] my-auto"
              to="/annonces"
            >
              Annonces
            </NavLink>
          )}

          <NavLink
            className="text-xl font-bold font-roboto text-white hover:text-[#b2ffa6] my-auto"
            to="/ride/search"
          >
            Recherche
          </NavLink>

          {isLogged.isAuthenticated === true ? (
            <NavLink
              className="text-xl font-bold font-roboto text-white hover:text-[#b2ffa6] my-auto"
              to="/Contact"
            >
              Contact
            </NavLink>
          ) : (
            <NavLink
              className="text-xl font-bold font-roboto text-white hover:text-[#b2ffa6] my-auto"
              to="/Login"
            >
              Contact
            </NavLink>
          )}
        </div>

        {isLogged.isAuthenticated === true ? (
          <div>
            {Admin ? (
              <button
                className="font-bold px-4 py-2 rounded-l-xl text-white hover:bg-[#56b448] m-0 transition bg-[#7cc474]"
                onClick={() => window.location.replace('http://localhost:5173/Admin')}
              >
                Tableau de bord
              </button>
            ) : (
              <button
                className="font-bold px-4 py-2 rounded-l-xl text-white hover:bg-[#56b448] m-0 transition bg-[#7cc474]"
                onClick={() => navigate('/Dashboard')}
              >
                Mon profil
              </button>
            )}
            {currentUser.isGoogleUser === true ? (
              <GoogleLogout
                clientId="75832900698-3a72do8k1bm3ov6163hj3fvkndnniao3.apps.googleusercontent.com"
                render={renderProps => (
                  <button className='font-bold px-4 py-2 rounded-r-xl bg-neutral-50 hover:bg-neutral-200 transition' onClick={renderProps.onClick} disabled={renderProps.disabled}>Déconnexion</button>
                )}
                onLogoutSuccess={successGoogle}
                onFailure={responseGoogle}
              >
              </GoogleLogout>
            ) : (
              <button
                className="font-bold px-4 py-2 rounded-r-xl bg-neutral-50 hover:bg-neutral-200 transition font-bold"
                onClick={() => dispatch(signOut(), clearUser(), window.location.replace('http://localhost:5173/'))}
              >
                Déconnexion
              </button>
            )}
            {/*<button type="button" class="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"> <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" fill="white"></path> </svg>
              <span class="sr-only">Notifications</span>
              {notifications > 0 ? (
                <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">{notifications != 0 ? notifications : null}</div>
              ) : null}       
            </button>*/}
            <NotificationDropdown />
          </div>
        ) : (
          <div className="shadow-xl">
            <NavLink to={'/Login'}>
              <button className="buttonLogin font-bold px-4 py-2 rounded-l-xl text-white hover:bg-[#56b448] m-0 transition bg-[#7cc474]">
                Se connecter
              </button>
            </NavLink>

            <NavLink to={'Inscription'}>
              <button className="buttonRegister px-4 py-2 rounded-r-xl bg-neutral-50 hover:bg-neutral-200 transition font-bold">
                S'inscrire
              </button>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;