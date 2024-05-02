import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import AddContactPage from "./pages/AddContactPage";
import EditContactPage from "./pages/EditContactPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/addcontact" element={<AddContactPage />} />
        <Route path="/editcontact" element={<EditContactPage />} />
      </Routes>
    </>
  );
}

export default App;
