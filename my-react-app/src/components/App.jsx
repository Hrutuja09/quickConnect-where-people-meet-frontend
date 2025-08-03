import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login'
import Register from './Register'
import MainPage from "./MainPage";
import Reset from "./Reset";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
