import React, { useState, useLayoutEffect, useEffect } from "react";
import { render } from "react-dom";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import "./index.css";

function App() {
  mapboxgl.accessToken = "pk.eyJ1IjoiZmlsaXBhcyIsImEiOiJja2x4dTVoZ2kweHAxMndvNjZ2bjVxcThmIn0.RDd66wk54EmYS4TcXnRPIg";

  const [marker, setMarker] = useState("");
  const [map, setMap] = useState([]);


  useLayoutEffect(() => {
   console.log("Рендер");
   const map = new mapboxgl.Map({
     container: "map",
     style: "mapbox://styles/mapbox/dark-v10",
     center: [37.6173, 55.7558],
     zoom: 20
   });

   const marker = new mapboxgl.Marker()
   .setLngLat([37.6173, 55.7558])
   .addTo(map)
   setMarker(marker);
   setMap(map);

   return () => {};

  }, []);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     console.log("1 sec")
  //     setMarker([10,20]);
  //   }, 1000);
  //
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  const stores = {
    km20: [37.610641, 55.761994],
    belief: [37.601152, 55.733396],
    brandshop: [37.616812, 55.767839]
  };

  function handleChangeSelect(e) {
    marker.setLngLat(stores[e.target.value])
    map.flyTo({
        center: stores[e.target.value],
        essential: true // this animation is considered essential with respect to prefers-reduced-motion
});
  }


  return (
    <>
      <div className="map-overlay">
        <h3>Выберите магазин: </h3>
        <select onChange={handleChangeSelect} >
          <option value="km20">KM20</option>
          <option value="belief">BELIEF</option>
          <option value="brandshop">BRANDSHOP</option>
        </select>
      </div>
      <div id="map"></div>
    </>
  );
}

render(<App />, document.querySelector("#root"));
