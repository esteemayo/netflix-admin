import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRBASE_API_KEY,
  authDomain: 'netflix-5a7e2.firebaseapp.com',
  projectId: 'netflix-5a7e2',
  storageBucket: 'netflix-5a7e2.appspot.com',
  messagingSenderId: '248799016314',
  appId: '1:248799016314:web:b422a779ce31b3dcf212c3',
  measurementId: 'G-GP8NYRJRP9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
