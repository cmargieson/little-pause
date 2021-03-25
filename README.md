# Little Pause Chrome Extension

**Little Pause** is a Chrome extension that temporarily blocks distracting websites. Distracting websites are replaced with a NASA Astronomy Picture Of The Day. You can choose at what time and on which day each website should be blocked.

### JS React

### Axios

### CircleCI

### Babel


### Webpack ([with Custom Config](https://github.com/cmargieson/little-pause/blob/master/webpack.config.js))

### HP's Grommet Component Library

## Setting Up Continuous Deployment to the Chrome Extension Store with CircleCI

a CLIENT_ID, CLIENT_SECRET and REFRESH_TOKEN are needed to upload and publish extensions to the Google Chrome Store.

**1.** Create a new project at https://console.developers.google.com/apis/credentials.

**2.** Set "OAuth Consent Screen" to external.

**3.** Enable the Chrome store API at https://console.developers.google.com/apis/library/chromewebstore.googleapis.com.

**4.** Create "OAuth client ID" credentials. Select "Desktop app".

**5.** Get a refresh token from https://accounts.google.com/o/oauth2/auth?response_type=code&scope=https://www.googleapis.com/auth/chromewebstore&client_id=$CLIENT_ID&redirect_uri=urn:ietf:wg:oauth:2.0:oob replacing $CLIENT_ID with your client id.

**6.** On "Code" page run in browser console and extract "Refresh Token":

```js
response = await fetch("https://accounts.google.com/o/oauth2/token", {
  method: "POST",
  body: new URLSearchParams([
    ["client_id", prompt("Enter your clientId")],
    ["client_secret", prompt("Enter your clientSecret")],
    ["code", new URLSearchParams(location.search).get("approvalCode")],
    ["grant_type", "authorization_code"],
    ["redirect_uri", "urn:ietf:wg:oauth:2.0:oob"],
  ]),
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});
json = await response.json();
console.log(json);
```
