import React, { useEffect, useState } from 'react';
import { Route, Routes as RoutesContainer } from 'react-router-dom';

import { ROLE_ADMIN } from '../constants/rolesConstant';
import * as URL from '../constants/urls/urlFrontEnd';
import AdminHomeView from '../views/AdminHomeView';
import HomeView from '../views/HomeView';
import LoginView from '../views/LoginView';
import RidePostView from '../views/RidePostView';
import RideSearch from '../views/RideSearchView';
import { PrivateRoute } from './PrivateRoute';
import ModificationView from '../views/ModificationView';
import AproposView from '../views/AproposView';
import InscriptionView from '../views/InscriptionView';
import ContactView from '../views/ContactView';
import AdminAlert from '../views/AdminAlert';
import AdminUserView from '../views/AdminUserView';
import AdminAdminView from '../views/AdminAdminView';
import ResultRideSearch from '../views/ResultRideSearch';
import RideInfosView from '../views/RideInfosView';
import Dashboard from '../views/Dashboard';
import VoirprofilView from '../views/VoirprofilView';
import Adminmodification from '../views/AdminmodificationView';
import AdminGestionView from '../views/AdminGestionView';
import AdminRide from '../views/AdminRide';
import AddCarView from '../views/AddCarView';
import SellTokensView from '../views/SellTokensView';
import AnnoncesView from '../views/AnnoncesView';
import RideHistoryView from '../views/RideHistoryView';
import { useSelector } from 'react-redux';
import MakeAlertView from '../views/MakeAlertView';
import AdminContactView from '../views/AdminContactView';
import PasswordView from '../views/PasswordView';
import Stats from '../views/Stats';

/**
 * Routes of the application
 * with public and private route
 *
 * @author Peter Mollet
 */
const Routes = () => {
  const user = useSelector((state) => state.user);
  let url = window.location.href;
  const [ban, setBan] = useState(false);

  useEffect(() => {
    if (Number(user.date_unban) > Number(Date.now())) {
      console.log(Number(user.date_unban), Number(Date.now()));
      setBan(true);
    }
  }, [user, url]);

  const banDisplayer = () => {
    if (ban === true) {
      let unban = new Date(Number(user.date_unban)).toLocaleDateString('fr-FR');
      console.log(unban);
      return (
        <div className="h-[84vh] bg-blueBg flex items-center">
          <div className="h-96 w-96 bg-Moonstone m-auto p-12 flex items-center rounded">
            <p className="text-2xl text-white text-center">
              Vous avez été banni du site jusqu'au {unban}{' '}
            </p>
          </div>
        </div>
      );
    } else
      return (
        <RoutesContainer>
          <Route index element={<HomeView />} />
          <Route
            path="Admin"
            element={
              <PrivateRoute roles={[ROLE_ADMIN]}>
                <AdminHomeView />
              </PrivateRoute>
            }
          />
          <Route path="Modifier-profil" element={<ModificationView />} />
          <Route path="a-propos" element={<AproposView />} />
          <Route path="Inscription" element={<InscriptionView />} />
          <Route path={'/ride/post'} element={<RidePostView />} />
          <Route path={'/ride/search'} element={<RideSearch />} />
          <Route path={'/Login'} element={<LoginView />} />
          <Route path={'/Contact'} element={<ContactView />} />
          <Route path={'/Admin/alert/:id'} element={<AdminAlert />} />
          <Route path={'/Admin/user/:id'} element={<AdminUserView />} />
          <Route path={'/Admin/admin/:id'} element={<AdminAdminView />} />
          <Route path={'/Admin/manage/users'} element={<AdminGestionView />} />
          <Route path={'/Admin/manage/rides'} element={<AdminGestionView />} />
          <Route path={'/Admin/manage/alerts'} element={<AdminGestionView />} />
          <Route path={'/Admin/manage/admins'} element={<AdminGestionView />} />
          <Route
            path={'/Admin/manage/messages'}
            element={<AdminGestionView />}
          />
          <Route path={'/Admin/ride/:id'} element={<AdminRide />} />
          <Route path={'/Admin/message/:id'} element={<AdminContactView />} />
          <Route
            path={'/search/results/:depart/:destination/:date/:hour'}
            element={<ResultRideSearch />}
          />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="/make/alert/:id" element={<MakeAlertView />} />
          <Route path={'/profils/:id'} element={<VoirprofilView />} />
          <Route path={'/ride/infos/:id'} element={<RideInfosView />} />
          <Route
            path={'/Admin/ModificationAdmin'}
            element={<Adminmodification />}
          />
          <Route path="addCar" element={<AddCarView />} />
          <Route path="/statistiques" element={<Stats />} />
          <Route path="sellTokens" element={<SellTokensView />} />
          <Route path="annonces" element={<AnnoncesView />} />
          <Route path="historique" element={<RideHistoryView />} />
          <Route path="/forgot-password" element={<PasswordView />} />
        </RoutesContainer>
      );
  };
  return <div>{banDisplayer()}</div>;
};

export default Routes;
