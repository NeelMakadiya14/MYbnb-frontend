import React, { useEffect, useState } from "react";
import queryString from "query-string";
import Map from "../Components/Map";
import axios from "axios";
import Loader from "../Components/Loader";

export default function SearchResult(props) {
  //  console.log(queryString.parse(props.location.search));
  //  console.log(props.match.params.place);
  var obj = queryString.parse(props.location.search);
  const location_name = props.match.params.place;

  obj = { ...obj, location_name };

  console.log(obj);

  const [listingData, setListingData] = useState();

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/available_house?` + queryString.stringify(obj)
      )
      .then((res) => {
        setListingData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {console.log("reRendering.....")}
      {!listingData ? (
        <Loader />
      ) : (
        <Map listingData={listingData} history={props.history} info={obj} />
      )}
      {console.log("Hey : ", listingData)}
    </div>
  );
}
