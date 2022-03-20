import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AppContext from "./context/AppContext";
import Home from "./pages/Home";
import MyPet from "./pages/MyPet";
import Pets from "./pages/Pets";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import jwt_decode from "jwt-decode";

function App() {
  const [petsArray, setPetsArray] = useState("");
  const [isTypePetSelected, setIsTypePetSelected] = useState("All");
  const [searchedPetsByType, setSearchedPetsByType] = useState();
  const [usersArray, setUsersArray] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [petDisplayed, setPetDisplayed] = useState();
  const [advanceSearchPetArray, setAdvanceSearchPetArray] = useState();
  const [myPets, setMyPets] = useState([]);
  const [dashboardPressed, setDashboardPressed] = useState("Pets");
  const token = JSON.parse(localStorage.getItem("token"));
  const [allSaveByUser, setAllSaveByUser] = useState();

  function addUser(user) {
    const addedUsersArray = [...usersArray, user];
    setUsersArray(addedUsersArray);
  }

  useEffect(() => {
    async function getUser() {
      try {
        if (!token) {
          return;
        }
        const decoded = jwt_decode(token);
        const res = await axios.get(
          `http://localhost:8000/users/${decoded.id}`
        );
        setCurrentUser(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    async function getUserSavedPets() {
      const headersConfig = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const res = await axios.get(
          `http://localhost:8000/users/${currentUser.id}/savedpets`,
          {
            headers: headersConfig,
          }
        );
         setAllSaveByUser(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getUserSavedPets();
  })

  return (
    <AppContext.Provider
      value={{
        petsArray,
        setPetsArray,
        isTypePetSelected,
        setIsTypePetSelected,
        searchedPetsByType,
        setSearchedPetsByType,
        addUser,
        setCurrentUser,
        currentUser,
        petDisplayed,
        setPetDisplayed,
        advanceSearchPetArray,
        setAdvanceSearchPetArray,
        myPets,
        setMyPets,
        dashboardPressed,
        setDashboardPressed,
        allSaveByUser, setAllSaveByUser,
      }}
    >
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/mypet" element={<MyPet />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
