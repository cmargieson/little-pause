import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Box, Grommet, Heading, Image, ResponsiveContext, Text } from "grommet";
import styled from "styled-components";
import theme from "./theme";
import getData from "./api/getData";
import Spinner from "./components/Spinner";

const StyledHeadingHigh = styled(Heading)`
  opacity: 87%;
`;

const StyledTextMedium = styled(Text)`
  opacity: 60%;
`;

const App = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchCachedData = () => {
      if (localStorage.getItem("cachedData")) {
        setData(JSON.parse(localStorage.getItem("cachedData")));
      } else {
        setData({
          title: "Ghost Fungus to Magellanic Cloud",
          description:
            "Stars shine and satellites glint in this clear, dark, night sky over Wannon Falls Reserve, South West Victoria, Australia. In fact the fuzzy, faint apparition above the tree tops is the only cloud visible, also known as the Large Magellanic Cloud, satellite galaxy of our own Milky Way. In the foreground, an Omphalotus nidiformis (ghost fungus) from planet Earth shines with a surprisingly bright bioluminescence. Like the Magellanic cloud, the ghost fungus was easily seen with the eye. Its ghostly glow was actually a dull green, but it appears bright green in digital camera picture. Two images were blended to create the scene. One focused on the distant stars and Large Magellanic Cloud some 160,000 light-years away. Another was focused on the foreground and glowing fungus several light-nanoseconds from the camera lens.",
          url: "https://apod.nasa.gov/apod/image/2005/IMG_1478-Edit1200.jpg",
          copyright: "Gill Fry",
        });
      }
    };
    fetchCachedData();
  }, []);

  useEffect(() => {
    const fetchData = () => {
      // getData().then((data) => console.log(data));
      getData().then((data) =>
        localStorage.setItem("cachedData", JSON.stringify(data))
      );
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

                  {data.description && (
                    <Box pad="small">
                      <StyledTextMedium size="small">
                        {data.description}
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
