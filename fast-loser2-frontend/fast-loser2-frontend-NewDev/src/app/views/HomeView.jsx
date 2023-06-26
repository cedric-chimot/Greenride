import React from 'react';
import RegisterHomeView from '../components/Page/RegisterHomeView';
import UnregisteredHomeView from '../components/Page/UnregisteredHomeView';
import { useSelector } from 'react-redux';
import { isAdmin } from '../redux-store/authenticationSlice';

const HomeView = () => {
  const user = useSelector((state) => state.auth);
  const admin = useSelector(isAdmin);
  console.log(admin);
  return (
    <div>
      {user.isAuthenticated === true ? (
        <RegisterHomeView />
      ) : (
        <UnregisteredHomeView />
      )}
    </div>
  );
};

export default HomeView;
