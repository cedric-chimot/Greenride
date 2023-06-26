import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from '../components/Page/TextField';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import { signIn } from '../redux-store/authenticationSlice';
import Button from "../components/FormComponents/Button";
import Input from "../components/FormComponents/Input";
import Select from "../components/FormComponents/Select";
import { URL_BACK } from "../constants/urls/urlBackEnd";
import { current } from '@reduxjs/toolkit';

function BuyTokens() {
    const currentUser = useSelector((state) => state.user);
    const validate = Yup.object().shape({
        acheteur: Yup.string()
            .max(15, '*Le nom de l\'acheteur ne peut excéder 15 caractères')
            .matches(/^[a-zA-Zà-ù\-]+$/, '*Le nom de la marque est incorrect')
            .required('*Ce champ ne peut être vide'),
        montant: Yup.string()
            .matches(/^[0-9\-]+$/, '*Le montant ne peut comporter que des chiffres')
            .required('*Ce champ ne peut être vide'),
    });

    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-[84vh] bg-Keppel items-center ">
            <div className="title mt-8 mb-4">
                <h1 className="text-Whitesmoke font-bold">
                    Vente de tokens
                </h1>
            </div>
            <div className="flex box-border border-8 w-7/12 bg-Teal text-center justify-center rounded-lg">
                <Formik
                    initialValues={{
                        tokens: currentUser.tokens,
                        acheteur: '',
                        quantite: '',
                        montant: '',
                    }}
                    validationSchema={validate}
                    // onSubmit={(values) => {
                    //     let car = {
                    //         brand: values.brand,
                    //         model: values.model,
                    //         photosUrl: ' ',
                    //         idUser: '/api/users/' + currentUser.id,
                    //     }
                    //     axios.post(URL_BACK + '/api/cars', car)
                    //     .then((res) => {
                    //     if (res.status === 201 && res.data) {
                    //         navigate('/Dashboard');
                    //     }
                    //     });
                    // }}
                >
                    <Form className="mt-12 w-full max-w-full">
                    <div className="test flex flex-col justify-center items-center">
                        <Input
                            label="Solde tokens :"
                            name="tokens"
                            type="text"
                            width=""
                        />
                        <Input
                            label="Acheteur :"
                            name="acheteur"
                            type="text"
                            width=""
                        />
                        <Select
                            label="Quantité :"
                            name="quantite"
                            type="text"
                            width=""
                        />
                        <Input
                            label="Montant :"
                            name="montant"
                            type="text"
                            width=""
                        />
                        <hr className="w-2/3 m-autoX my-4" />
                        <div className="btn-inscription mb-8">
                            <Button children="Confirmer"/>
                        </div>
                    </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export default BuyTokens;
