import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login'
import Register from './Register'
import MainPage from "./MainPage";
import Reset from "./Reset";
import Dashboard from "./Dashboard";
import { useState } from "react";
import NewPosts from "./NewPosts";
import Profile from "./Profile";


function App() {

  const [user, setUser] = useState()
  function handleUser(username){
    setUser(username)
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login user={handleUser}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/dashboard" element={<Dashboard user={user}/>} />
        <Route path="/newPosts" element={<NewPosts />} />
        <Route path="/profile" element={<Profile user={user}/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
