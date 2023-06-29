import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_BACK } from '../constants/urls/urlBackEnd';

const Notif = (props) => {
  const [timer, setTimer] = useState(8);
  const navigate = useNavigate();

  const timerInterval = setInterval(() => {
    if (timer >= 1) {
      setTimer(timer - 1);
    }
    if (timer === 0) {
      clearInterval(timerInterval);
      window.location.replace('/');
    }
  }, 1000);

  if (props.theme === 'alert') {
    timerInterval;
  } else {
    setTimeout(() => {
      props.setNotifTheme('');
    }, 8000);
  }

  const contentDisplayer = () => {
    if (props.theme === 'ban') {
      return (
        <p>
          Vous avez banni
          {' ' + props.user.prenom + ' ' + props.user.nom + ' '}
          jusqu'au
          {' ' + new Date(props.date).toLocaleDateString()}.
        </p>
      );
    }
    if (props.theme === 'warn') {
      return (
        <p>
          Vous avez envoyé un avertissement à{' '}
          {' ' + props.user.prenom + ' ' + props.user.nom + ' '} , il a
          maintenant
          {' ' + props.user.avertissements + ' '}
          avertissement(s).
          {props.user.avertissements > 1
            ? "Il a donc été banni jusqu'au " +
              new Date(Number(props.date)).toLocaleDateString() +
              '.'
            : null}
        </p>
      );
    }
    if (props.theme === 'alert') {
      return (
        <p>
          Votre signalement a bien été envoyé. Retour à l'accueil dans{' '}
          {timer.toString()}
        </p>
      );
    }
    if (props.theme === 'alert-error') {
      return <p>Une erreur s'est produite, veuillez réessayer plus tard</p>;
    }
    if (props.theme === 'alert-email') {
      return <p>Cet email est déjà utilisé</p>;
    }
    if (props.theme === 'accepted-reservation') {
      return <p>Votre demande de réservation a été acceptée</p>;
    }
  };
  return (
    <div
      className={`${
        props.page === 'user'
          ? 'top-[50px] left-1/2 translate-x-50'
          : 'bottom-[0px] right-[-360px]'
      } absolute  w-[350px] bg-blueBg border-2  px-8 py-4`}
    >
      {contentDisplayer()}
    </div>
  );
};

export default Notif;
