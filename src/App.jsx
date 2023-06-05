import "./app.css";
import RegistrationForm from "./containers/RegistrationForm";
import LoginForm from "./containers/LoginForm";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route path="/registration" element={<RegistrationForm />} />
      </Routes>
    </div>
  );
}

export default App;
