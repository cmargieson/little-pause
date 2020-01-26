import React from "react";
// Components.
import Navbar from "./Navbar";
import Image from "./Image";
import Details from "./Details";
// Material.
import { Grid } from "@material-ui/core";

const Page = ({ artObject, removeApp }) => {
  return (
    <>
      <Navbar removeApp={removeApp} />
      <Grid container justify="center" alignItems="center">
        <Grid item sm={12} md={6}>
          <Image artObject={artObject} />
        </Grid>
        <Grid item sm={12} md={6}>
          <Details artObject={artObject} />
        </Grid>
      </Grid>
    </>
  );
};

export default Page;
