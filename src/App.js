import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import HomePage from "./Screens/HomePage";
import Login from "./Screens/Login";
import ProfilePage from "./Screens/ProfilePage";
import { useSelector } from "react-redux";
import Registeration from "./Screens/Registeration";
import UpdateProfile from "./Screens/UpdateProfile";

function App() {
  const mode = useSelector(state => state.mode);

  const isUser = Boolean(useSelector(state => state.token));
  console.log("Mode", mode);
  return (
    <div style={{ backgroundColor: mode.bgColor, minHeight: "100vh" }}>
      <BrowserRouter>
        <Navbar />
        <div className="h-14" />
        <Routes>
          <Route
            path="/"
            element={!isUser ? <Login /> : <Navigate to="/home" />}
          />
          <Route
            path="/registeration"
            element={!isUser ? <Registeration /> : <Navigate to="/home" />}
          />
          <Route
            path="/home"
            element={isUser ? <HomePage /> : <Navigate to="/" />}
          />
          <Route
            path="/profile/:id"
            element={isUser ? <ProfilePage /> : <Navigate to="/" />}
          />
          <Route
            path="/updateProfile/:id"
            element={isUser ? <UpdateProfile /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
