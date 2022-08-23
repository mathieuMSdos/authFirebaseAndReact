import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Outlet, useLocation, Navigate } from "react-router-dom";

export default function Private() {
  const { currentUser } = useContext(UserContext);
  console.log(("PRIVATE ", currentUser));

  if (!currentUser) {
    // navigate est un composant react qui permet de naviguer quelque part. Donc d'envoyer l'utilisateur sur la page de notre choix. Et ça s'utilise comme ça.
    return <Navigate to="/" />;
  }

  return <div className="container">
    {/* outlet c'est une méthode de react router v6 */}
    {/* outlet c'est la sortie. Om est ce que jee veux montrer ma route privée Private défini dans App.js ? je veux la montrer ici. Private c'est l'élément parent. Maintenant on va s'occuper du composant enfant PrivateHome */}
    <Outlet></Outlet>
  </div>
}
