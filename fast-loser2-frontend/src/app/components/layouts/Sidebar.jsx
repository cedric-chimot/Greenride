import React, { useState, useEffect } from 'react';
import {
  RiDashboard2Line,
  RiUser3Line,
  RiMapPinLine,
  RiAlertLine,
  RiAdminLine,
} from 'react-icons/ri';
import { FaRegEnvelope } from 'react-icons/fa';
import { MdQueryStats } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {
  isAdmin,
  selectIsLogged,
  signOut,
} from '../../redux-store/authenticationSlice';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const storedItem = localStorage.getItem('selectedItem');
  const [selectedItem, setSelectedItem] = useState(storedItem || 'Dashboard');

  useEffect(() => {
    // Mettre à jour la valeur de selectedItem en fonction de l'URL actuelle
    const path = location.pathname;
    if (path === '/Admin') {
      setSelectedItem('Dashboard');
    } else if (path === '/Admin/manage/users') {
      setSelectedItem('Utilisateurs');
    } else if (path === '/Admin/manage/rides') {
      setSelectedItem('Trajets');
    } else if (path === '/Admin/manage/messages') {
      setSelectedItem('Messages');
    } else if (path === '/Admin/manage/alerts') {
      setSelectedItem('Alertes');
    } else if (path === '/Admin/manage/stats') {
      setSelectedItem('Statistiques');
    } else if (path === '/Admin/manage/admin') {
      setSelectedItem('Admin');
    }
  }, [location]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    localStorage.setItem('selectedItem', item);
  };

  return (
    <div className="flex">
      <div className="bg-Teal h-[90vh] p-1 pt-4">
        <ul className="w-56">
          <li
            className={`flex items-center text-center text-Whitesmoke z-10 relative justify-between px-2 py-2 mb-2 border rounded ${
              selectedItem === 'Dashboard' && 'bg-Teal w-64'
            }`}
            onClick={() => {
              navigate('/Admin');
              handleItemClick('Dashboard');
            }}
          >
            <button className="flex text-center items-center text-xl">
              Tableau de bord
            </button>
            <RiDashboard2Line className="flex text-xl ml-2 flex-right" />
          </li>
          <li
            className={`flex items-center text-center text-Whitesmoke z-10 relative justify-between px-2 py-2 mb-2 border rounded ${
              selectedItem === 'Utilisateurs' && 'bg-Teal w-64'
            }`}
            onClick={() => {
              navigate('/Admin/manage/users');
              handleItemClick('Utilisateurs');
            }}
          >
            <button className="flex text-center items-center text-Whitesmoke text-xl">
              Utilisateurs
            </button>
            <RiUser3Line className="flex text-xl ml-2 flex-right" />
          </li>
          <li
            className={`flex items-center text-center text-Whitesmoke z-10 relative justify-between px-2 py-2 mb-2 border rounded ${
              selectedItem === 'Trajets' && 'bg-Teal w-64'
            }`}
            onClick={() => {
              navigate('/Admin/manage/rides');
              handleItemClick('Trajets');
            }}
          >
            <button className="flex text-center items-center text-Whitesmoke text-xl">
              Trajets
            </button>
            <RiMapPinLine className="flex text-xl ml-2 flex-right" />
          </li>
          <li
            className={`flex items-center text-center text-Whitesmoke z-10 relative justify-between px-2 py-2 mb-2 border rounded ${
              selectedItem === 'Messages' && 'bg-Teal w-64'
            }`}
            onClick={() => {
              navigate('/Admin/manage/messages');
              handleItemClick('Messages');
            }}
          >
            <button className="flex text-center items-center text-Whitesmoke text-xl">
              Messages
            </button>
            <FaRegEnvelope className="flex text-xl ml-2 flex-right" />
          </li>
          <li
            className={`flex items-center text-center text-Whitesmoke z-10 relative justify-between px-2 py-2 mb-2 border rounded ${
              selectedItem === 'Alertes' && 'bg-Teal w-64'
            }`}
            onClick={() => {
              navigate('/Admin/manage/alerts');
              handleItemClick('Alertes');
            }}
          >
            <button className="flex text-center items-center text-Whitesmoke text-xl">
              Alertes
            </button>
            <RiAlertLine className="flex text-xl ml-2 flex-right" />
          </li>
          <li
            className={`flex items-center text-center text-Whitesmoke z-10 relative justify-between px-2 py-2 mb-2 border rounded ${
              selectedItem === 'Statistiques' && 'bg-Teal w-64'
            }`}
            onClick={() => {
              navigate('/statistiques');
              handleItemClick('Statistiques');
            }}
          >
            <button className="flex text-center items-center text-Whitesmoke text-xl">
              Statistiques
            </button>
            <MdQueryStats className="flex text-xl ml-2 flex-right" />
          </li>
          <li
            className={`flex items-center text-center text-Whitesmoke z-10 relative justify-between px-2 py-2 mb-2 border rounded ${
              selectedItem === 'Admin' && 'bg-Teal w-64'
            }`}
            onClick={() => {
              navigate('/Admin/manage/admins');
              handleItemClick('Admin');
            }}
          >
            <button className="flex text-center items-center text-Whitesmoke text-xl">
              Admin
            </button>
            <RiAdminLine className="flex text-xl ml-2 flex-right" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
