import { createContext, useState, useEffect } from "react";
//on va importer ici des méthodes de firebase (puisqu'on à installer la dépendance firebase avec yarn)
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase-config";

export const UserContext = createContext();

export function UserContextProvider(props) {
  // Firebase Part
  // Sign Up
  const signUp = (email, pwd) =>
    createUserWithEmailAndPassword(auth, email, pwd);
  // Sign In
  const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd);

  const [currentUser, setCurrentUser] = useState();
  const [loadingData, setloadingData] = useState(true);

  // ici on surveille si l'utilisateur se connecte ou pas. Et on met une fonction à l'intérieur pour
  useEffect(() => {
    // auth qu'on a importé de firebase contient les données d'authtification du compte de l'utilisateur (mail et mot de passe)
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      setloadingData(false);
    });
    return unsubscribe;
  }, []);

  // Modal Part

  const [modalState, setModalState] = useState({
    signUpModal: false,
    signInModal: false,
  });

  const toggleModals = (modal) => {
    if (modal === "signIn") {
      setModalState({
        signUpModal: false,
        signInModal: true,
      });
    }
    if (modal === "signUp") {
      setModalState({
        signUpModal: true,
        signInModal: false,
      });
    }
    if (modal === "close") {
      setModalState({
        signUpModal: false,
        signInModal: false,
      });
    }
  };

  return (
    <UserContext.Provider
      value={{ modalState, toggleModals, signUp, signIn, currentUser }}
    >
      {/* ici la condition sert à dire : seulement quand on a reçu les données on envoie les props et donc l'app peux fonctionner. tant qu'on a pas les données on envoie rien.  */}
      {!loadingData && props.children}
    </UserContext.Provider>
  );
}
