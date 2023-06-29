import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from "axios";
import { URL_BACK } from "../constants/urls/urlBackEnd";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";

const RideHistory = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user);
  const [userTrajets, setUserTrajets] = useState([])
  const [userReservations, setUserReservations] = useState([])
  const [reservedTrajets, setReservedTrajets] = useState([])
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    const fetchTrajets = async () => {
      try {
        if (currentUser.id) {
          const resultsTrajets = await axios.get(URL_BACK + '/get/trajets/' + currentUser.id);
          const resultsReservedTrajets = await axios.get(URL_BACK + '/get/reservations/' + currentUser.id);
          setUserTrajets(resultsTrajets.data)
          setReservedTrajets(resultsReservedTrajets.data.filter(reservation => reservation.isValidate == true))
        } else {
          // navigate("/Login")
        }
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchTrajets();
  }, [currentUser]);

  useEffect(() => {
    const fetchTrajets = async () => {
      try {
        if (userTrajets != 0) {
          const resultsReservation = await axios.post(URL_BACK + '/post/reservations_by_trajets_id', userTrajets);
          setUserReservations(resultsReservation.data.filter(reservation => reservation.isValidate == false))
        } else {
          // navigate("/Login")
        }
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchTrajets();
  }, [userTrajets]);

  useEffect(() => {
    console.log('ok')
  }, [refresh]);

  const handleValider = (userId, trajetId) => {
    let data = {
      userId: userId,
      trajetId: trajetId,
    }
    axios.put(URL_BACK + '/put/validate_reservation', data)
      .then((res) => {
        const dataMercure = {
          topic: 'https://localhost/notification/' + userId,
          data: {
            "type": "validate-reservation",
            "content": "Votre demande de réservation a été accepté",
            "date": new Date().toLocaleDateString().replaceAll('/', '-'),
            "lu": false,
            "userId": userId,
            "trajetId": trajetId
          }
        }
        axios.post(URL_BACK + '/mercure/post/notification', dataMercure)
          .then(response => console.log(response));
      });
    setRefresh(true)
  };

  return (
    <div className="containerCard flex flex-col h-[84vh] bg-Teal items-center ">
      <div className="titleDashboard text-white text-3xl py-6">
        <h1>Historique des trajets de {currentUser.prenom} {currentUser.nom}</h1>
      </div>
      <div className="w-10/12 max-h-full px-8 py-8 flex box-border border-8 bg-Moonstone justify-around text-center items-center rounded-lg">
        <div className="bg-Teal flex justify-center items-center max-h-full rounded-xl px-6">
          <div className="max-w-full">
            <Tabs value="postedRides">
              <TabsHeader
                className="bg-transparent"
                indicatorProps={{
                  className: "bg-Mantis shadow-none",
                }}>
                <Tab key="postedRides" value="postedRides">
                  <h5 className="text-Whitesmoke font-bold">Mes trajets postés</h5>
                </Tab>
                <Tab key="reservedRides" value="reservedRides">
                  <h5 className="text-Whitesmoke font-bold">Mes trajets reservés</h5>
                </Tab>
              </TabsHeader>
              <TabsBody animate={{
                initial: { y: 250 },
                mount: { y: 0 },
                unmount: { y: 250 },
              }}>
                <TabPanel key="postedRides" value="postedRides">
                  <table className='table-auto mb-4 bg-Teal border-collapse border border-slate-400'>
                    <thead>
                      <tr>
                        <th className='border border-slate-300 px-8 py-2 text-Whitesmoke'>Date</th>
                        <th className='border border-slate-300 px-8 py-2 text-Whitesmoke'>Départ</th>
                        <th className='border border-slate-300 px-8 py-2 text-Whitesmoke'>Destination</th>
                        <th className='border border-slate-300 px-8 py-2 text-Whitesmoke'>Places restantes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userTrajets != 0 ? (
                        userTrajets.slice(0,).map((trajet) => (
                          <tr>
                            <td className='border border-slate-300 px-8 py-2 text-center text-Whitesmoke'>{trajet["depart_date"]}</td>
                            <td className='border border-slate-300 px-8 py-2 text-center text-Whitesmoke'>{trajet.depart}</td>
                            <td className='border border-slate-300 px-8 py-2 text-center text-Whitesmoke'>{trajet.destination}</td>
                            <td className='border border-slate-300 px-8 py-2 text-center text-Whitesmoke'>{trajet.places}</td>
                          </tr>
                        ))
                      ) : (
                        <div className="flex h-52 justify-center items-center font-bold text-Whitesmoke">
                          Aucun trajet posté
                        </div>
                      )}
                    </tbody>
                  </table>
                </TabPanel>
                <TabPanel key="reservedRides" value="reservedRides">
                  <table className='table-auto mb-4 bg-Teal border-collapse border border-slate-400'>
                    <thead>
                      <tr>
                        <th className='border border-slate-300 px-8 py-2 text-Whitesmoke'>Date</th>
                        <th className='border border-slate-300 px-8 py-2 text-Whitesmoke'>Départ</th>
                        <th className='border border-slate-300 px-8 py-2 text-Whitesmoke'>Destination</th>
                        <th className='border border-slate-300 px-8 py-2 text-Whitesmoke'>Places restantes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reservedTrajets != 0 ? (
                        reservedTrajets.slice(0,).map((reservation) => (
                          <tr>
                            <td className='border border-slate-300 px-8 py-2 text-center text-Whitesmoke'>{reservation.trajetId.depart_date}</td>
                            <td className='border border-slate-300 px-8 py-2 text-center text-Whitesmoke'>{reservation.trajetId.depart}</td>
                            <td className='border border-slate-300 px-8 py-2 text-center text-Whitesmoke'>{reservation.trajetId.destination}</td>
                            <td className='border border-slate-300 px-8 py-2 text-center text-Whitesmoke'>{reservation.trajetId.places}</td>
                          </tr>
                        ))
                      ) : (
                        <div className="flex justify-center items-center h-52 font-bold text-Whitesmoke">
                          Aucun trajet reservé
                        </div>
                      )}
                    </tbody>
                  </table>
                </TabPanel>
              </TabsBody>
            </Tabs>

          </div>
        </div>
        <div className="flex justify-center items-center bg-Teal max-h-full px-8 py-8 rounded-xl">
          <div className="max-w-full">
            <h4 className="mb-4 text-center text-Whitesmoke font-bold">Réservations</h4>
            <div class="table-wrp block">
              <table className='mb-4 bg-Teal border-collapse border border-slate-400 w-full'>
                <thead className="border-b sticky top-0">
                  <tr>
                    <th className='border border-slate-300 px-8 py-2 text-Whitesmoke'>Utilisateur</th>
                    <th className='border border-slate-300 px-8 py-2 text-Whitesmoke'>Trajet</th>
                    <th className='border border-slate-300 px-8 py-2 text-Whitesmoke'>Date</th>
                    <th className='border border-slate-300 px-8 py-2 text-Whitesmoke'>Validation</th>
                  </tr>
                </thead>
                <tbody className="overflow-y-auto">
                  {userReservations != 0 ? (
                    userReservations.map((reservation) => (
                      <tr>
                        <td className='border border-slate-300 px-8 py-2 text-center text-Whitesmoke'>{reservation.userId.nom} {reservation.userId.prenom}</td>
                        <td className='border border-slate-300 px-8 py-2 text-center text-Whitesmoke'>{reservation.trajetId.depart} - {reservation.trajetId.destination}</td>
                        <td className='border border-slate-300 px-8 py-2 text-center text-Whitesmoke'>{reservation.trajetId.depart_date}</td>
                        <td className='border border-slate-300 px-8 py-2 text-center text-Whitesmoke'>
                          <button className="bg-[#7cc474] hover:bg-[#54b44b] text-white font-bold py-4 px-4 rounded cursor-pointer" onClick={() => handleValider(reservation.userId.id, reservation.trajetId.id)}>
                            Valider
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <div className="flex h-52 justify-center items-center font-bold text-Whitesmoke">
                      Aucune demande de reservation
                    </div>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideHistory;