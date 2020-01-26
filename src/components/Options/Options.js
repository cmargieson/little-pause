import React, { useState, useEffect } from "react";
// Material.
import {
  IconButton,
  Link,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";
// Components.
import Form from "./Form";

const useStyles = makeStyles(theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  }
}));

const Copyright = () => (
  <>
    <Typography variant="body2" color="textSecondary" align="center">
      <Link color="inherit" href="https://github.com/cmargieson">
        Contribute on GitHub
      </Link>
    </Typography>

    <Typography variant="body2" color="textSecondary" align="center">
      {"Icon by "}
      <Link color="inherit" href="https://www.iconfinder.com/kirill.kazachek">
        Kirill Kazachek
      </Link>
    </Typography>
  </>
);

const Options = () => {
  const classes = useStyles();

  const getPausedSites = () => {
    const data = window.localStorage.getItem("littlePauseSites");
    if (!data) {
      return [];
    }
    return JSON.parse(data);
  };

  const [pausedSites, setPausedSites] = useState(getPausedSites());

  useEffect(() => {
    window.localStorage.setItem(
      "littlePauseSites",
      JSON.stringify(pausedSites)
    );
  }, [pausedSites]);

  const addPausedSite = site => {
    setPausedSites(pausedSites => [...pausedSites, site]);
  };

  const deletePausedSite = site => {
    setPausedSites(pausedSites.filter(item => item !== site));
  };

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Little Pause Options
        </Typography>

        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Form
                    addPausedSite={addPausedSite}
                    deletePausedSite={deletePausedSite}
                  />
                </TableCell>
              </TableRow>
              {pausedSites.map(site => (
                <TableRow key={site}>
                  <TableCell component="th" scope="row">
                    {site}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        deletePausedSite(site);
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Copyright />
    </main>
  );
};

export default Options;
