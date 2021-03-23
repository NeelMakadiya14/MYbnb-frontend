import { useState } from "react";
import GoogleMap from "google-map-react";
import LocationMarker from "./LocationMarker";

const Map = ({ listingData, history, info }) => {
  var temp = {
    lat: listingData[0].address.location.coordinates[1],
    lng: listingData[0].address.location.coordinates[0],
  };

  console.log(listingData);

  return (
    <div display="flex" style={{ height: "100vh", width: "100%", flex: 1 }}>
      <GoogleMap
        bootstrapURLKeys={{ key: REACT_APP_MAP_API }}
        defaultCenter={temp}
        defaultZoom={15}
      >
        {console.log("center : ", temp)}
        {listingData.map((house, index) => {
          return (
            <LocationMarker
              key={index}
              lat={house.address.location.coordinates[1]}
              lng={house.address.location.coordinates[0]}
              details={house}
              history={history}
              info={info}
            />
          );
        })}
      </GoogleMap>
    </div>
  );
};

export default Map;
