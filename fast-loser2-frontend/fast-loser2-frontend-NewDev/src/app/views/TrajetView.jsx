import React from "react";

const TrajetView = () => {
  return (
    <div className="container1">
      <h1>
        Découvrez les offres de trajets de nos <span>utilisateurs</span>
      </h1>
      <form className="recherche">
        <label htmlFor="from">Départ :</label>
        <input type="text" id="from" name="from" />
        <label htmlFor="to">Destination :</label>
        <input type="text" id="to" name="to" />
        <label htmlFor="to">Date :</label>
        <input type="text" id="to" name="to" />
        <button className="submit" type="submit">
          Rechercher un trajet
        </button>
      </form>

      <form className="propose">
        <ul>
          <h4>Harold propose un nouveau trajet</h4>
          <p>Départ : Hide</p>
          <p>Arrivée : Pain</p>
          <a href="">En savoir plus</a>
          <div
            style={{
              borderTop: "2px solid #fff ",
              marginLeft: 0,
              marginRight: 20,
            }}
          ></div>
        </ul>

        <ul>
          <h4>Jeff propose un nouveau trajet</h4>
          <p>Départ : Paris</p>
          <p>Arrivée : Nice</p>
          <a href="">En savoir plus</a>
          <div
            style={{
              borderTop: "2px solid #fff ",
              marginLeft: 0,
              marginRight: 20,
            }}
          ></div>
        </ul>
        <ul>
          <h4>Alice propose un nouveau trajet</h4>
          <p>Départ : Paris</p>
          <p>Arrivée : Nice</p>
          <button className="savoir" type="submit">
            En savoir plus
          </button>
          <div
            style={{
              borderTop: "2px solid #fff ",
              marginLeft: 0,
              marginRight: 20,
            }}
          ></div>
        </ul>
        <ul>
          <h4>Naël propose un nouveau trajet</h4>
          <p>Départ : Paris</p>
          <p>Arrivée : Nice</p>
          <button className="savoir" type="submit">
            En savoir plus
          </button>
          <div
            style={{
              borderTop: "2px solid #fff ",
              marginLeft: 0,
              marginRight: 20,
            }}
          ></div>
        </ul>
      </form>
    </div>
  );
};

export default TrajetView;

