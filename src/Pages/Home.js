import React from "react";
import bg2 from "../Images/2.jpg";
import Grid from "@material-ui/core/Grid";
import { Formik } from "formik";
import axios from "axios";
import queryString from "query-string";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  Button,
  TextField,
  FormControl,
} from "@material-ui/core";
import { Cookies } from "react-cookie";
import LocationSearch from "../Components/LocationSearch";

export default function Home(props) {
  const cookies = new Cookies();
  const userCookie = cookies.get("userCookie");
  const email = userCookie.email;

  return (
    <div>
      <Grid
        container
        alignContent="center"
        direction="row"
        style={{
          backgroundImage: `url(${bg2})`,
          height: "100vh",
          backgroundPosition: "center",
          backgroundRepeat: " no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Grid item xs={1}></Grid>

        <Grid xs={3} container justify="center" alignItems="center">
          <button
            variant="contained"
            color="primary"
            onClick={() => {
              props.history.push(`/mybookings/${email}`);
            }}
            style={{ margin: "3%" }}
          >
            My Bookings
          </button>
          <Formik
            initialValues={{
              location: "",
              checkIn: "",
              checkOut: "",
              guest: "",
            }}
            validate={(values) => {
              const errors = {};
              return errors;
            }}
            onSubmit={async (values) => {
              console.log("Values : ", values);
              props.history.push(
                `/results/${values.location}?checkIn=${values.checkIn}&checkOut=${values.checkOut}&guest=${values.guest}`
              );
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <FormControl fullWidth>
                  {/* {console.log("ACAD : ",values)} */}
                  <Card style={{ marginLeft: "10%" }}>
                    <CardContent>
                      <Grid
                        container
                        spacing={3}
                        style={{
                          backgroundColor: "whiteSmoke",
                        }}
                      >
                        <Grid item xs={12}>
                          <Typography
                            style={{
                              fontFamily: "Julius Sans One",
                              fontSize: 30 + "px",
                              color: "black",
                            }}
                          >
                            Book unique places to stay and things to do.
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <LocationSearch
                            values={values}
                            setFieldValue={setFieldValue}
                          />
                          {/* <TextField
                            id="location"
                            name="location"
                            label="Location (Anywhere)"
                            fullWidth
                            value={values.location}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          /> */}
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            id="checkIn"
                            name="checkIn"
                            label="Check In"
                            fullWidth
                            type="date"
                            value={values.checkIn}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            id="checkOut"
                            name="checkOut"
                            label="Check Out"
                            fullWidth
                            type="date"
                            value={values.checkOut}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            id="guest"
                            name="guest"
                            label="Number of Guests"
                            fullWidth
                            value={values.guest}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Grid>
                        <Grid container justify="center" alignItems="center">
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{ marginTop: "3%", marginBottom: "3%" }}
                          >
                            Search
                          </Button>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </FormControl>
              </form>
            )}
          </Formik>
        </Grid>
        <Grid
          item
          xs={8}
          // style={{ minHeight: 100 + "%", minWidth: 58.1 + "vh" }}
        ></Grid>
      </Grid>
    </div>
  );
}
