import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ROLE_ADMIN } from '../constants/rolesConstant';
import { URL_ADMIN_HOME } from '../constants/urls/urlFrontEnd';
import { selectHasRole } from '../redux-store/authenticationSlice';



/**
 * View/Page Home
 *
 * @author Océane Gontier
 */
const AproposView = () => {
    const isAdmin = useSelector((state) => selectHasRole(state, ROLE_ADMIN));
    const navigate = useNavigate();
    return (
        <>
            <div className="flex bg-MintGreen justify-center items-center h-[84vh]">
                <div className="bg-Teal flex flex-col justify-center items-center font-sans rounded-containerapropos h-5/6 w-11/12 ">
                    <div className="justify-center flex mb-20">
                        <h1 className="text-titre text-Whitesmoke">Comment fonctionne <span className="text-[#b2ffa6] ">Green</span>Ride ? </h1>
                    </div>
                    <div className="flex items-center justify-end">
                        <div className="mr-52">
                            <img className="h-72 items-center" src="src/app/assets/img/50point.png" alt="50point"/>
                        </div>
                        <div className="flex bg-Keppel rounded-br-explicationtoken justify-center items-center  w-6/12 h-52  mr-16 ">
                            <div className="justify-center w-4/5">
                                <h1 className="text-Whitesmoke">Un site de <span className="text-[#b2ffa6] ">covoiturage</span> utilisant un système de <span className="text-[#b2ffa6] ">token</span></h1>
                            </div>
                        </div>
                    </div>
                    <div className="bg-Keppel rounded-tl-explication2 rounded-br-explication2 flex justify-center items-center w-11/12 h-44 mt-10">
                        <div className="textexplication2greenride justify-center w-11/12">
                            <h1 className="text-paragraphe font-bold text-Whitesmoke">Le but de cette application est de mettre en relation des personnes pour réaliser des trajets en voiture sans transfert d’argent mais en utilisant un système de point. Par exemple lorsqu’un conducteur prend un passager pour un trajet de <span className="text-[#b2ffa6] ">20km</span> il gagne <span className="text-[#b2ffa6] ">20 points</span> et le passager consomme <span className="text-[#b2ffa6] ">20 points</span>. A l’inscription l’utilisateur a un crédit de <span className="text-[#b2ffa6] ">50 points</span>, et pour les personnes ne possédant pas de voiture ils ont la possibilité d’acheter des points. Un système pour vendre mes points aux autres utilisateurs.</h1>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default AproposView;
