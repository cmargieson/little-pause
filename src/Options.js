import React from "react";
import ReactDOM from "react-dom";
import { Box, Grommet } from "grommet";
import theme from "./theme";
import TimeInput from "./components/TimeInput";
import UrlInput from "./components/UrlInput";

const App = () => {
  return (
    <Box align="center" background="dark-2" fill pad="medium">
      <Box background="dark-1" pad="medium" width="large">
        <TimeInput />
        <UrlInput />
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
