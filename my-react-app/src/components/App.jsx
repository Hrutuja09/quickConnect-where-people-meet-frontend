import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './Login'
import Register from './Register'
import MainPage from "./MainPage";
import Reset from "./Reset";
import Dashboard from "./Dashboard";
import { useState,useEffect } from "react";
import NewPosts from "./NewPosts";
import Profile from "./Profile";
import Search from "./Search";


function App() {

  const [user, setUser] = useState()

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    fetch("http://localhost:4141/api/me/", {
      headers: {
        "Authorization": `Token ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setUser(data.username);
      })
      .catch(err => console.error(err));
  }
}, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/dashboard" element={<Dashboard user={user}/>} />
        <Route path="/newPosts" element={<NewPosts />} />
        <Route path="/profile" element={<Profile user={user}/>} />
        <Route path="/profile/:userId" element={<Search />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
