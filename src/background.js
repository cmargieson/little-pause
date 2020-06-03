/* global chrome */

import moment from "moment";

const isTimeNowBetween = (start, end) => {
  if (!start || !start.length || !end || !end.length) {
    return true;
  }

  const nowDate = moment();

  const startDate = moment(start, ["hh:mm a"]);
  const endDate = moment(end, ["hh:mm a"]);

  // Check if end is before start
  if (endDate.isBefore(startDate)) {
    // Error: End is before start, end must be tomorrow
    endDate.add(1, "days");
  }

  return nowDate.isBetween(startDate, endDate);
};

const fetchStartTime = () => {
  if (localStorage.getItem("startTime")) {
    return JSON.parse(localStorage.getItem("startTime"));
  }
  return [];
};

const fetchEndTime = () => {
  if (localStorage.getItem("endTime")) {
    return JSON.parse(localStorage.getItem("endTime"));
  }
  return "";
};

const fetchPausedURLs = () => {
  if (localStorage.getItem("pausedURLs")) {
    return JSON.parse(localStorage.getItem("pausedURLs"));
  }
  return "";
};

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  const startTime = fetchStartTime();
  const endTime = fetchEndTime();

  if (isTimeNowBetween(startTime, endTime)) {
    const pausedURLs = fetchPausedURLs();

    // if (pausedURLs.some((pausedURL) => details.url.includes(pausedURL))) {
    if (pausedURLs.some((pausedURL) => details.url === pausedURL)) {
      chrome.tabs.update(details.tabId, {
        url: chrome.extension.getURL("app.html"),
      });
    }
  }
});
