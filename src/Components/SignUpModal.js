import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function SignUpModal() {
  const { modalState, toggleModals, signUp } = useContext(UserContext);

  const navigate = useNavigate();

  const [validation, setValidation] = useState("");

  const inputs = useRef([]);
  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };

  const formRef = useRef();

  // ceci est la fonction qui va être exécuté lorsqu'on va cliquer sur submit. On va vérifier les inputs etc... avant d'envoyer les données
  const handleForm = async (e) => {
    // validation des données entrées par l'utilisateur côté front
    e.preventDefault();
    if (
      (inputs.current[1].value.length || inputs.current[2].value.length) < 6
    ) {
      setValidation("* 6 characters min.");
      return;
    } else if (inputs.current[1].value !== inputs.current[2].value) {
      setValidation("Password do not match");
      return;
    }

    //Firebase Part
    // pour pouvoir utiliser await il faut mettre async en haut là où on décalre la fonctin handle
    // ici on envoi l'email et le password à la méthode signUp (qui contient createUserWithEmailAndPassword)
    try {
      // essaye ça
      const cred = await signUp(
        inputs.current[0].value,
        inputs.current[1].value
      );
      // si ça réussi fait ça :
      // reset c'est une méthode de base de JS qui permet de remettre à 0 les champs d'un formulaire après le submit.
      // formRef est un useRef qui va nous permettre dde cibler notre formulaire pour reset les champs.
      formRef.current.reset();
      // on vide les messages d'erreur
      setValidation("");
      // et ici on dis si c'est bon, la personne à un compte sur notre site boum envoi le sur la route privée suivante :
      navigate("/private/private-home");
      toggleModals("close");

    } catch (err) {
      // console.dir(err);
      // ici on gère les erreurs renvoyer par firebase. Par exemple si on entre une adresse email déjà présente dans la BDD ou un email sans .
      // Quand il y a une erreur firebase renvoi un code erreur. Donc il suffit de dire si le code erreur === tel truc alors affiche tel truc
      //sachant que les erreurs de firebase sont en fait un objet, avec des propriété comme celle du code erreur
      if (err.code === "auth/invalid-email") {
        setValidation("Email format invalid");
      }
      if (err.code === "auth/email-already-in-use") {
        setValidation("Email already used");
      }
    }
  };

  const closeModal = () => {
    setValidation("");
    toggleModals("close");
  };

  return (
    <>
      {modalState.signUpModal && (
        <div className="position-fixed top-0 vw-100 vh-100">
          <div
            onClick={closeModal} //permet de ferme la modal en cliquant sur l'overlay
            className="w-100 h-100 bg-dark bg-opacity-75"
          ></div>

          <div
            className="position-absolute top-50 start-50 translate-middle"
            style={{ minWidth: "400px" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Sign Up</h5>
                  <button onClick={closeModal} className="btn-close"></button>
                </div>

                <div className="modal-body">
                  <form
                    ref={formRef}
                    onSubmit={handleForm}
                    className="sign-up-form"
                  >
                    <div className="mb-3">
                      <label className="form-label" htmlFor="signUpEmail">
                        Email adress
                      </label>
                      <input
                        ref={addInputs}
                        name="email"
                        required
                        type="email"
                        className="form-control"
                        id="signUpEmail"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="signUpPwd">
                        Password
                      </label>
                      <input
                        ref={addInputs}
                        name="pwd"
                        required
                        type="password"
                        className="form-control"
                        id="signUpPwd"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="repeatPwd">
                        Reapeat Password
                      </label>
                      <input
                        ref={addInputs}
                        name="pwd"
                        required
                        type="password"
                        className="form-control"
                        id="repeatPwd"
                      />
                      <p className="text-danger mt-1"> {validation}</p>
                    </div>

                    <button className="btn btn-primary">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
