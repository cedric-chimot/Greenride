import React, { useEffect } from 'react';
import '../assets/styles/components/modifierView.css';
import { Formik, Form, Field } from 'formik';
import { Input } from '../components/FormComponents/Admininput';
import * as Yup from 'yup';
import { useState } from 'react';

const Adminmodification = () => {
    const validate = Yup.object({
        password: Yup.string()
            .min(6, '*Doit contenir 6 caractères ou plus')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                '*Le mot de passe doit comporter 1 chiffre, 1 majuscule et 1 caractère spécial')
            .required('*Mot de passe requis'),
        confirmpassword: Yup.string()
            .oneOf(
                [Yup.ref('password'), null],
                '*Les mots de passe doivent être identiques'
            )
            .required('*Confirmer votre mot de passe'),
    });

    const [images, setImages] = useState([]);
    const [url, setUrl] = useState([]);
    const [imgPreviewer, setImgPreviewer] = useState();

    let imgConverter = (e) => {
        let imagesArray = images;
        let UrlArray = url;
        imagesArray.push(e);
        UrlArray.push(URL.createObjectURL(e));
        setImages(imagesArray);
        setUrl(UrlArray);
        let imgPreview = url.map((img) => (
            <div className="imgContainer ml-5">
                <img className="photo w-44 max-w-none h-auto object-contain inline-block" src={img} />
            </div>
        ));
        setImgPreviewer(imgPreview);
    };

    const [image, setImage] = useState(null);
    const [profilUrl, setprofilUrl] = useState([]);

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage(img)
            setprofilUrl(URL.createObjectURL(img));
        }
    };

    return (
        <>
            <div className="container1 w-full flex h-[84vh] bg-Moonstone">
                <div className="container2 justify-items-center mx-auto my-auto bg-Teal h-5/6 w-8/12">
                    <div className="container-photo flex h-5/6 flex-col gap-y-3  pt-20">
                        <div className="box-img flex justify-center">
                            {image && <img src={profilUrl} className="w-2/6 rounded-full" alt="Preview" />}
                        </div>
                        <div className="upload flex align-center justify-center">
                            <div className="upload-file flex items-center justify-center rounded-full w-50 bg-[#7cc474] hover:bg-[#54b44b] text-white font-extrabold py-2 px-4">
                                <label
                                    htmlFor="file-input"
                                    className="cursor-pointer flex items-center"
                                >
                                    <i className="fas fa-camera"></i>
                                    <span className="ml-2 font-bold text-white-700">
                      Importer une image
                    </span>
                                </label>
                                <input
                                    id="file-input"
                                    type="file"
                                    className="sr-only"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>
                        <Formik
                            initialValues={{
                                pseudo: "",
                                password: "",
                                confirmpassword: "",
                            }}
                            validationSchema={validate}
                            onSubmit={values => {
                                console.log(values)
                            }
                            }
                        >
                            {formik => (
                                <div className=" flex items-center justify-center mx-auto">
                                    <Form>
                                        <div className="w-full max-w-2xl">
                                            <Input
                                                margin="56"
                                                PlaceHolder="Pseudo"
                                                name="pseudo"
                                                type="text"
                                            />
                                            <Input
                                                margin="56"
                                                PlaceHolder="Changer votre mot de passe :"
                                                name="password"
                                                type="password"
                                            />
                                            <Input
                                                margin="56"
                                                PlaceHolder="Confirmer le mot de passe :"
                                                name="confirmpassword"
                                                type="password"
                                            />
                                        </div>
                                        <div>
                                            <div className="w-full max-w-2xl mb-4">
                                                <div className="md:flex md:items-center justify-center gap-x-20 mt-20">
                                                    <button
                                                        type="submit"
                                                        className="w-40 bg-[#7cc474] hover:bg-[#54b44b] text-white font-extrabold py-2 px-4 rounded">
                                                        Modifier
                                                    </button>
                                                    <button
                                                        type="reset"
                                                        className="w-40 bg-[#7cc474] hover:bg-[#54b44b] text-white font-extrabold py-2 px-4  rounded">
                                                        Annuler
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Adminmodification;
