/* global chrome */

import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

const fetchData = callback => {
  // object options, function responseCallback.
  chrome.runtime.sendMessage({ query: "queryAPI" }, response => {
    callback(response);
  });
};

const removeApp = () => {
  document.getElementById("little-pause").remove();
};

const checkPausedSites = () => {
  // object options, function responseCallback.
  chrome.runtime.sendMessage({ query: "queryLocalStorage" }, response => {
    if (response.includes(window.location.href)) {

      // Create a new div element.
      const newDiv = document.createElement("div");
      newDiv.id = "little-pause";
      document.documentElement.appendChild(newDiv);

      ReactDOM.render(
        <App fetchData={fetchData} removeApp={removeApp} />,
        document.getElementById("little-pause")
      );
      
    }
  });
};

checkPausedSites();
