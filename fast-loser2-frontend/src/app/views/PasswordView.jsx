import React, { useState } from 'react';
import { URL_BACK } from '../constants/urls/urlBackEnd';
import axios from 'axios';

const PasswordView = () => {
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [incorrect, setIncorrect] = useState(false);

  ////Modifie le format de la date DD/MM/YYYY => DD-MM-YYYY////
  let dateHandler = (date) => {
    let newDate = date;
    newDate =
      date.split('-')[2] + '-' + date.split('-')[1] + '-' + date.split('-')[0];
    return newDate;
  };

  ////Génère un nouveau mot de passe////
  let passwordGenerator = () => {
    var caracteresSpeciaux = '!@#$%^&*()_+=-{}[]|:<>?/';
    var majuscules = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var minuscules = 'abcdefghijklmnopqrstuvwxyz';
    var chiffres = '0123456789';

    var motDePasse = '';

    // Sélectionner une majuscule aléatoire
    motDePasse += majuscules.charAt(
      Math.floor(Math.random() * majuscules.length)
    );

    // Sélectionner 4 caractères aléatoires
    for (var i = 0; i < 4; i++) {
      var caracteres = minuscules + chiffres;
      motDePasse += caracteres.charAt(
        Math.floor(Math.random() * caracteres.length)
      );
    }

    // Sélectionner un caractère spécial aléatoire
    motDePasse += caracteresSpeciaux.charAt(
      Math.floor(Math.random() * caracteresSpeciaux.length)
    );

    // Sélectionner les 3 derniers caractères aléatoires
    for (var j = 0; j < 3; j++) {
      var tousLesCaracteres =
        minuscules + majuscules + chiffres + caracteresSpeciaux;
      motDePasse += tousLesCaracteres.charAt(
        Math.floor(Math.random() * tousLesCaracteres.length)
      );
    }

    setNewPassword(motDePasse);
    return motDePasse;
  };

  ////Trouve l'utilisateur grâce au mail et génère un nouveau mdp + envoi à la bdd si date de naissance correcte////
  let findUser = (e) => {
    e.preventDefault();
    let name = email.split('@')[0];
    let domain = email.split('@')[1].split('.')[0];
    let ext = email.split('.')[1];

    axios
      .get(URL_BACK + `/get/user_by_email/${name}/${domain}/${ext}`)
      .then((res) => {
        if (res.data.length === 0) {
          setIncorrect(true);
        }
        if (res.data[0].dateNaissance != dateHandler(date)) {
          setIncorrect(true);
        }
        if (res.data[0].dateNaissance === dateHandler(date)) {
          passwordGenerator();
          let user = {
            email: res.data[0].email,
            plainPassword: passwordGenerator(),
            nom: res.data[0].nom,
            prenom: res.data[0].prenom,
            ville: res.data[0].ville,
            cp: res.data[0].cp,
            adresse: res.data[0].adresse,
            tokens: res.data[0].tokens,
            silence: res.data[0].silence,
            dateNaissance: res.data[0].dateNaissance,
            idMusic: res.data[0].idMusic,
            avertissements: res.data[0].avertissements,
            dateInscrit: res.data[0].dateInscrit,
          };
          axios.put(URL_BACK + `/api/users/${res.data[0].id}`, user);
        }
      });
  };
  return (
    <div className="h-[84vh] bg-[#057D89] flex items-center justify-center">
      <div className=" bg-[#04ADBF] py-12 px-8 rounded">
        <h4 className="text-white font-bold mb-12">
          Récupérer votre mot de passe
        </h4>
        {newPassword != '' ? (
          <p className="text-xl font-bold text-white text-center">
            Voici votre nouveau mot de passe : {newPassword}
          </p>
        ) : (
          <form onSubmit={(e) => findUser(e)}>
            <div className="w-full flex flex-col justify-center mb-8">
              {' '}
              <label className="text-xl text-white font-bold  text-center block mb-4">
                Indiquez votre email
              </label>
              <input
                type="mail"
                className="w-full mx-auto border-2 border-gray-200 rounded-full 
                    py-2 px-4 text-gray-700 leading-tight h-10 focus:outline-none 
                     focus:border-[#7cc474] border-transparent  focus:ring-0"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="w-full flex flex-col justify-center mb-12">
              {' '}
              <label className="text-xl text-white font-bold text-center block mb-4">
                Indiquez votre date de naissance
              </label>
              <input
                type="date"
                className="w-full mx-auto border-2 border-gray-200 rounded-full 
                    py-2 px-4 text-gray-700 leading-tight h-10 focus:outline-none 
                     focus:border-[#7cc474] border-transparent  focus:ring-0"
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <input
              type="submit"
              value="Valider"
              className="bg-[#7cc474] hover:bg-[#54b44b] tracking-wider text-white font-extrabold py-2 px-4 rounded w-full cursor-pointer"
            />
            {incorrect ? (
              <p className="text-xl font-bold text-red-700 mt-8">
                Adresse mail ou date de naissance incorrecte
              </p>
            ) : null}
          </form>
        )}
      </div>
    </div>
  );
};

export default PasswordView;
