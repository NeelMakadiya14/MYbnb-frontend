import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  Paper,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Divider,
  TextField,
  Button,
  Alert,
  Snackbar,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { Cookies } from "react-cookie";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    // textAlign: "start",
    // color: theme.palette.text.secondary,
    marginTop: theme.spacing(3),
    marginRight: "10%",
    marginLeft: "10%",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  innerPaper: {
    padding: theme.spacing(2),
    margin: theme.spacing(6),
    display: "flex",
  },
}));

export default function DisplayDetails(props) {
  const classes = useStyles();

  console.log("DD : ", props.data);

  const [open, setOpen] = useState(false);

  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date(props.info.checkIn);
  const secondDate = new Date(props.info.checkOut);

  const days = Math.round(Math.abs((firstDate - secondDate) / oneDay));
  console.log(days);

  const cookies = new Cookies();
  const userCookie = cookies.get("userCookie");

  const obj = {
    listing_id: props.data._id,
    total_price:
      days * props.data.price * props.info.guest + props.data.cleaning_fee,
    total_people: props.info.guest,
    stay: {
      from: props.info.checkIn,
      to: props.info.checkOut,
    },
  };

  const booking = () => {
    axios
      .post(`http://localhost:5000/booking?email=${userCookie.email}`, obj)
      .then((res) => {
        console.log(res);
        setOpen(true);
      });
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    setOpen(false);
    props.history.push("/");
  };

  return (
    <React.Fragment>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Congratulations!! Booking Confirmed..
        </Alert>
      </Snackbar>
      <Paper className={classes.paper}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={6}>
            <img src={props.data.images.picture_url} alt="new" />
          </Grid>
          <Grid item xs={6}>
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              {props.data.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {`${props.data.bedrooms} Bedrooms \uFF65 ${props.data.beds} Beds \uFF65 ${props.data.bed_type} \uFF65 ${props.data.bathrooms} Bathrooms`}
            </Typography>
            <Divider />
            <Typography variant="h5" color="inherit" gutterBottom>
              Description :
            </Typography>
            <Typography variant="subtitle1" color="inherit" gutterBottom>
              {props.data.description}
            </Typography>
          </Grid>
          <Divider />
          <Grid item xs={8}>
            {props.data.space ? (
              <div>
                <Typography variant="h6" color="inherit">
                  {"\u2022"} Space :
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  paragraph
                  gutterBottom
                >
                  {props.data.space}
                </Typography>
              </div>
            ) : null}
            {props.data.notes ? (
              <div>
                <Typography variant="h6" color="inherit">
                  {"\u2219"} Notes :
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  paragraph
                  gutterBottom
                >
                  {props.data.notes}
                </Typography>
              </div>
            ) : null}
            {props.data.house_rules ? (
              <div>
                <Typography variant="h6" color="inherit">
                  {"\u2022"} Rules :
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  paragraph
                  gutterBottom
                >
                  {props.data.house_rules}
                </Typography>
              </div>
            ) : null}
            {props.data.cancellation_policy ? (
              <div>
                <Typography variant="h6" color="inherit">
                  {"\u2022"} Cancellation Policy :{" "}
                  {props.data.cancellation_policy}
                </Typography>
              </div>
            ) : null}
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.innerPaper}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="checkIn"
                    label="Check In"
                    type="date"
                    color="Black"
                    defaultValue={props.info.checkIn}
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
                    defaultValue={props.info.checkOut}
                    className={classes.textField}
                    disabled={true}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="guests"
                    label="Guests"
                    color="Black"
                    defaultValue={props.info.guest}
                    className={classes.textField}
                    disabled={true}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <br />
                  <u>{`${days} Nights x ${props.info.guest} Gests x ${
                    props.data.price
                  } = ${days * props.data.price * props.info.guest}`}</u>

                  <br />
                </Grid>
                <Grid item xs={12}>
                  <u>{`Service Charge = ${props.data.cleaning_fee}`}</u>
                  <br />
                  <br />
                </Grid>
                <Divider />
                <Grid item xs={12}>
                  <Typography variant="body1" color="inherit" gutterBottom>
                    {`Total : ${
                      days * props.data.price * props.info.guest +
                      props.data.cleaning_fee
                    }`}
                  </Typography>
                </Grid>
                <Button color="primary" onClick={booking}>
                  Book
                </Button>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
}
