import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";

export default function Navbar() {
  const { toggleModals } = useContext(UserContext);

  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      alert(
        "for some reasons we can't deconnect, please check your internet connexion and retry."
      );
    }
  };

  return (
    <nav className="navbar navbar-light bg-light px-4">
      <NavLink to="/" className="navbar-brand">
        AuthJS
      </NavLink>

      <div>
        <button
          onClick={() => toggleModals("signUp")}
          className="btn btn-primary"
        >
          Sign up
        </button>
        <button
          onClick={() => toggleModals("signIn")}
          className="btn btn-primary ms-2"
        >
          Sign In
        </button>
        <button className="btn btn-danger ms-2" onClick={logOut}>
          Log Out
        </button>
      </div>
    </nav>
  );
}
