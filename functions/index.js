// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access the Cloud Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

const axios = require("axios");

// CORS Express middleware to enable CORS Requests.
const cors = require("cors")({
  origin: true
});

exports.object = functions.https.onRequest(async (req, res) => {
  const objectIDs = await getObjectIDs();
  const randomObjectID = getRandomObjectID(objectIDs);
  const object = await getObjectByID(randomObjectID);
  cors(req, res, () => {
    res.status(200).send(object);
  });
});

// Helper functions.
const getObjectIDs = async () => {
  try {
    const response = await axios.get(
      "https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&hasImages=true&q=%22%22"
    );
    return response.data.objectIDs;
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
};

const getRandomObjectID = objectIDs => {
  return objectIDs[Math.floor(Math.random() * objectIDs.length)];
};

const getObjectByID = async randomObjectID => {
  try {
    const response = await axios.get(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomObjectID}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
};
