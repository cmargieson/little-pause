import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box, Heading, MaskedInput } from "grommet";

const StyledHeadingMedium = styled(Heading)`
  opacity: 60%;
`;

const TimeInput = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    const fetchStartTime = () => {
      if (localStorage.getItem("startTime")) {
        setStartTime(JSON.parse(localStorage.getItem("startTime")));
      }
    };
    fetchStartTime();
  }, []);

  useEffect(() => {
    const fetchEndTime = () => {
      if (localStorage.getItem("endTime")) {
        setEndTime(JSON.parse(localStorage.getItem("endTime")));
      }
    };
    fetchEndTime();
  }, []);

  useEffect(() => {
    const setStartTime = () => {
      localStorage.setItem("startTime", JSON.stringify(startTime));
    };
    setStartTime();
  }, [startTime]);

  useEffect(() => {
    const setEndTime = () => {
      localStorage.setItem("endTime", JSON.stringify(endTime));
    };
    setEndTime();
  }, [endTime]);

  const MaskedTimeInput = ({ time, setTime }) => (
    <MaskedInput
      mask={[
        {
          length: [1, 2],
          options: Array.from({ length: 12 }, (v, k) => k + 1),
          regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
          placeholder: "hh",
        },
        { fixed: ":" },
        {
          length: 2,
          options: ["00", "15", "30", "45"],
          regexp: /^[0-5][0-9]$|^[0-9]$/,
          placeholder: "mm",
        },
        { fixed: " " },
        {
          length: 2,
          options: ["am", "pm"],
          regexp: /^[ap]m$|^[AP]M$|^[aApP]$/,
          placeholder: "ap",
        },
      ]}
      value={time}
      onChange={(event) => setTime(event.target.value)}
    />
  );

  return (
    <Box pad="medium" margin="small" border>
      <StyledHeadingMedium level={3}>
        Little Pause active time:
      </StyledHeadingMedium>
      <Box direction="row">
        <Box margin={{ end: "small" }} width="small">
          <MaskedTimeInput time={startTime} setTime={setStartTime} />
        </Box>

        <Box width="small">
          <MaskedTimeInput time={endTime} setTime={setEndTime} />
        </Box>
      </Box>
    </Box>
  );
};

export default TimeInput;
