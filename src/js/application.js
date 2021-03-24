import React from "react";
import ReactDOM from "react-dom";
// Axios
import axios from "axios";
// Grommet
import { Anchor, Box, Button, Grommet, Heading, Layer, Text } from "grommet";
import { CircleInformation } from "grommet-icons";
// Moment
import moment from "moment";
import randomMoment from "random-moment";

const App = () => {
  const [data, setData] = React.useState();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      const startDate = moment("20-06-1995 ", "DD-MM-YYYY"); // The first APOD
      const endDate = moment().subtract(1, "days"); // Yesterday's APOD
      const randomDate = randomMoment(startDate, endDate);
      const apikey = "udgHlQc8XhSfpU3wiDsXiEv7rtHxLtCEz6lNEvvW"; // The APOD api key is public

      axios
        .get(
          `https://api.nasa.gov/planetary/apod?date=${randomDate.format(
            "YYYY-MM-DD"
          )}&api_key=${apikey}`
        )
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchData();
  }, []);

  // UI
  const [open, setOpen] = React.useState();

  if (loading) {
    return (
      <Box align="center" fill justify="center">
        <div className="spinner"></div>
      </Box>
    );
  }
  return (
    <>
      {data && data.url && (
        <Box
          background={{
            image: `url(${data.url})`,
          }}
          fill
          pad="small"
        >
          <Box direction="row" gap="medium" justify="end">
            <Button
              icon={<CircleInformation />}
              onClick={() => setOpen(!open)}
            />
          </Box>

          {open && (
            <Layer
              position="center"
              onClickOutside={() => setOpen(false)}
              onEsc={() => setOpen(false)}
            >
              <Box gap="small" pad="medium">
                <Heading level={3} margin="none">
                  {data && data.title && data.title}
                </Heading>
                <Text>{data && data.explanation && data.explanation}</Text>
                {data && data.copyright ? (
                  <Anchor
                    href="https://apod.nasa.gov/"
                    label={`© ${data.copyright}`}
                    target="_blank"
                  />
                ) : (
                  <Anchor
                    href="https://apod.nasa.gov/"
                    label={`© NASA`}
                    target="_blank"
                  />
                )}
              </Box>
            </Layer>
          )}
        </Box>
      )}
    </>
  );
};

ReactDOM.render(
  <Grommet full>
    <App />
  </Grommet>,
  document.getElementById("root")
);
