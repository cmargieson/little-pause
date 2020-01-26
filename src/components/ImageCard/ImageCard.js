/* global chrome */

import React, { useState, useEffect } from "react";

const ImageCard = () => {
  const [planets, setPlanets] = useState({});

  chrome.runtime.sendMessage({ query: "queryAPI" }, response => {
    console.log(response);
  });

  return (
    <div>
      <span>{JSON.stringify(planets)}</span>
    </div>
  );
};

export default ImageCard;
