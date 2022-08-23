import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import SignUpModal from "./Components/SignUpModal";
import SignInModal from "./Components/SignInModal"
import Private from "./Pages/Private/Private";
import PrivateHome from "./Pages/Private/PrivateHome/PrivateHome";

function App() {
  return (
    <>
      <SignUpModal />
      <SignInModal />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        {/* voilà comment on fait pour faire une route privée */}
        {/* il faut imbriquer des Route dans une route privée */}
        <Route path="/private" element={<Private />}>
          <Route path="/private/private-home" element={<PrivateHome />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
