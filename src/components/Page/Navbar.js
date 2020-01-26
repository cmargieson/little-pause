import React, { useState, useEffect } from "react";
// Material.
import { Button, makeStyles, Toolbar } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  toolbarButtons: {
    marginLeft: "auto"
  }
}));

const Navbar = ({ removeApp }) => {
  const classes = useStyles();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 7000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Toolbar>
      {isVisible && (
        <div className={classes.toolbarButtons}>
          <Button onClick={() => removeApp()}>Continue</Button>
        </div>
      )}
    </Toolbar>
  );
};

export default Navbar;
