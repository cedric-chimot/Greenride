import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const AutreProfilView = () => {
  return (
    <div
      className="container5 h-[84vh]
    bg-Keppel"
    >
      <div className="containerInfo  bg-Moonstone ml-64 mr-64 w-auto h-auto text-center items-center rounded-lg ">
        <div className="titleContainer5 pt-20 ">
          <p className="text-white text-center text-5xl">
            Résultats de votre recherche
          </p>
        </div>
        <div className="rechercheProfil flex flex-row justify-center relative mb-2.5">
          <div className="flex relative">
            <input
              type="search"
              id="search-dropdownProfil1"
              className="searchBox block p-2.5  z-50"
              placeholder="Ville"
              required
            />
            <div className="absolute right-[30px] z-50 bottom-2 ">
              <FontAwesomeIcon
                className="FontAwesomeIcon1"
                icon={faCaretDown}
              />
            </div>
          </div>

          <div className="flex relative">
            <input
              type="search"
              id="search-dropdownProfil1"
              className="searchBox block p-2.5  z-20 "
              placeholder="Conducteur"
              required
            />
            <div className="absolute right-[30px] z-50 bottom-2 ">
              <FontAwesomeIcon
                className="FontAwesomeIcon1"
                icon={faCaretDown}
              />
            </div>
          </div>

          <div className="flex relative">
            <input
              type="search"
              id="search-dropdownProfil1"
              className="searchBox block p-2.5  z-20"
              placeholder="Trajet"
              required
            />
            <div className="absolute right-[30px] z-50 bottom-2 ">
              <FontAwesomeIcon
                className="FontAwesomeIcon1"
                icon={faCaretDown}
              />
            </div>
          </div>
        </div>

        <div className="resultatProfil flex flex-col  text-white items-center ">
          <div className="flex m-[10px]">
            <div>
              <img
                className="imgProfil"
                src="src/app/assets/img/avatar.png"
                alt=""
              />
            </div>

            <div className="flex m-[10px]">
              <p className="result1 text-start flex  font-semibold  text-2xl ">
                Mme Carla Ancellin <br />
                Beauvais
              </p>
            </div>
          </div>

          <div className="flex m-[15px]">
            <div>
              <img
                className="imgProfil"
                src="src/app/assets/img/avatar.png"
                alt=""
              />
            </div>

            <div className="flex m-[15px]">
              <p className="result1 text-start flex  font-semibold  text-2xl ">
                Mr Jérôme Berthier <br />
                Marseille
              </p>
            </div>
          </div>

          <div className="flex m-[15px]">
            <div>
              <img
                className="imgProfil"
                src="src/app/assets/img/avatar.png"
                alt=""
              />
            </div>

            <div className="flex m-[15px]">
              <p className="result1 text-start flex  font-semibold  text-2xl ">
                Mme Carla Ancellin <br />
                Beauvais
              </p>
            </div>
          </div>
        </div>

        <div class="flex justify-center">
          <div className="btnVoir flex justify-center  bg-Mantis px-6 py-4 text-xl text-white drop-shadow-2xl rounded-lg my-auto mx-0  ">
            <a className="voir text-white my-auto mx-0" href="../../../../../../Downloads">
              En voir plus
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutreProfilView;
