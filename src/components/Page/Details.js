import React from "react";
// Material.
import {
  Box,
  Link,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography
} from "@material-ui/core";

const truncate = (string, n, useWordBoundary) => {
  if (string.length <= n) {
    return string;
  }
  var subString = string.substr(0, n - 1);
  return (
    (useWordBoundary
      ? subString.substr(0, subString.lastIndexOf(" "))
      : subString) + "..."
  );
};

const Details = ({ artObject }) => {
  return (
    <>
      <Typography gutterBottom component="h1" variant="h2" color="textPrimary">
        {truncate(artObject.title, 60, true)};
      </Typography>
      <Typography variant="h5" color="textSecondary" paragraph>
        {artObject.objectDate}
      </Typography>
      {artObject.artistDisplayName && artObject.artistDisplayBio && (
        <Typography gutterBottom variant="h5" color="textSecondary" paragraph>
          {`${artObject.artistDisplayName} (${artObject.artistDisplayBio})`}
        </Typography>
      )}
      <Table>
        <TableBody>
          {artObject.artistDisplayName && (
            <TableRow>
              <TableCell>
                <Box fontWeight="fontWeightBold">Artist:</Box>
              </TableCell>
              <TableCell>{artObject.artistDisplayName}</TableCell>
            </TableRow>
          )}
          {artObject.objectDate && (
            <TableRow>
              <TableCell>
                <Box fontWeight="fontWeightBold">Date:</Box>
              </TableCell>
              <TableCell>{artObject.objectDate}</TableCell>
            </TableRow>
          )}
          {artObject.medium && (
            <TableRow>
              <TableCell>
                <Box fontWeight="fontWeightBold">Medium:</Box>
              </TableCell>
              <TableCell>{artObject.medium}</TableCell>
            </TableRow>
          )}
          {artObject.dimensions && (
            <TableRow>
              <TableCell>
                <Box fontWeight="fontWeightBold">Dimensions:</Box>
              </TableCell>
              <TableCell>{artObject.dimensions}</TableCell>
            </TableRow>
          )}
          {artObject.classification && (
            <TableRow>
              <TableCell>
                <Box fontWeight="fontWeightBold">Classification:</Box>
              </TableCell>
              <TableCell>{artObject.classification}</TableCell>
            </TableRow>
          )}
          {artObject.creditLine && (
            <TableRow>
              <TableCell>
                <Box fontWeight="fontWeightBold">Credit Line:</Box>
              </TableCell>
              <TableCell>{artObject.creditLine}</TableCell>
            </TableRow>
          )}
          {artObject.rightsAndReproduction && (
            <TableRow>
              <TableCell>
                <Box fontWeight="fontWeightBold">Rights and Reproduction:</Box>
              </TableCell>
              <TableCell>{artObject.rightsAndReproduction}</TableCell>
            </TableRow>
          )}
          {artObject.repository && artObject.objectURL && (
            <TableRow>
              <TableCell>
                <Box fontWeight="fontWeightBold">Repository:</Box>
              </TableCell>
              <TableCell>
                <Link href={artObject.objectURL} target="_blank">
                  {artObject.repository}
                </Link>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default Details;
