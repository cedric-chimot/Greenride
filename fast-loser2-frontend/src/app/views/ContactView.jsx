import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField } from '../components/Page/TextField';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/FormComponents/Button';
import { Input } from '../components/FormComponents/Input';
import { URL_BACK } from '../constants/urls/urlBackEnd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomToast from '../components/toast/CustomToast';

function FormContact() {
  const currentUser = useSelector((state) => state.user);
  const validate = Yup.object().shape({
    objet: Yup.string()
      .max(25, "*L'objet ne peut excéder 25 caractères")
      .matches(/^[a-zA-Zà-ù0-9\- ]+$/, "*L'objet est invalide")
      .required('*Ce champ ne peut être vide'),
    message: Yup.string()
      .min(1, '*Ce champ ne peut être vide')
      .max(500, '*Le message ne peut dépasser 500 caractères !')
      .required('*Ce champ ne peut être vide'),
  });

  let navigate = useNavigate();

  return (
    <div className="flex flex-col h-[84vh] bg-Teal items-center ">
      <div className="title mt-8 mb-4">
        <h1 className="text-Whitesmoke font-bold">Contact</h1>
      </div>
      <div className="flex box-border border-8 w-7/12 bg-Moonstone text-center justify-center rounded-lg">
        <Formik
          initialValues={{
            date: '',
            objet: '',
            message: '',
          }}
          validationSchema={validate}
          onSubmit={(values) => {
            let contact = {
              idUser: `/api/users/${currentUser.id}`,
              date: new Date().toLocaleDateString().replaceAll('/', '-'),
              objet: values.objet,
              message: values.message,
            };
            axios.post(URL_BACK + '/api/contacts', contact).then((res) => {
              if (res.status === 201 && res.data) {
                toast.success(<CustomToast message="Message envoyé" />, {
                  position: toast.POSITION.BOTTOM_RIGHT,
                });
                navigate('/');
              } else {
                toast.error(
                  <CustomToast message="L'envoi du message a échoué, veuillez réessayer." />,
                  {
                    position: toast.POSITION.BOTTOM_RIGHT,
                  }
                );
              }
            });
          }}
        >
          <Form className="mt-8 w-full max-w-full">
            <div className="form-container flex flex-col justify-center items-center">
              <Input label="Objet :" name="objet" type="text" width="" />
              <div className="containerText w-full max-w-2xl">
                <div className="flex items-center">
                  <div className="span md:w-1/3">
                    <span className="block text-[#FFFFFF] font-bold md:text-left mb-1 md:mb-0 pr-4">
                      Message :
                    </span>
                  </div>
                  <div className="textarea md:w-2/3 ">
                    <Field
                      as="textarea"
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-3xl w-full py-2
                                                px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#7cc474]
                                                border-transparent focus:ring-0"
                      id="info"
                      name="message"
                      rows="4"
                      cols="80"
                      maxLength="350"
                    ></Field>
                    <TextField name="message" />
                  </div>
                </div>
              </div>
              <div className="btn-inscription mt-8 mb-8">
                <Button children="Envoyer" />
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default FormContact;
