import React from "react";
// Material.
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  image: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
}));

const Image = ({ artObject }) => {
  const classes = useStyles();
  return <img className={classes.image} src={artObject.primaryImageSmall} />;
};

export default Image;
