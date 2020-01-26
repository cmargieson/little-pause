import React, { useState } from "react";
// Material.
import { Button, makeStyles, TextField } from "@material-ui/core";
// Validator.
import validator from "validator";

const useStyles = makeStyles(theme => ({
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}));

const Form = ({ addPausedSite }) => {
  const classes = useStyles();

  const [site, setSite] = useState("");
  const [formErrors, setFormErrors] = useState(null);

  const handleAddSiteChange = event => {
    setSite(event.target.value);
    setFormErrors(null);
  };

  const handleAddSiteClick = () => {
    if (validator.isURL(site)) {
      addPausedSite(site);
    } else {
      setFormErrors("Please enter a valid URL");
    }
  };

  return (
    <>
      <TextField
        error={!!formErrors}
        helperText={formErrors && formErrors ? formErrors : ""}
        label="Site"
        onChange={event => handleAddSiteChange(event)}
        required
        type="url"
        fullWidth
      />
      <div className={classes.buttons}>
        <Button
          className={classes.button}
          color="primary"
          onClick={() => handleAddSiteClick()}
          variant="contained"
        >
          Add
        </Button>
      </div>
    </>
  );
};

export default Form;
