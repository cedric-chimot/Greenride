import { Field, Form, Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import { signIn } from '../redux-store/authenticationSlice';
import { authenticate } from '../api/backend/account';
import axios from 'axios';
import { getPayloadToken } from '../services/tokenServices';
import { setUser } from '../redux-store/userSlice';
import Button from '../components/FormComponents/Button';
import Input from '../components/FormComponents/Input';
import { URL_BACK } from '../constants/urls/urlBackEnd';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import { GoogleLogin, GoogleLogout } from 'react-google-login'

/**
 * View/Page Login
 *
 * @author Peter Mollet
 */
const LoginView = () => {
  document.title = 'Connexion | Greenride';

  const [errorLog, setErrorLog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .email('*Veuillez entrer une adresse email valide')
      .matches(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/, '*Le mail est invalide !')
      .required('*Veuillez entrer votre adresse email'),
    password: Yup.string()
      .min(8, '*Le mot de passe doit comporter 8 caractères minimum')
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+=\-{}[\]:;'"<>?/.,])(?!.*\s).{8,}$/,
        '*Le mot de passe est incorrect'
      )
      .required('*Veuillez entrer votre mot de passe'),
  });

  const handleLogin = (values) => {
    authenticate(values)
      .then((res) => {
        if (res.status === 200 && res.data) {
          dispatch(signIn(res.data.token));
          const claims = getPayloadToken(res.data.token);
          const splitAt = claims.username.split('@');
          const name = splitAt[0];
          const domain = splitAt[1].split('.')[0];
          const ext = splitAt[1].split('.')[1];
          axios
            .get(URL_BACK + `/get/user_by_email/${name}/${domain}/${ext}`)
            .then((res) => {
              if (res.data.length === 0) {
                setErrorLog(true);
              } else {
                dispatch(setUser(res.data[0]));
                if (claims.roles.some((role) => role === 'ROLE_ADMIN')) {
                  window.location.replace('http://localhost:5173/Admin');
                } else {
                  navigate('/');
                }
              }
            });
        }
      })
      .catch(() => setErrorLog(true));
  };

  const responseGoogle = (response) => {
    console.log(response);
  }

  const onSuccessGoogle = (response) => {
    console.log(response);
    axios
      .get(URL_BACK + `/user/check-email/${response.profileObj.email}`)
      .then((res) => {
        if (res.status === 200 && res.data === true) {
          const credentials = {
            username: response.profileObj.email,
            password: response.profileObj.googleId
          }
          handleLogin(credentials)
        } else {
          let user = {
            email: response.profileObj.email,
            plainPassword: response.profileObj.googleId,
            nom: response.profileObj.familyName,
            prenom: response.profileObj.givenName,
            ville: '',
            cp: 0,
            adresse: '',
            tokens: 50,
            silence: '',
            dateNaissance: "",
            idMusic: '/api/music/1',
            avertissements: 0,
            dateInscrit: new Date()
              .toLocaleDateString()
              .replaceAll('/', '-'),
            imgProfil: response.profileObj.imageUrl,
            role: ["ROLE_USER"],
            isGoogleUser: true
          };
          axios.post(URL_BACK + '/api/users', user).then((res) => {
            if (res.status === 201) {
              const credentials = {
                username: response.profileObj.email,
                password: response.profileObj.googleId
              }
              handleLogin(credentials)
            } else {
              // pour le debug
              toast.error(
                <CustomToast message="Inscription échouée, veuillez réessayer." />,
                {
                  position: toast.POSITION.BOTTOM_RIGHT,
                }
              );
              alert(res);
            }
          });
        }
      })
      .catch((err) => {
        console.error(err);
        // alert('Cet email existe déjà !');
      });
  }

  return (
    <div className="container1 h-[84vh] flex bg-Teal">
      <div className="container2 w-2/3 flex flex-col text-center items-center justify-center">
        <div className="title mb-12">
          <h1 className="text-Whitesmoke font-bold">Connexion</h1>
        </div>
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            /*signInWithEmailAndPassword(auth, values.username, values.password)
              .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
              });*/
            handleLogin(values)
          }
          }
        >
          <Form className="mt-12 w-full max-w-full">
            <div className="test flex flex-col justify-center items-center mr-32">
              <Input label="Email :" name="username" type="email" width="" />
              <Input
                label="Mot de passe :"
                name="password"
                type="password"
                width=""
              />
            </div>
            <div className="btn-inscription mt-8">
              <Button children="Connexion" width="mb-4" />
              <GoogleLogin
                clientId="75832900698-3a72do8k1bm3ov6163hj3fvkndnniao3.apps.googleusercontent.com"
                buttonText="Se connecter avec Google"
                onSuccess={onSuccessGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
              />
              <div className=" mt-4 mb-8 flex items-center justify-center">
                <NavLink to="/forgot-password">
                  <span className="cursor-pointer text-Whitesmoke font-bold ">
                    Vous avez oublié votre mot de passe ?
                  </span>
                </NavLink>
              </div>
              <hr className="w-2/3 m-autoX" />
            </div>
            <p className=" font-bold mt-8 mb-4 text-Whitesmoke">
              Vous n'avez pas encore de compte ?
            </p>
            <div className="btn-connexion">
              <NavLink to={'/Inscription'}>
                <Button children="Inscription" />
              </NavLink>
            </div>
          </Form>
        </Formik>
      </div>
      <div className="w-1/3">
        <img
          src="src/app/assets/img/login.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default LoginView;
