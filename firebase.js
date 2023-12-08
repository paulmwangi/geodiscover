// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOIoF2zQtSRt7Ymqie66RhqpgggDw9d_o",
  authDomain: "geodiscover-7203d.firebaseapp.com",
  projectId: "geodiscover-7203d",
  storageBucket: "geodiscover-7203d.appspot.com",
  messagingSenderId: "950455640889",
  appId: "1:950455640889:web:cb014a4a2c7b01d9033ee8",
  measurementId: "G-PL6HCZXMQZ"
};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

export { auth, database };