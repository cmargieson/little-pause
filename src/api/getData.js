import axios from "axios";

const getData = () => {
  const dateGenerator = () => {
    // 20 June 1995 - the first APOD
    const start = new Date(1995, 5, 20);

    // Today - the last APOD
    const end = new Date();

    // Random APOD date
    const random = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );

    // Return a string in APOD api format
    return random.toISOString().substr(0, 10);
  };

  const apikey = "udgHlQc8XhSfpU3wiDsXiEv7rtHxLtCEz6lNEvvW";
  const apiDate = dateGenerator();

  return axios
    .get(
      `https://api.nasa.gov/planetary/apod?date=${apiDate}&api_key=${apikey}`
    )
    .then((response) => {
      return {
        title: response.data.title,
        description: response.data.explanation,
        url: response.data.url,
        copyright: response.data.copyright,
      };
    })
    .catch((error) => {
      console.log(error);
    });
};

export default getData;
