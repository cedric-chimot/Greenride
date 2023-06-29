import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/FormComponents/Button';
import Input from '../components/FormComponents/Input';
import Notif from '../components/Notif';
import { URL_BACK } from '../constants/urls/urlBackEnd';

function FormInscription() {
  const validate = Yup.object().shape({
    nom: Yup.string()
      .max(15, '*Le nom ne peut excéder 15 caractères')
      .matches(/^[a-zA-Zà-ù\-]+$/, '*Le nom ne doit comporter que des lettres')
      .required('*Ce champ ne peut être vide'),
    prenom: Yup.string()
      .max(20, '*Le prénom ne peut excéder 20 caractères')
      .matches(
        /^[a-zA-Zà-ù\-]+$/,
        '*Le prénom ne doit comporter que des lettres'
      )
      .required('*Ce champ ne peut être vide'),
    email: Yup.string()
      .email('*Le mail est invalide !')
      .matches(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/, '*Le mail est invalide !')
      .required('*Ce champ ne peut être vide'),
    password: Yup.string()
      .min(8, '*Le mot de passe doit comporter 8 caractères minimum')
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+=\-{}[\]:;'"<>?/.,])(?!.*\s).{8,}$/,
        '*Le mot de passe doit comporter 1 chiffre, 1 majuscule et 1 caractère spécial'
      )
      .required('*Ce champ ne peut être vide'),
    cpassword: Yup.string()
      .oneOf(
        [Yup.ref('password'), null],
        '*Les mots de passe ne correspondent pas !'
      )
      .required('*Les mots de passe ne correspondent pas !'),
  });
  const [conditionsAccepted, setConditionsAccepted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [notifTheme, setNotifTheme] = useState(false);

  let navigate = useNavigate();
  let dateHandler = (date) => {
    let newDate = date;
    newDate =
      date.split('-')[2] + '-' + date.split('-')[1] + '-' + date.split('-')[0];
    return newDate;
  };

  return (
    <>
      <div className="container1 h-[84vh] flex bg-Teal">
        <div className="container2 w-2/3 flex flex-col text-center justify-center items-center">
          <div className="title">
            <h1 className="text-Whitesmoke font-bold">Inscription</h1>
          </div>
          <Formik
            initialValues={{
              nom: '',
              prenom: '',
              email: '',
              dateNaissance: '',
              password: '',
              cpassword: '',
            }}
            validationSchema={validate}
            onSubmit={(values) => {
              if (conditionsAccepted) {
                setIsSubmitted(false);
                axios
                  .get(URL_BACK + `/user/check-email/${values.email}`)
                  .then((res) => {
                    if (res.status === 200 && res.data === true) {
                      toast.error(
                        <CustomToast message="Cet email est déjà utilisé !" />,
                        {
                          position: toast.POSITION.BOTTOM_RIGHT,
                        }
                      );
                    } else {
                      let user = {
                        email: values.email,
                        plainPassword: values.password,
                        nom: values.nom,
                        prenom: values.prenom,
                        ville: '',
                        cp: 0,
                        adresse: '',
                        tokens: 50,
                        silence: '',
                        dateNaissance: dateHandler(values.dateNaissance),
                        idMusic: '/api/music/7',
                        avertissements: 0,
                        dateInscrit: new Date()
                          .toLocaleDateString()
                          .replaceAll('/', '-'),
                      };
                      axios.post(URL_BACK + '/api/users', user).then((res) => {
                        if (res.status === 201) {
                          toast.success(
                            <CustomToast message="Inscription réussie !" />,
                            {
                              position: toast.POSITION.BOTTOM_RIGHT,
                            }
                          );
                          navigate('/Login');
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
              } else {
                setIsSubmitted(true);
              }
            }}
          >
            <Form className="mt-12 w-full max-w-full relative">
              {notifTheme === 'alert-email' ? (
                <Notif theme={notifTheme} setNotifTheme={setNotifTheme} />
              ) : null}
              <div className="test flex flex-col justify-center items-center mr-32">
                <Input label="Nom :" name="nom" type="text" width="" />
                <Input label="Prénom :" name="prenom" type="text" width="" />
                <Input label="Email :" name="email" type="email" width="" />
                <Input
                  label="Date de naissance :"
                  name="dateNaissance"
                  type="date"
                  width=""
                />
                <Input
                  label="Mot de passe :"
                  name="password"
                  type="password"
                  width=""
                />
                <Input
                  label="Confirmer le mot de passe :"
                  name="cpassword"
                  type="password"
                  width=""
                />
              </div>
              <div className="flex justify-center items-center">
                <input
                  className={`checkbox mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem]
                    border-[0.125rem] border-solid outline-none ${
                      isSubmitted && !conditionsAccepted ? 'border-Red' : ''
                    }`}
                  type="checkbox"
                  value=""
                  onChange={(e) => setConditionsAccepted(e.target.checked)}
                />

                <label
                  className={`items-center text-Whitesmoke inline-block pl-[0.15rem] hover:cursor-pointer
                    ${isSubmitted && !conditionsAccepted ? 'text-Red' : ''}`}
                  htmlFor="conditions"
                >
                  En vous inscrivant, vous acceptez les{' '}
                  <span
                    className={`underline font-bold ${
                      isSubmitted && !conditionsAccepted ? 'text-Red' : ''
                    }`}
                  >
                    conditions d'utilisations
                  </span>
                </label>
              </div>
              <div className="btn-inscription my-4">
                <Button children="Inscription" disabled={!conditionsAccepted} />
              </div>
              <hr className="w-2/3 m-autoX" />
              <div className="text-Whitesmoke my-4">
                <p>Vous possédez déjà un compte ?</p>
              </div>
              <div className="btn-connexion">
                <NavLink to={'/Login'}>
                  <Button children="Connexion" />
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
    </>
  );
}

export default FormInscription;
