import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLogged } from './../../redux-store/authenticationSlice';
import {
  URL_HOME,
  URL_LOGIN,
  URL_REGISTER,
} from '../../constants/urls/urlFrontEnd';

const Footer = () => {
  return (
    <div>
        <div className="flex flex-row items-center justify-evenly min-h-[8vh] text-white bg-[#04adbf] font-bold ">
            <div>
                <ul className="m-0 p-0 list-none  items-center">
                    <li>Mentions légales</li>
                    <li>CGU</li>
                </ul>
            </div>
            <div className="flex ">
                <img
                    className="mr-4"
                    src="/src/app/assets/img/facebook.png"
                    alt="facebook"
                />
                <img
                    className="mr-4"
                    src="/src/app/assets/img/mdi_twitter.png"
                    alt="facebook"
                />
                <img
                    className="mr-4"
                    src="/src/app/assets/img/insta.png"
                    alt="facebook"
                />
            </div>
            <div>
                <ul>
                    <li>Nous rejoindre</li>
                    <NavLink to={"/Contact"} className="hover:text-[#b2ffa6]">
                        <li>Contact</li>
                    </NavLink>
                </ul>
            </div>
        </div>
    </div>
            
  );
};

export default Footer;
