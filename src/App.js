import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import styled from "styled-components";
import { Box, Grommet, Heading, Image, ResponsiveContext, Text } from "grommet";
import dateGenerator from "./utils/dateGenerator";
import Spinner from "./components/Spinner";
import theme from "./theme";

const StyledHeadingHigh = styled(Heading)`
  opacity: 87%;
`;

const StyledTextMedium = styled(Text)`
  opacity: 60%;
`;

const apikey = "udgHlQc8XhSfpU3wiDsXiEv7rtHxLtCEz6lNEvvW";
const apiDate = dateGenerator();

const App = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchCachedData = () => {
      if (localStorage.getItem("cachedData")) {
        setData(JSON.parse(localStorage.getItem("cachedData")));
      } else {
        setData({
          copyright: "Gill Fry",
          date: "2020-05-23",
          explanation:
            "Stars shine and satellites glint in this clear, dark, night sky over Wannon Falls Reserve, South West Victoria, Australia. In fact the fuzzy, faint apparition above the tree tops is the only cloud visible, also known as the Large Magellanic Cloud, satellite galaxy of our own Milky Way. In the foreground, an Omphalotus nidiformis (ghost fungus) from planet Earth shines with a surprisingly bright bioluminescence. Like the Magellanic cloud, the ghost fungus was easily seen with the eye. Its ghostly glow was actually a dull green, but it appears bright green in digital camera picture. Two images were blended to create the scene. One focused on the distant stars and Large Magellanic Cloud some 160,000 light-years away. Another was focused on the foreground and glowing fungus several light-nanoseconds from the camera lens.",
          hdurl: "https://apod.nasa.gov/apod/image/2005/IMG_1478-Edit.jpg",
          media_type: "image",
          service_version: "v1",
          title: "Ghost Fungus to Magellanic Cloud",
          url: "https://apod.nasa.gov/apod/image/2005/IMG_1478-Edit1200.jpg",
        });
      }
    };
    fetchCachedData();
  }, []);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(
          `https://api.nasa.gov/planetary/apod?date=${apiDate}&api_key=${apikey}`
        )
        .then((response) => {
          localStorage.setItem("cachedData", JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      {data ? (
        <ResponsiveContext.Consumer>
          {(size) => (
            <Box direction="row" fill>
              {size !== "small" && (
                <Box
                  background="dark-1"
                  direction="column"
                  flex={false}
                  pad="small"
                  width="medium"
                >
                  {data.title && (
                    <Box pad="small">
                      <StyledHeadingHigh margin="none" size="small">
                        {data.title}
                      </StyledHeadingHigh>
                    </Box>
                  )}

                  {data.explanation && (
                    <Box pad="small">
                      <StyledTextMedium size="small">
                        {data.explanation}
                      </StyledTextMedium>
                    </Box>
                  )}

                  {data.copyright && (
                    <Box pad="small">
                      <StyledTextMedium size="small">
                        {"PHOTOGRAPH BY " + data.copyright.toUpperCase()}
                      </StyledTextMedium>
                    </Box>
                  )}
                </Box>
              )}
              <Box align="center" background="dark-2" fill justify="center">
                {data.url && (
                  <Image fill fit="contain" margin="medium" src={data.url} />
                )}
              </Box>
            </Box>
          )}
        </ResponsiveContext.Consumer>
      ) : (
        <Box align="center" fill justify="center">
          <Spinner />
        </Box>
      )}
    </React.Fragment>
  );
};

ReactDOM.render(
  <Grommet full theme={theme}>
    <App />
  </Grommet>,
  document.getElementById("root")
);
