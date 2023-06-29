import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";


const MapRouting = (props) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(props.latDepart, props.lngDepart), L.latLng(props.latArrivee, props.lngArrivee)],
      draggableWaypoints: false,
      language: 'fr',
      addWaypoints: false
    }).addTo(map);
    console.log(map)
    routingControl.on('routesfound', function (e) {
      console.log(e)
			if(props.onDistance){
        props.onDistance(e)
      }
		});
  }, [map]);

  return null;
};
 
export default MapRouting
