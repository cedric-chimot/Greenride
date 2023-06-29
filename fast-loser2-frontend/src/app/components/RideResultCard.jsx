import React from 'react';
import '../assets/styles/components/card.css';

const RideResultCard = (props) => {
  return (
    <li className="border-b-2 border-white py-3 text-white font-normal">
      <div className="grid grid-cols-[1fr,200px]">
        <div>
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full bg-slate-500 mr-4" />
            <h3 className="text-2xl">
              <span className="text-3xl font-bold">{props.conducteur}</span>{' '}
              propose ce trajet le {props.date}
            </h3>
          </div>

          <div className=" mt-5">
            <div className="grid grid-cols-[40%,20%,40%]">
              <div>
                <p className="m-auto font-bold px-4 mb-2">{props.depart}</p>
                <p className="m-auto font-bold px-4">{props.departHour}</p>
              </div>
              <div className="arrow" />
              <div className="flex items-center">
                <p className="mx-auto pl-10 font-bold px-4">
                  {props.destination}
                </p>
              </div>
            </div>
          </div>
        </div>

        <button className="bg-[#7cc474] hover:bg-[#54b44b] tracking-wider text-white font-extrabold py-2 px-4 rounded w-full cursor-pointer h-10 m-auto">
          En savoir plus
        </button>
      </div>
    </li>
  );
};

export default RideResultCard;
