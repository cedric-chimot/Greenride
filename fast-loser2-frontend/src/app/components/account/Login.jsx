import { LockClosedIcon } from '@heroicons/react/solid';
import { Field, Form, Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, NavLink } from 'react-router-dom';

import { URL_HOME } from '../../constants/urls/urlFrontEnd';
import { signIn } from '../../redux-store/authenticationSlice';
import { authenticate } from './../../api/backend/account';
import axios from 'axios';
import { getPayloadToken } from '../../services/tokenServices';
import jwtDecode from 'jwt-decode';
import { setUser } from '../../redux-store/userSlice';

/**
 * Component Login
 *
 * @author Peter Mollet
 */
const Login = () => {
  const [errorLog, setErrorLog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (values) => {
    authenticate(values)
      .then((res) => {
        if (res.status === 200 && res.data) {
          const claims = getPayloadToken(res.data.token);
          axios
            .get(`https://127.0.0.1:8000/user/${claims.username}`)
            .then((res) => dispatch(setUser(res.data)));
          dispatch(signIn(res.data.token));
          navigate('/');
        }
      })
      .catch(() => setErrorLog(true));
  };

  // let loginHandler = (values) => {
  //   try {
  //     axios.post('https://127.0.0.1:8000/api/login', values).then((res) => {
  //       if (res.status === 200) {
  //         console.log(res.data);
  //         // navigate('/');
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="flex flex-col gap-4 h-full">
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={(values) => console.log('lol')}
      >
        <Form className="flex flex-col justify-around h-full ">
          <div className="flex gap-3 items-center ">
            <label className="w-2/6 text-Whitesmoke">Email :</label>
            <Field
              className={`w-4/6 rounded-lg py-[0.32rem]`}
              type="text"
              name="username"
              autoComplete="off"
            />
          </div>
          <div className="flex gap-3 items-center">
            <label className="w-2/6 text-Whitesmoke">Mot de passe :</label>
            <Field
              className={`w-4/6 rounded-lg py-[0.32rem]`}
              type="password"
              name="password"
              autoComplete="off"
            />
          </div>

          <div className="flex items-center justify-center">
            <div className="text-sm">
              <Link to="/forgot-password">
                <span className="cursor-pointer text-white  font-bold text-lg">
                  Vous avez oublié votre mot de passe ?
                </span>
              </Link>
            </div>
          </div>

          <div className="btn-inscription">
            <input
              className="bg-Mantis  text-Whitesmoke px-32 py-4 font-bold rounded-lg"
              type="submit"
            >
              Connexion
            </input>
            {/* {errorLog && (
              <div className="flex justify-center">
                <small className="text-sm font-bold text-red-800">
                  Email ou mot de passe incorrect(s)
                </small>
              </div>
            )} */}
          </div>
          <hr className="w-full mt-4" />

          <p className="cursor-pointer text-white  font-bold text-lg text-center">
            Vous n'avez pas encore de compte ?
          </p>
          <div className="btn-connexion">
            <NavLink to={'/Inscription'}>
              <button className="bg-Mantis text-Whitesmoke px-32 py-4 font-bold rounded-lg">
                Inscription
              </button>
            </NavLink>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
