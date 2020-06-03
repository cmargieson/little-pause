import React from "react";
import styled from "styled-components";
import {
  Box,
  Button,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Text,
} from "grommet";
import { Trash } from "grommet-icons";

const StyledHeadingMedium = styled(Heading)`
  opacity: 60%;
`;

const StyledTextMedium = styled(Text)`
  opacity: 60%;
`;

const StyledTrashMedium = styled(Trash)`
  opacity: 60%;
`;

const PausedUrls = ({ pausedURLs, deletePausedURL }) => {
  return (
    <>
      <StyledHeadingMedium level={3}>Paused URLs:</StyledHeadingMedium>
      <Box overflow="auto">
        <Table>
          <TableBody>
            {pausedURLs.map((url) => (
              <TableRow key={url}>
                <TableCell>
                  <StyledTextMedium size="large">{url}</StyledTextMedium>
                </TableCell>
                <TableCell>
                  <Button
                    icon={<StyledTrashMedium />}
                    onClick={() => deletePausedURL(url)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
};

export default PausedUrls;
