import React, { useState, useEffect } from "react";
import styled from "styled-components";
import isURL from "validator/lib/isURL";
import { Box, Button, Heading, Text, TextInput } from "grommet";
import UrlList from "./UrlList";

const StyledHeadingMedium = styled(Heading)`
  opacity: 60%;
`;

const UrlInput = () => {
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
  const [url, setUrl] = useState("");
  const [formError, setFormError] = useState(null);

  const handleClick = () => {
    if (!isURL(url)) {
      setFormError("Please enter a URL in the format http://example.org/");
      return;
    }
    if (pausedURLs.includes(url)) {
      setFormError(`${url} is already on the list`);
      return;
    }
    addPausedURL(url);
    // Reset form
    setUrl("");
    setFormError(null);
  };

  return (
    <Box pad="medium" margin="small" border>
      <StyledHeadingMedium level={3}>URLs to pause:</StyledHeadingMedium>

      <TextInput
        onChange={(event) => setUrl(event.target.value)}
        placeholder="Enter a URL"
        value={url}
      />

      {formError && <Text color="status-error">{formError}</Text>}

      <Box align="end" margin={{ top: "medium" }}>
        <Button label="Add" onClick={() => handleClick()} primary />
      </Box>

      <UrlList pausedURLs={pausedURLs} deletePausedURL={deletePausedURL} />
    </Box>
  );
};

export default UrlInput;
