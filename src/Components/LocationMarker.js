import React, { useState } from "react";
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const LocationMarker = (props) => {
  // const [hover, setHover] = userState(false);

  // const onHover = ()=>{
  //     setHover(true);
  // }

  // const onLeave = ()=>{
  //   setHover(false);
  // }

  const handleClick = () => {
    props.history.push(
      `/details/${props.details._id}?checkIn=${props.info.checkIn}&checkOut=${props.info.checkOut}&guest=${props.info.guest}`
    );
  };

  const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }))(Tooltip);

  return (
    <div
      className="location-marker"
      // onMouseEnter={onHover}
      //   onMouseLeave={onLeave}
    >
      <HtmlTooltip
        title={
          <React.Fragment>
            <Typography color="inherit">{props.details.name}</Typography>
            <em>{"Bedrooms: "}</em> <b>{props.details.bedrooms}</b>{" "}
            <em>{" & Beds: "}</em> <b>{props.details.beds}</b> <br />
            {props.details.address.street}
          </React.Fragment>
        }
      >
        <Chip
          size="small"
          label={props.details.price + " $"}
          clickable
          color="primary"
          onClick={handleClick}
        />
      </HtmlTooltip>
    </div>
  );
};

export default LocationMarker;
