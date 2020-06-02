/* global chrome */

import moment from "moment";

const isTimeNowBetween = (start, end) => {
  const nowDate = moment();

  const startDate = moment(start, ["HH:mm"]);
  const endDate = moment(end, ["HH:mm"]);

  // Check if end is before start
  if (endDate.isBefore(startDate)) {
    // Error: End is before start, end must be tomorrow
    endDate.add(1, "days");
  }

  return nowDate.isBetween(startDate, endDate);
};

// console.log(isTimeNowBetween("9:00", "17:00"));

const fetchPausedURLs = () => {
  if (localStorage.getItem("pausedURLs")) {
    return JSON.parse(localStorage.getItem("pausedURLs"));
  }
  return [];
};

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  const pausedURLs = fetchPausedURLs();
  if (pausedURLs.some((pausedURL) => details.url.includes(pausedURL))) {
    // The tab URL includes at least one **substring** of a URL in the pausedURL array

    chrome.tabs.update(details.tabId, {
      url: chrome.extension.getURL("app.html"),
    });
  }
});
