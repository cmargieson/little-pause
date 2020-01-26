import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import * as serviceWorker from "./serviceWorker";

const fetchData = async callback => {
  const response = await fetch(
    "https://us-central1-little-pause-f4bfa.cloudfunctions.net/object"
  );
  callback(await response.json());
};

const removeApp = () => {
  // This is used in content.js.
  console.log("removeApp()");
};

// Create a new div element.
const newDiv = document.createElement("div");
newDiv.id = "little-pause";
document.documentElement.appendChild(newDiv);

ReactDOM.render(
  <App fetchData={fetchData} removeApp={removeApp} />,
  document.getElementById("little-pause")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
