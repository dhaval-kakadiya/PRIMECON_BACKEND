const { initializeApp, cert } = require("firebase-admin/app");
const { getStorage, deleteObject } = require("firebase-admin/storage");
const serviceAccount = require("./firebase.json");

// const handleFormData = () => {
initializeApp({
  credential: cert(serviceAccount),
});

const bucket = getStorage().bucket("gs://primecon-7629b.appspot.com");
// };
module.exports = { bucket };
