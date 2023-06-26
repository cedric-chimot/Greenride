import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { URL_HOME, URL_LOGIN } from '../constants/urls/urlFrontEnd';
import { selectHasRole, selectIsLogged } from '../redux-store/authenticationSlice';

/**
 * Component PriveRoute
 * To handle private's route, that needs authentication
 * Check also if the role is authorized to access the route
 *
 * @example
 *          <PrivateRoute path={URL_HOME} element={HomeView} />
 *          <PrivateRoute path={URL_ADMIN_HOME} element={AdminHomeView} roles={[ROLE_ADMIN]} />
 * @author Peter Mollet
 */
export const PrivateRoute = ({ children, roles }) => {
    const location = useLocation();
    const isAuthenticated = useSelector(selectIsLogged);
    const hasRole = useSelector((state) => selectHasRole(state, roles));
    if (!isAuthenticated)
        return <Navigate replace to={URL_LOGIN} state={{ from: location }} />;

    if (roles && !hasRole) return <Navigate replace to={{ pathname: URL_HOME }} />;

    return children;
};
