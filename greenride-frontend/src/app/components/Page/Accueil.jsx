import React from 'react';
import {useSelector} from "react-redux";
import {selectIsLogged} from "../../redux-store/authenticationSlice";

const Accueil = () => {
    const isLoggued = useSelector(selectIsLogged);

    return (

            <div className="banniereimg">
                <img src="src/app/assets/img/accueil.png" alt="logo"/>
            </div>
    );
};

export default Accueil;