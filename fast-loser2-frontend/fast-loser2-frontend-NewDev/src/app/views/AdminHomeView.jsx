import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL_BACK } from '../constants/urls/urlBackEnd';
import { Line } from 'react-chartjs-2';
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import { Chart } from 'chart.js';

const AdminHomeView = () => {
  const [userAdmin, setUserAdmin] = useState([]);
  const [userUtilisateur, setUserUtilisateur] = useState([]);
  const [trajets, setTrajets] = useState([]);
  const [alert, setAlert] = useState([]);
  const [contact, setContact] = useState([]);
  const [userList, setUserList] = useState([]);
  const [userDataArray, setUserDataArray] = useState([]);
  const [rideDataArray, setRideDataArray] = useState([]);
  const [rideList, setRideList] = useState([]);

  Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

  let userArray0 = [];
  let userArray1 = [];
  let userArray2 = [];
  let userArray3 = [];
  let userArray4 = [];
  let userArray5 = [];
  let userArray6 = [];
  let userArray7 = [];
  let userArray8 = [];
  let userArray9 = [];
  let userArray10 = [];
  let userArray11 = [];
  let rideArray0 = [];
  let rideArray1 = [];
  let rideArray2 = [];
  let rideArray3 = [];
  let rideArray4 = [];
  let rideArray5 = [];
  let rideArray6 = [];
  let rideArray7 = [];
  let rideArray8 = [];
  let rideArray9 = [];
  let rideArray10 = [];
  let rideArray11 = [];

  let userSorter = () => {
    for (let i = 0; i < userList.length; i++) {
      switch (userList[i].date_inscrit.split('-')[1]) {
        case '01':
          userArray0.push(userList[i]);
          break;
        case '02':
          userArray1.push(userList[i]);
          break;
        case '03':
          userArray2.push(userList[i]);
          break;
        case '04':
          userArray3.push(userList[i]);
          break;
        case '05':
          userArray4.push(userList[i]);
          break;
        case '06':
          userArray5.push(userList[i]);
          break;
        case '07':
          userArray6.push(userList[i]);
          break;
        case '08':
          userArray7.push(userList[i]);
          break;
        case '09':
          userArray8.push(userList[i]);
          break;
        case '10':
          userArray9.push(userList[i]);
          break;
        case '11':
          userArray10.push(userList[i]);
          break;
        case '12':
          userArray11.push(userList[i]);
          break;

        default:
          break;
      }
    }
    setUserDataArray([
      userArray0.length.toString(),
      userArray1.length.toString(),
      userArray2.length.toString(),
      userArray3.length.toString(),
      userArray4.length.toString(),
      userArray5.length.toString(),
      userArray6.length.toString(),
      userArray7.length.toString(),
      userArray8.length.toString(),
      userArray9.length.toString(),
      userArray10.length.toString(),
      userArray11.length.toString(),
    ]);
  };

  let rideSorter = () => {
    for (let i = 0; i < rideList.length; i++) {
      switch (rideList[i].depart_date.split('-')[1]) {
        case '01':
          rideArray0.push(rideList[i]);
          break;
        case '02':
          rideArray1.push(rideList[i]);
          break;
        case '03':
          rideArray2.push(rideList[i]);
          break;
        case '04':
          rideArray3.push(rideList[i]);
          break;
        case '05':
          rideArray4.push(rideList[i]);
          break;
        case '06':
          rideArray5.push(rideList[i]);
          break;
        case '07':
          rideArray6.push(rideList[i]);
          break;
        case '08':
          rideArray7.push(rideList[i]);
          break;
        case '09':
          rideArray8.push(rideList[i]);
          break;
        case '10':
          rideArray9.push(rideList[i]);
          break;
        case '11':
          rideArray10.push(rideList[i]);
          break;
        case '12':
          rideArray11.push(rideList[i]);
          break;

        default:
          break;
      }
    }
    setRideDataArray([
      rideArray0.length.toString(),
      rideArray1.length.toString(),
      rideArray2.length.toString(),
      rideArray3.length.toString(),
      rideArray4.length.toString(),
      rideArray5.length.toString(),
      rideArray6.length.toString(),
      rideArray7.length.toString(),
      rideArray8.length.toString(),
      rideArray9.length.toString(),
      rideArray10.length.toString(),
      rideArray11.length.toString(),
    ]);
  };

  const userData = {
    labels: [
      'Janvier',
      'Fevrier',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Aout',
      'Septembre',
      'Octobre',
      'Novembre',
      'Decembre',
    ],
    datasets: [
      {
        label: 'Inscriptions',
        data: userDataArray,
        borderColor: 'red',
      },
    ],
    options: {
      scales: {
        x: {
          type: 'categoryAxis',
          labels: [
            'Janvier',
            'Fevrier',
            'Mars',
            'Avril',
            'Mai',
            'Juin',
            'Juillet',
            'Aout',
            'Septembre',
            'Octobre',
            'Novembre',
            'Decembre',
          ],
        },
      },
    },
  };
  const rideData = {
    labels: [
      'Janvier',
      'Fevrier',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Aout',
      'Septembre',
      'Octobre',
      'Novembre',
      'Decembre',
    ],
    datasets: [
      {
        label: 'Trajets postés',
        data: rideDataArray,
        borderColor: 'red',
      },
    ],
    options: {
      scales: {
        x: {
          type: 'categoryAxis',
          labels: [
            'Janvier',
            'Fevrier',
            'Mars',
            'Avril',
            'Mai',
            'Juin',
            'Juillet',
            'Aout',
            'Septembre',
            'Octobre',
            'Novembre',
            'Decembre',
          ],
        },
      },
    },
  };

  useEffect(() => {
    userSorter();
    rideSorter();
  }, [userList, rideList]);

  useEffect(() => {
    axios
      .get(URL_BACK + '/api/users')
      .then((res) => setUserList(res.data['hydra:member']));
    axios
      .get(URL_BACK + '/api/trajets')
      .then((res) => setRideList(res.data['hydra:member']));
  }, []);

  useEffect(() => {
    async function fetchUser() {
      const resultUserAdmin = await axios.get(URL_BACK + '/get/user_admin');
      const resultUserUser = await axios.get(URL_BACK + '/get/user_user');
      const resultAlert = await axios.get(URL_BACK + '/api/alerts');
      const resultContact = await axios.get(URL_BACK + '/api/contacts');
      const resultTrajets = await axios.get(URL_BACK + '/api/trajets');

      setUserAdmin(resultUserAdmin.data);
      setUserUtilisateur(resultUserUser.data);
      setTrajets(resultTrajets.data['hydra:member'].reverse());
      setAlert(resultAlert.data['hydra:member']);
      setContact(resultContact.data['hydra:member']);
      console.log(resultUserAdmin, resultUserUser);
    }
    fetchUser();
  }, []);

  return (
    <div className="h-[90vh] w-full bg-Moonstone">
      <h1 className="text-center mb-4 p-2 text-white">Tableau de bord</h1>
      <div className="flex w-full justify-around items-center pb-8 h-fit my-auto">
        <div className="bg-blueBg w-2/12 h-72 overflow-y-auto py-2 px-4 text-center items-center rounded">
          <h4 className="text-white mb-3">Administrateurs</h4>
          <div className="bg-MintGreen h-52 rounded">
            {userAdmin != 0 ? (
              <div className="flex h-52 justify-center items-center">
                <div className="w-full">
                  <div className="text-5xl font-bold">{userAdmin.length}</div>
                </div>
              </div>
            ) : (
              <div className="flex h-52 justify-center items-center">
                Chargement...
              </div>
            )}
          </div>
        </div>
        <div className="bg-blueBg w-2/12 h-72 overflow-y-auto py-2 px-4 text-center items-center rounded">
          <h4 className="text-white mb-3">Utilisateurs</h4>
          <div className="bg-MintGreen h-52 rounded">
            {userAdmin != 0 ? (
              <div className="flex h-52 justify-center items-center">
                <div className="w-full">
                  <div className="text-5xl font-bold">
                    {userUtilisateur.length}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-52 justify-center items-center">
                Chargement...
              </div>
            )}
          </div>
        </div>
        <div className="bg-blueBg w-2/12 h-72 overflow-y-auto py-2 px-4 text-center items-center rounded">
          <h4 className="text-white mb-3">Alertes</h4>
          <div className="bg-MintGreen h-52 rounded">
            {alert != 0 ? (
              <div className="flex h-52 justify-center items-center">
                <div className="w-full">
                  <div className="text-5xl font-bold">{alert.length}</div>
                </div>
              </div>
            ) : (
              <div className="flex h-52 justify-center items-center text-3xl font-bold">
                Aucune alertes
              </div>
            )}
          </div>
        </div>
        <div className="bg-blueBg w-2/12 h-72 overflow-y-auto py-2 px-4 text-center items-center rounded">
          <h4 className="text-white mb-3">Messages</h4>
          <div className="bg-MintGreen h-52 rounded">
            {contact != 0 ? (
              <div className="flex h-52 justify-center items-center">
                <div className="w-full">
                  <div className="text-5xl font-bold">{contact.length}</div>
                </div>
              </div>
            ) : (
              <div className="flex h-52 justify-center items-center">
                Chargement...
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex w-full justify-around">
        <div className="w-[700px] text-center">
          <h4 className="text-white mb-4 font-bold">Inscriptions</h4>
          <div className="h-[365px] p-4 w-full bg-white rounded">
            <Line data={userData} />
          </div>
        </div>

        <div className="w-[700px] text-center">
          <h4 className="text-white mb-4 font-bold">Trajets postés</h4>
          <div className="h-[365px] p-4 w-full bg-white rounded">
            <Line data={rideData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomeView;