import React, { useEffect, useState, useId } from 'react';
import { Formik, Form, connect } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from "../components/FormComponents/Button";
import Input from "../components/FormComponents/Input";
import { URL_BACK } from "../constants/urls/urlBackEnd";
import { storage } from '../services/firebaseConfig';
import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from "firebase/storage"

function AddCar() {
    const currentUser = useSelector((state) => state.user);
    const validate = Yup.object().shape({
        brand: Yup.string()
            .max(15, '*La marque ne peut excéder 15 caractères')
            .matches(/^[a-zA-Zà-ù\-]+$/, '*Le nom de la marque est incorrect')
            .required('*Ce champ ne peut être vide'),
        model: Yup.string()
            .max(20, '*Le modèle ne peut excéder 20 caractères')
            .matches(/^[a-zA-Zà-ù0-9 \-]+$/, '*Le nom du modèle est incorrect')
            .required('*Ce champ ne peut être vide'),
    });

    const navigate = useNavigate();
    const [url, setUrl] = useState([]);
    const [imgRefs, setImgRefs] = useState([]);
    const [imgPreviewer, setImgPreviewer] = useState();
    const [car, setCar] = useState({});
    const [isCar, setIsCar] = useState(false);

    useEffect(() => {
        async function fetchCar() {
            try {
                if (currentUser.id) {
                    const resultsCar = await axios.get(URL_BACK + '/get/cars/' + currentUser.id);
                    setCar(resultsCar.data)

                    if (resultsCar.data.photosUrl) {
                        setUrl(resultsCar.data.photosUrl.split(','))
                        setIsCar(true)
                    }
                    const listRef = ref(storage, 'images_car/' + currentUser.email);
                    listAll(listRef)
                        .then((res) => {
                            setImgRefs(res.items)
                        });
                }
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchCar();
    }, [currentUser])

    /*let imgConverter = (e) => {
        handleAddImage(e, 2)
        let imgPreview = imagesArray.map((img, index) => (
            <div key={index} className="imgContainer w-44 h-44 ml-5 relative">
                <img className="w-44 h-44 max-w-none max-h-44 object-cover inline-block" src={URL.createObjectURL(img)} alt={`Image ${index + 1}`} />
                <button type="button" onClick={() => removeImage(index)} className="absolute top-2 right-2">
                    <i className="fas fa-times"></i>
                </button>
            </div>
        ));
        setImgPreviewer(imgPreview);
    };*/

    const removeImage = (index, imgRef) => {
        const deleteRef = ref(storage, imgRef["_location"]["path_"]);
        deleteObject(deleteRef)
        const newUrls = [...url];
        newUrls.splice(index, 1);
        setUrl(newUrls);
        const newRefs = [...imgRefs];
        newRefs.splice(index, 1);
        setImgRefs(newRefs);
        let updateValues = {
            photosUrl: newUrls.join()
        };
        axios.put(URL_BACK + '/api/cars/' + car.id, updateValues)
    };

    useEffect(() => {
        console.log(imgRefs)
        let imgPreview = url.map((key, index) => (
            <div key={index} className="imgContainer w-44 h-44 ml-5 relative">
                <img className="w-44 h-44 max-w-none max-h-44 object-cover inline-block" src={key} alt={`Image ${index + 1}`} />
                <button type="button" onClick={() => removeImage(index, imgRefs[index])} className="absolute top-2 right-2">
                    <i className="fas fa-times"></i>
                </button>
            </div>
        ));
        setImgPreviewer(imgPreview);

    }, [imgRefs, url]);

    /* DEBUT UPLOAD IMAGE PHOTO DE PROFIL */

    function handleAddImage(newImage) {
        if (newImage.type.includes('image')) {
            if ((newImage.size / 1000) <= 500) {
                handleUpload(newImage)
            } else {
                alert("l'image ne doit pas exéder 500ko")
            }
        } else {
            alert("Veuillez séléctionner une image")
        }
    }

    function handleUpload(imgData) {
        if (!imgData) {
            return
        }

        const storageRef = ref(storage, 'images_car/' + currentUser.email + '/' + currentUser.email + '-' + (new Date().toJSON()));
        uploadBytes(storageRef, imgData).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((generatedUrl) => {
                let urlArray = [...url];
                urlArray.push(generatedUrl);
                setUrl(urlArray);
                const newRefs = [...imgRefs];
                newRefs.push(storageRef);
                setImgRefs(newRefs);
                if (isCar) {
                    let updateValues = {
                        photosUrl: urlArray.join()
                    };
                    axios.put(URL_BACK + '/api/cars/' + car.id, updateValues)
                }
                console.log(imgRefs)
            })
        })
    };

    /* FIN UPLOAD IMAGE PHOTO DE PROFIL */

    return (
        <div className="flex flex-col h-[84vh] bg-Teal items-center ">
            <div className="title mt-8 mb-4">
                <h1 className="text-Whitesmoke font-bold">
                    Ajouter un véhicule
                </h1>
            </div>
            <div className="flex box-border border-8 w-7/12 bg-Moonstone text-center justify-center rounded-lg">
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        brand: isCar ? car.brand : '',
                        model: isCar ? car.model : '',
                        photosUrl: '',
                    }}
                    validationSchema={validate}
                    onSubmit={(values) => {
                        if (isCar) {
                            let updateValues = {
                                brand: values.brand,
                                model: values.model,
                                photosUrl: url.join(),
                            }
                            axios.put(URL_BACK + '/api/cars/' + car.id, updateValues)
                                .then((res) => {
                                    console.log(res)
                                    if (res.status === 200 && res.data) {
                                        navigate('/Dashboard');
                                    }
                                });
                        } else {
                            let car = {
                                brand: values.brand,
                                model: values.model,
                                photosUrl: url.join(),
                                idUser: '/api/users/' + currentUser.id,
                            }
                            axios.post(URL_BACK + '/api/cars', car)
                                .then((res) => {
                                    console.log(res)
                                    if (res.status === 201 && res.data) {
                                        navigate('/Dashboard');
                                    }
                                });
                        }
                    }}
                >
                    <Form className="mt-12 w-full max-w-full">
                        <div className="test flex flex-col justify-center items-center">
                            <Input
                                label="Marque :"
                                name="brand"
                                type="text"
                                width=""
                            />
                            <Input
                                label="Modèle :"
                                name="model"
                                type="text"
                                width=""
                            />
                            <div className="w-full max-w-2xl">
                                <div className="upload flex align-center justify-center mb-10">
                                    {(url.length < 5) && (imgRefs.length < 5) ? (
                                        <div className="upload-file flex items-center justify-center rounded w-50 bg-[#7cc474] hover:bg-[#54b44b] text-white font-extrabold py-2 px-4">
                                            <label
                                                htmlFor="file-lol"
                                                className="cursor-pointer flex items-center"
                                            >
                                                <i className="fas fa-camera"></i>
                                                <span className="ml-2 font-bold text-white-700">
                                                    Ajouter des photos
                                                </span>
                                            </label>
                                            <input
                                                id="file-lol"
                                                type="file"
                                                className="hidden"
                                                name='photosUrl'
                                                accept="image/*"
                                                onChange={(e) => handleAddImage(e.target.files[0])}
                                            />
                                        </div>
                                    ) : (
                                        <p className='text-white font-extrabold'>5 photos maximum</p>
                                    )}
                                </div>
                            </div>

                            <div className="test w-full max-w-2xl flex flex-row overflow-x-scroll whitespace-nowrap scrollbar scrollbar-thumb-Mantis scrollbar-track-white scrollbar-rounded-full scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                                {imgPreviewer}
                            </div>
                            <hr className="w-2/3 m-autoX my-4" />
                            <div className="btn-inscription mb-8">
                                <button
                                    type="submit"
                                    className="w-40 bg-[#7cc474] hover:bg-[#54b44b] text-white font-extrabold py-2 px-4 rounded"
                                >
                                    Enregistrer
                                </button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export default AddCar;
