import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import isURL from "validator/lib/isURL";
import {
  Box,
  Button,
  Grommet,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Text,
  TextInput,
} from "grommet";
import { Trash } from "grommet-icons";
import theme from "./theme"

const StyledTextMedium = styled(Text)`
  opacity: 60%;
`;

const StyledTrashMedium = styled(Trash)`
  opacity: 60%;
`;

const App = () => {
  const [pausedURLs, setPausedURLs] = useState([]);

  useEffect(() => {
    const fetchPausedURLs = () => {
      if (localStorage.getItem("pausedURLs")) {
        setPausedURLs(JSON.parse(localStorage.getItem("pausedURLs")));
      }
    };
    fetchPausedURLs();
  }, []);

  useEffect(() => {
    const setPausedURLs = () => {
      localStorage.setItem("pausedURLs", JSON.stringify(pausedURLs));
    };
    setPausedURLs();
  }, [pausedURLs]);

  const addPausedURL = (url) => {
    setPausedURLs((pausedURLs) => [...pausedURLs, url]);
  };

  const deletePausedURL = (url) => {
    setPausedURLs(pausedURLs.filter((item) => item !== url));
  };

  // Controlled form data
  const [website, setWebsite] = useState("");
  const [formError, setFormError] = useState(null);

  const handleAddSiteClick = (url) => {
    if (!isURL(url)) {
      setFormError("Please enter a URL in the format http://example.org/");
      return;
    }
    if (pausedURLs.includes(url)) {
      setFormError(`${url} is already on the list`);
      return;
    }
    addPausedURL(url);
    // Reset form value
    setWebsite("");
  };

  return (
    <Box  align="center" background="dark-2" fill pad="medium">
      <Box background="dark-1" pad="medium" width="large">
        <TextInput
          onChange={(event) => {
            setWebsite(event.target.value);
            setFormError(null);
          }}
          placeholder="Enter a URL"
          value={website}
        />

        {formError && <Text color="status-error">{formError}</Text>}

        <Box direction="row" justify="end" margin={{ top: "medium" }}>
          <Button
            label="Add"
            onClick={() => {
              handleAddSiteClick(website);
            }}
            primary
          />
        </Box>

        <Box margin={{ top: "medium" }} border="top" overflow="auto">
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
      </Box>
    </Box>
  );
};

ReactDOM.render(
  <Grommet full theme={theme}>
    <App />
  </Grommet>,
  document.getElementById("root")
);
