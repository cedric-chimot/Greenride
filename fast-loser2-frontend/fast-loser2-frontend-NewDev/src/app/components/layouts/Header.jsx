import React from 'react';
import { RxAvatar } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import {
  isAdmin,
  selectIsLogged,
  signOut,
} from '../../redux-store/authenticationSlice';
import { clearUser } from '../../redux-store/userSlice';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const Navigate = useNavigate();
  const isLoggued = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const admin = useSelector(isAdmin);

  if (!admin) return null;
  //console.log(admin);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-row w-full bg-Teal h-[10vh] text-center items-center">
      <button
          className="font-bold px-4 py-2 ml-2 rounded-l-xl text-white transition bg-Moonstone"
          onClick={() => window.location.replace('http://localhost:5173/')}
      >
        Accueil
      </button>
      <button
        className="px-4 py-2 mr-4 rounded-r-xl bg-MintGreen transition font-bold"
        onClick={() => {
          dispatch(signOut());
          dispatch(clearUser());
          window.location.replace('http://localhost:5173/Login');
        }}
      >
        Déconnexion
      </button>
      <div className="text-Whitesmoke text-3xl">
        {isLoggued.isAuthenticated === true ? (
          <div className="">Bonjour {user.prenom} !</div>
        ) : (
          Navigate('/Login')
        )}
      </div>
    </div>
  );
};

export default Header;
