import React, { useContext, useEffect } from "react";
import PetCard from "../components/PetCard";
import SearchBar from "../components/SearchBar";
import AppContext from "../context/AppContext";
import "./Pets.css";
import axios from "axios";

function Pets() {
  const {
    isTypePetSelected,
    petsArray,
    searchedPetsByType,
    advanceSearchPetArray,
    setPetsArray,
  } = useContext(AppContext);
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    async function getAllAvailablePets() {
      const headersConfig = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const res = await axios.get("http://localhost:8000/pets/available", {
          headers: headersConfig,
        });
        setPetsArray(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getAllAvailablePets();
  });

  function displayedPets() {
    if (isTypePetSelected === "All" && petsArray && petsArray.length > 0) {
      return petsArray.map((pet) => <PetCard pet={pet} key={pet.id} />);
    } else if (
      isTypePetSelected === "Simple" &&
      searchedPetsByType &&
      searchedPetsByType.length > 0
    ) {
      return searchedPetsByType.map((pet) => (
        <PetCard pet={pet} key={pet.id} />
      ));
    } else if (
      isTypePetSelected === "Advance" &&
      advanceSearchPetArray &&
      advanceSearchPetArray.length > 0
    ) {
      return advanceSearchPetArray.map((pet) => (
        <PetCard pet={pet} key={pet.id} />
      ));
    }
  }

  return (
    <div className="container">
      <SearchBar />
      <div className="pet-wrapper">{displayedPets()}</div>
    </div>
  );
}

export default Pets;
