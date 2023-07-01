import React, { useEffect } from 'react';
import '../assets/styles/components/modifierView.css';
import { Formik, Form, Field } from 'formik';
import { Input } from '../components/FormComponents/Input';
import * as Yup from 'yup';
import { useState } from 'react';
import axios from "axios";
import { URL_BACK } from "../constants/urls/urlBackEnd";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { storage } from '../services/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

const ModificationView = () => {
    document.title = "Modification du profil";
    const currentUser = useSelector((state) => state.user);
    const navigate = useNavigate();

    const validate = Yup.object({
        adresse: Yup.string()
            .min(1, '*Doit contenir 1 caractère ou plus')
            .max(50, '*Doit contenir 50 caractères ou moins')
            .required('*Adresse requise'),
        codepostal: Yup.string()
            .matches(
                /^[0-9]{5}$/,
                '*Le code postal doit contenir exactement 5 chiffres'
            )
            .required('*Code postal requis'),
        ville: Yup.string()
            .min(1, '*Doit contenir 1 caractère ou plus')
            .max(50, '*Doit contenir 50 caractères ou moins')
            .required('*Ville requise')
        /*password: Yup.string()
            .min(6, '*Doit contenir 6 caractères ou plus')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                '*Le mot de passe doit comporter 1 chiffre, 1 majuscule et 1 caractère spécial')
            .required('*Mot de passe requis'),
        confirmpassword: Yup.string()
            .oneOf(
                [Yup.ref('password'), null],
                '*Les mots de passe doivent être identiques'
            )
            .required('*Confirmer votre mot de passe'),*/
    });


    /* DEBUT Script Upload de photo dans un menu deroulant + suppression */
    const [images, setImages] = useState([]);
    const [url, setUrl] = useState([]);
    const [imgPreviewer, setImgPreviewer] = useState();
    const [musics, setMusics] = useState([]);



    let imgConverter = (e) => {
        let imagesArray = [...images];
        let UrlArray = [...url];
        imagesArray.push(e);
        UrlArray.push(URL.createObjectURL(e));
        setImages(imagesArray);
        setUrl(UrlArray);
        let imgPreview = imagesArray.map((img, index) => (
            <div key={index} className="imgContainer w-44 h-44 ml-5 relative">
                <img className="w-44 h-44 max-w-none max-h-44 object-cover inline-block" src={URL.createObjectURL(img)} alt={`Image ${index + 1}`} />
                <button type="button" onClick={() => removeImage(index)} className="absolute top-2 right-2">
                    <i className="fas fa-times"></i>
                </button>
            </div>
        ));
        setImgPreviewer(imgPreview);
    };

    const removeImage = (index) => {
        const newImages = [...images];
        const newUrls = [...url];
        newImages.splice(index, 1);
        newUrls.splice(index, 1);
        setImages(newImages);
        setUrl(newUrls);
    };

    useEffect(() => {
        let imgPreview = images.map((img, index) => (
            <div key={index} className="imgContainer w-44 h-44 ml-5 relative">
                <img className="w-44 h-44 max-w-none max-h-44 object-cover inline-block" src={URL.createObjectURL(img)} alt={`Image ${index + 1}`} />
                <button type="button" onClick={() => removeImage(index)} className="absolute top-2 right-2">
                    <i className="fas fa-times"></i>
                </button>
            </div>
        ));
        setImgPreviewer(imgPreview);
    }, [images]);
    /* FIN Script Upload de photo dans un menu deroulant */

    /* DEBUT UPLOAD IMAGE PHOTO DE PROFIL */


    const [imageSrc, setImageSrc] = useState('src/app/assets/img/profil.jpg');
    const [imageUrl, setImageUrl] = useState('src/app/assets/img/profil.jpg');

    function handleImageChange(event) {
        const newProfileImage = event.target.files[0];
        if (newProfileImage.type.includes('image')) {
            if ((newProfileImage.size / 1000) <= 500) {
                setImageSrc(URL.createObjectURL(newProfileImage));
                handleUpload(newProfileImage)
            } else {
                alert("l'image ne doit pas exéder 500ko")
            }
        } else {
            alert("Veuillez séléctionner une image")
        }
    }

    function handleUpload(imgProfilData) {
        if (!imgProfilData) {
            return
        }
        const storageRef = ref(storage, 'images_profil/' + currentUser.email);

        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        uploadBytes(storageRef, imgProfilData).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrl(url)
            })
        })
    };

    /* FIN UPLOAD IMAGE PHOTO DE PROFIL */

    useEffect(() => {
        async function fetchMusic() {
            try {
                const resultsMusic = await axios.get(URL_BACK + '/api/music');
                console.log(resultsMusic)
                setMusics(resultsMusic.data["hydra:member"])
                if (currentUser.imgProfil) {
                    setImageSrc(currentUser.imgProfil)
                }
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchMusic();
    }, [currentUser])

    return (
        <>
            <div className="container1 w-full flex min-h-[84vh] bg-[#04BFAD]">
                <div className="container2 mt-12 mb-12 w-full">
                    <div className="flex h-full items-center">
                        <div className="container-photo w-1/2 flex items-center h-full flex-col gap-y-3 ml-12 pt-20">
                            <div className="box-img w-72 h-72 flex justify-center">
                                {imageSrc && <img src={imageSrc} className="w-full h-full rounded-full object-cover" alt="Preview" />}
                            </div>
                            <div className="upload flex align-center justify-center">
                                <div className="upload-file flex items-center justify-center rounded w-50 bg-[#7cc474] hover:bg-[#54b44b] text-white font-extrabold py-2 px-4">
                                    <label
                                        htmlFor="file-input"
                                        className="cursor-pointer flex items-center"
                                    >
                                        <i className="fas fa-camera"></i>
                                        <span className="ml-2 font-bold text-white-700">
                                            Changer votre photo
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
                        </div>
                        {/*    suite*/}
                        <Formik
                            enableReinitialize={true}
                            initialValues={{
                                adresse: currentUser.adresse,
                                codepostal: currentUser.cp,
                                ville: currentUser.ville,
                                musique: currentUser.idMusic ? currentUser.idMusic.id : "1",
                                silence: currentUser.silence ? currentUser.silence : "false",
                                info: currentUser.description ? currentUser.description : ""
                            }}
                            validationSchema={validate}
                            onSubmit={values => {
                                let updateValues = {
                                    ville: values.ville,
                                    cp: Number(values.codepostal),
                                    adresse: values.adresse,
                                    silence: values.silence,
                                    idMusic: '/api/music/' + values.musique,
                                    imgProfil: imageUrl,
                                    description: values.info
                                };
                                axios.put(URL_BACK + '/api/users/' + currentUser.id, updateValues)
                                    .then((res) => {
                                        if (res.status === 200 && res.data) {
                                            navigate('/Dashboard');
                                        } else {
                                            // pour le debug
                                            console.log(res)
                                        }
                                    });
                            }}
                        >
                            {formik => (
                                <div className="w-full h-full flex items-center">
                                    <Form>
                                        {/*<Input
                                            margin="56"
                                            label="Changer votre mot de passe :"
                                            name="password"
                                            type="password"
                                        />
                                        <Input
                                            margin="56"
                                            label="Confirmer le mot de passe :"
                                            name="confirmpassword"
                                            type="password"
                                        />*/}
                                        <Input
                                            margin="56"
                                            label="Adresse :"
                                            name="adresse"
                                            type="text"
                                        />
                                        <Input
                                            margin="56"
                                            label="Code postal :"
                                            id="codepostal"
                                            name="codepostal"
                                        />

                                        <Input
                                            margin="56"
                                            label="Ville :"
                                            name="ville"
                                            type="text"
                                        />
                                        {/* <div className="w-full max-w-2xl">
                                            <div className="md:flex md:items-center mb-6">
                                                <div className="md:w-1/3">
                                                    <label
                                                        className="block text-[#FFFFFF] font-bold md:text-left mb-1 md:mb-0 pr-4"
                                                        htmlFor="passager"
                                                    >
                                                        Nombre de passagers :
                                                    </label>
                                                </div>
                                                <div className="md:w-2/3">
                                                    <Field
                                                        as="select"
                                                        id="passager"
                                                        name="passager"
                                                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-full w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#7cc474] border-transparent focus:ring-0"
                                                    >
                                                        <option value="1">1 passager</option>
                                                        <option value="2">2 passagers</option>
                                                        <option value="3">3 passagers</option>
                                                        <option value="4">4 passagers</option>
                                                    </Field>
                                                </div>
                                            </div>
                                        </div>*/}
                                        <div className="w-full max-w-2xl">
                                            <div className="md:flex md:items-center mb-6">
                                                <div className="md:w-1/3">
                                                    <label
                                                        className="block text-[#FFFFFF] font-bold md:text-left mb-1 md:mb-0 pr-4"
                                                        htmlFor="passager"
                                                    >
                                                        Style de musique :
                                                    </label>
                                                </div>
                                                <div className="md:w-2/3">
                                                    <Field
                                                        as="select"
                                                        id="musique"
                                                        name="musique"
                                                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-full w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#7cc474] border-transparent focus:ring-0"
                                                    >
                                                        {musics.map((music) => (
                                                            <option key={music.id} value={music.id}>{music.value}</option>
                                                        ))}
                                                    </Field>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full max-w-2xl">
                                            <div className="md:flex md:items-center mb-6">
                                                <div className="md:w-1/3">
                                                    <label
                                                        className="block text-[#FFFFFF] font-bold md:text-left mb-1 md:mb-0 pr-4"
                                                        htmlFor="passager"
                                                    >
                                                        Je conduis en silence :
                                                    </label>
                                                </div>
                                                <div className="md:w-2/3">
                                                    <Field
                                                        as="select"
                                                        id="silence"
                                                        name="silence"
                                                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-full w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#7cc474] border-transparent focus:ring-0"
                                                    >
                                                        <option value="false">Non</option>
                                                        <option value="true">Oui</option>
                                                    </Field>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="containerText w-full max-w-2xl">
                                            <div className="md:flex md:items-center mb-6">
                                                <div className="span md:w-1/3">
                                                    <span className="block text-[#FFFFFF] font-bold md:text-left mb-1 md:mb-0 pr-4">
                                                        Dites quelques mots sur vous (350 caractères max) :
                                                    </span>
                                                </div>
                                                <div className="textarea md:w-2/3 ">
                                                    <Field
                                                        as="textarea"
                                                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-3xl w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#7cc474] border-transparent focus:ring-0"
                                                        id="info"
                                                        name="info"
                                                        rows="4"
                                                        cols="80"
                                                        maxLength="350"
                                                    ></Field>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="containerText w-full max-w-2xl">
                                            <div className="md:flex md:items-center mb-6">
                                                <div className="w-full">
                                                    <span className="text-[#FFFFFF] font-bold md:text-left mb-1 md:mb-0 pr-4 w-1/2 ml-auto">
                                                        Si vous êtes conducteur, vous pouvez 
                                                    </span>
                                                    <button
                                                    type="button"
                                                    className="w-60 bg-[#7cc474] hover:bg-[#54b44b] text-white font-extrabold py-2 px-4 rounded"
                                                    onClick={() => navigate('/')}
                                                >
                                                    Ajouter votre véhicule
                                                </button>
                                                </div>
                                            </div>
                                        </div> */}
                                        {/*<div className="w-full max-w-2xl">
                                            <div className="upload flex align-center justify-center mb-10">
                                                <div className="upload-file flex items-center justify-center rounded w-50 bg-[#7cc474] hover:bg-[#54b44b] text-white font-extrabold py-2 px-4">
                                                    <label
                                                        htmlFor="file-lol"
                                                        className="cursor-pointer flex items-center"
                                                    >
                                                        <i className="fas fa-camera"></i>
                                                        <span className="ml-2 font-bold text-white-700">
                                                            Ajouter photo de ma voiture
                                                        </span>
                                                    </label>
                                                    <input
                                                        id="file-lol"
                                                        type="file"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={(e) => imgConverter(e.target.files[0])}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="test w-full max-w-2xl flex flex-row overflow-x-scroll whitespace-nowrap scrollbar scrollbar-thumb-Mantis scrollbar-track-white scrollbar-rounded-full scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                                            {imgPreviewer}
                                        </div>*/}

                                        <div className="w-full max-w-2xl">
                                            <div className="md:flex md:items-center justify-center gap-x-20 mt-20">
                                                <button
                                                    type="submit"
                                                    className="w-40 bg-[#7cc474] hover:bg-[#54b44b] text-white font-extrabold py-2 px-4 rounded"
                                                >
                                                    Enregistrer
                                                </button>
                                                <button
                                                    type="reset"
                                                    className="w-40 bg-red-500 hover:bg-red-600 text-white font-extrabold py-2 px-4 rounded"
                                                >
                                                    Annuler
                                                </button>
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

export default ModificationView;
