import axios from "axios";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
const url = process.env.REACT_APP_BACKEND_URL;

export default function LocationSearch(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    const url = process.env.REACT_APP_BACKEND_URL;

    (async () => {
      var option;
      axios
        .get(`${url}/location_list?name=${inputValue}`)
        .then((res) => {
          option = res.data;
          console.log(option);
          if (active) {
            setOptions(Object.keys(option).map((key) => option[key].name));
          }
        })
        .catch((err) => {
          console.error(err);
        });
    })();

    return () => {
      active = false;
    };
  }, [loading, inputValue, setInputValue]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="location"
      style={{ width: "100%" }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option === value}
      onChange={(event, value) => {
        console.log("option : ", value);
        props.setFieldValue("location", value);
      }}
      getOptionLabel={(option) => option}
      options={options}
      loading={loading}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Location"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
