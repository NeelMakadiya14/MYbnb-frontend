import React, { useEffect, useState } from "react";
import queryString from "query-string";
import Map from "../Components/Map";
import axios from "axios";
import Loader from "../Components/Loader";
import DisplayDetails from "../Components/DisplayDetails";

export default function Details(props) {
  const _id = props.match.params.ID;
  var info = queryString.parse(props.location.search);

  console.log(info);

  const obj = { _id };

  const [Data, setData] = useState();

  const url = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${url}/getdetails?` + queryString.stringify(obj))
      .then((res) => {
        setData(res.data);
        console.log(Data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      {Data ? (
        <DisplayDetails data={Data} info={info} history={props.history} />
      ) : (
        <Loader />
      )}
    </div>
  );
}
