import { initializeApp } from "firebase/app";
// il nous faut importer getAuth
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  //   apiKey: "AIzaSyA2yW1EjGEvp1E9NlcDQeGmK52(...)", ici notre clé api est visible de tous. On doit la sécuriser, ne surtout pas l'envoyer sur github ou vercel si on met notre app en ligne
  // il faut créer une VARIABLE D'ENVIRONNEMENT et pour cela on créé un fichier .env.local
  // ensuite pour utiliser les variable d'nevironnement on fait process.env.NOM DE LA VARIABLE
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// il faut aussi exporter cette méthode getAuth pour l'utiliser
export const auth = getAuth(app);
