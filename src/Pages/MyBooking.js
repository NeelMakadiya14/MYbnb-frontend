import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Paper, Typography, TextField, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "../Components/Loader";

export default function MyBooking(props) {
  const email = props.match.params.email;

  const url = process.env.REACT_APP_BACKEND_URL;

  const [Data, setData] = useState();

  const DisplayBooking = () => {
    const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
      },
    }));

    console.log(Data);
    const classes = useStyles();

    return (
      <Grid
        container
        container
        spacing={9}
        style={{ backgroundColor: "Azure", height: 100 + "vh", padding: "2%" }}
      >
        {Data.bookings.map((booking, i) => {
          return (
            <Grid key={i} item xs={4}>
              <Paper className={classes.paper}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="checkIn"
                      label="Check In"
                      type="date"
                      color="Black"
                      defaultValue={booking.bookingsID.stay.from}
                      className={classes.textField}
                      disabled={true}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="checkOut"
                      label="Check Out"
                      type="date"
                      color="Black"
                      defaultValue={booking.bookingsID.stay.to}
                      className={classes.textField}
                      disabled={true}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography
                      variant="body1"
                      gutterBottom
                    >{`Total People : ${booking.bookingsID.total_people}`}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">{`At : ${booking.listingID.name}`}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1" gutterBottom>
                      {booking.listingID.address.street}
                    </Typography>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1" color="inherit" gutterBottom>
                      {`Total Amount: ${booking.bookingsID.total_price}`}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  useEffect(() => {
    axios
      .get(`${url}/mybookings?email=${email}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {Data ? <DisplayBooking /> : <Loader />}
    </div>
  );
}
