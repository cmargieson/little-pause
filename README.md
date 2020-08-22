**Little Pause** is a Chrome extension that temporarily blocks distracting websites.

### Continuous Deployment to Chrome Extension Store with CircleCI

Get CLIENT_ID, CLIENT_SECRET and REFRESH_TOKEN.

**1.** Create a new project at https://console.developers.google.com/apis/credentials.

**2.** Set "OAuth Consent Screen" to external.

**3.** Enable the Chrome store API at https://console.developers.google.com/apis/library/chromewebstore.googleapis.com.

**4.** Create "OAuth client ID" credentials. Select "Desktop app". 

**5.** Navigate here to https://accounts.google.com/o/oauth2/auth?response_type=code&scope=https://www.googleapis.com/auth/chromewebstore&client_id=$CLIENT_ID&redirect_uri=urn:ietf:wg:oauth:2.0:oob replacing $CLIENT_ID. 

**6.** On "Code" page run in browser console and extract "Refresh Token":

```js
response = await fetch('https://accounts.google.com/o/oauth2/token', {
  method: "POST",
  body: new URLSearchParams([
    ['client_id', prompt('Enter your clientId')],
    ['client_secret', prompt('Enter your clientSecret')],
    ['code', new URLSearchParams(location.search).get('approvalCode')],
    ['grant_type', 'authorization_code'],
    ['redirect_uri', 'urn:ietf:wg:oauth:2.0:oob']
  ]),
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});
json = await response.json();
console.log(json);
```
