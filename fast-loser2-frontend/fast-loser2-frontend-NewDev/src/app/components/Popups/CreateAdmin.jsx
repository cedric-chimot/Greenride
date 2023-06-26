import axios from 'axios';
import React, { useState } from 'react';
import { URL_BACK } from '../../constants/urls/urlBackEnd';
import { useSelector } from 'react-redux';
import { TextField } from '../../components/Page/TextField';
import InputT from '../InputT';
import { Form, Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const CreateAdmin = (props) => {
  const [popUpActive, setPopUpActive] = useState(false);

  const navigate = useNavigate();

  const validate = Yup.object().shape({
    email: Yup.string()
      .email('*Le mail est invalide !')
      .matches(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/, '*Le mail est invalide !')
      .required('*Ce champ ne peut être vide'),
    password: Yup.string()
      .min(8, '*Le mot de passe doit comporter 8 caractères minimum')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        '*Le mot de passe doit comporter 1 chiffre, 1 majuscule et 1 caractère spécial'
      )
      .required('*Ce champ ne peut être vide'),
  });

  const createHandler = (values) => {
    let admin = {
      email: values.email,
      plainPassword: values.password,
      nom: '',
      prenom: 'Admin',
      ville: '',
      cp: 0,
      adresse: '',
      tokens: 0,
      silence: '',
      dateNaissance: '',
      idMusic: '/api/music/1',
      avertissements: 0,
      roles: ['ROLE_ADMIN'],
      dateInscrit: new Date().toLocaleDateString().replaceAll('/', '-'),
    };
    axios.post(URL_BACK + '/api/users', admin).then((res) => {
      if (res.status === 201 && res.data) {
        navigate('/Admin/manage/admins');
        props.active(false);
      } else {
        // pour le debug
        alert(res);
      }
    });
  };

  return (
    <div className="w-96 bg-blueBg text-white text-xl  font-bold rounded border-2 absolute top-1/2 left-1/2 translate-x-50 translate-y-80 z-20">
        <FontAwesomeIcon
            icon={faXmark}
            className="absolute right-[10px] top-[5px] cursor-pointer"
            onClick={() => props.active(false)}
        />
        <div className="px-8 py-6">
            <h5 className="text-center">Créer un administrateur</h5>
            <Formik
                initialValues={{
                email: '',
                password: '',
                }}
                validationSchema={validate}
                onSubmit={(values) => createHandler(values)}
            >
                <Form className="mt-6 w-full max-w-full relative text-left">
                    <div className="my-4">
                        <div className='py-4'>
                            <label>Email :</label>
                        </div>
                        <div>
                            <InputT name="email" type="email" />
                            <TextField name="email" />
                        </div>
                    </div>
                    <div className="my-4">
                        <div className='py-4'>
                            <label>Mot de passe :</label>
                        </div>
                        <div>
                            <InputT name="password" type="text" />
                            <TextField name="password" />
                        </div>
                    </div>
                    <div className="flex justify-between mt-8">
                        <button
                            className="border-2 py-1 px-3 rounded text-white bg-[#7FC473] hover:bg-[#56B448] cursor-pointer"
                            type="submit"
                        >
                            Confirmer
                        </button>
                        <button
                            className="border-2 py-1 px-3 rounded text-white bg-[#7FC473] hover:bg-red-700 cursor-pointer"
                            onClick={() => props.active(false)}
                        >
                            Annuler
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    </div>
  );
};

export default CreateAdmin;
