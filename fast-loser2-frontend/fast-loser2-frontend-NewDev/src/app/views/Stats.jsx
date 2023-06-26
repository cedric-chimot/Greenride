import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { URL_BACK } from '../constants/urls/urlBackEnd';
import { Line, Pie } from 'react-chartjs-2';
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
} from 'chart.js';
import { Chart } from 'chart.js';

const Stats = () => {
  const [userList, setUserList] = useState([]);
  const [userDataArray, setUserDataArray] = useState([]);
  const [rideDataArray, setRideDataArray] = useState([]);
  const [alertDataArray, setAlertDataArray] = useState([]);
  const [annonceDataArray, setAnnonceDataArray] = useState([]);
  const [alertList, setAlertList] = useState([]);
  const [rideList, setRideList] = useState([]);
  const [annonceList, setAnnonceList] = useState([]);

  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement
  );

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
  let annonceArray0 = [];
  let annonceArray1 = [];
  let annonceArray2 = [];
  let annonceArray3 = [];
  let annonceArray4 = [];
  let annonceArray5 = [];
  let annonceArray6 = [];
  let annonceArray7 = [];
  let annonceArray8 = [];
  let annonceArray9 = [];
  let annonceArray10 = [];
  let annonceArray11 = [];
  let alertArray0 = [];
  let alertArray1 = [];
  let alertArray2 = [];
  let alertArray3 = [];
  let alertArray4 = [];

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

  let annonceSorter = () => {
    for (let i = 0; i < annonceList.length; i++) {
      if (annonceList[i].date_achat != null) {
        switch (annonceList[i].date_achat.split('-')[1]) {
          case '01':
            annonceArray0.push(annonceList[i]);
            break;
          case '02':
            annonceArray1.push(annonceList[i]);
            break;
          case '03':
            annonceArray2.push(annonceList[i]);
            break;
          case '04':
            annonceArray3.push(annonceList[i]);
            break;
          case '05':
            annonceArray4.push(annonceList[i]);
            break;
          case '06':
            annonceArray5.push(annonceList[i]);
            break;
          case '07':
            annonceArray6.push(annonceList[i]);
            break;
          case '08':
            annonceArray7.push(annonceList[i]);
            break;
          case '09':
            annonceArray8.push(annonceList[i]);
            break;
          case '10':
            annonceArray9.push(annonceList[i]);
            break;
          case '11':
            annonceArray10.push(annonceList[i]);
            break;
          case '12':
            annonceArray11.push(annonceList[i]);
            break;

          default:
            break;
        }
      }
    }

    console.log(annonceArray5);

    let allAnnoncesArray = [
      annonceArray0,
      annonceArray1,
      annonceArray2,
      annonceArray3,
      annonceArray4,
      annonceArray5,
      annonceArray6,
      annonceArray7,
      annonceArray8,
      annonceArray9,
      annonceArray10,
      annonceArray11,
    ];

    console.log(allAnnoncesArray);

    setAnnonceDataArray([
      totalCalculator(annonceArray0),
      totalCalculator(annonceArray1),
      totalCalculator(annonceArray2),
      totalCalculator(annonceArray3),
      totalCalculator(annonceArray4),
      totalCalculator(annonceArray5),
      totalCalculator(annonceArray6),
      totalCalculator(annonceArray7),
      totalCalculator(annonceArray8),
      totalCalculator(annonceArray9),
      totalCalculator(annonceArray10),
      totalCalculator(annonceArray11),
    ]);
  };

  let alertSorter = () => {
    for (let i = 0; i < alertList.length; i++) {
      switch (alertList[i].reason) {
        case 'Retard':
          alertArray0.push(alertList[i]);
          break;
        case 'Conducteur pas venu':
          alertArray1.push(alertList[i]);
          break;
        case 'Passager déposé au mauvais endroit':
          alertArray2.push(alertList[i]);
          break;
        case 'Insultes':
          alertArray3.push(alertList[i]);
          break;
        case 'Conduite dangereuse':
          alertArray4.push(alertList[i]);
          break;

        default:
          break;
      }
    }
    setAlertDataArray([
      alertArray0.length.toString(),
      alertArray1.length.toString(),
      alertArray2.length.toString(),
      alertArray3.length.toString(),
      alertArray4.length.toString(),
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
      'Ocotbre',
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
            'Ocotbre',
            'Novembre',
            'Decembre',
          ],
        },
      },
    },
  };

  const alertData = {
    labels: [
      'Retard',
      "Le conducteur n'est pas venu",
      'Passager déposé au mauvais endroit',
      'Insultes',
      'Conduite dangereuse',
    ],
    datasets: [
      {
        data: alertDataArray,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
      },
    ],
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };
  
  const annonceData = {
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
      'Octotbre',
      'Novembre',
      'Decembre',
    ],
    datasets: [
      {
        label: 'Tokens achetés',
        data: annonceDataArray,
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
            'Octotbre',
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
      'Octotbre',
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
            'Octotbre',
            'Novembre',
            'Decembre',
          ],
        },
      },
    },
  };

  let totalCalculator = (param) => {
    let result = 0;
    for (let i = 0; i < param.length; i++) {
      console.log(param[i].tokens);
      result += Number(param[i].nb_tokens);
    }
    return result;
  };

  useEffect(() => {
    userSorter();
    alertSorter();
    rideSorter();
    annonceSorter();
  }, [userList, rideList, alertList, annonceList]);

  useEffect(() => {
    axios
      .get(URL_BACK + '/api/users')
      .then((res) => setUserList(res.data['hydra:member']));
    axios
      .get(URL_BACK + '/api/trajets')
      .then((res) => setRideList(res.data['hydra:member']));
    axios
      .get(URL_BACK + '/api/alerts')
      .then((res) => setAlertList(res.data['hydra:member']));
    axios
      .get(URL_BACK + '/api/annonces')
      .then((res) => setAnnonceList(res.data['hydra:member']));
  }, []);

  return (
    <div className="h-[90vh] bg-[#04ACBE] text-white text-center p-8">
      <div className="flex w-full justify-around">
        <div className="w-[630px]">
          <h4 className="mb-4 font-bold">Inscriptions</h4>
          <div className=" p-2 w-full bg-white rounded">
            <Line data={userData} />
          </div>
        </div>

        <div className="w-[630px]">
          <h4 className="mb-4 font-bold">Trajets effectués</h4>
          <div className=" p-2 w-full bg-white rounded">
            <Line data={rideData} />
          </div>
        </div>
      </div>
      <div className="flex justify-around mt-8">
        {' '}
        <div className="w-[630px]  ">
          <h4 className="mb-4 font-bold">Signalements par motif</h4>
          <div className="flex justify-around items-center bg-white rounded">
            <div className=" flex items-center p-4 w-[310px]  ">
              <Pie data={alertData} />
            </div>
            <div className="text-black text-left text-xl">
              {alertData.labels.map((label, index) => (
                <div key={index} className="mb-2">
                  <span
                    className="w-[12px] h-[12px] mr-4 inline-block"
                    style={{
                      backgroundColor:
                        alertData.datasets[0].backgroundColor[index],
                    }}
                  ></span>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-[630px]">
          <h4 className="mb-4 font-bold">Tokens achetés</h4>
          <div className=" p-2 w-full bg-white rounded">
            <Line data={annonceData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
