import React, { useEffect, useContext } from "react";
import axios from "axios";
import AppContext from "../context/AppContext";
import PetCard from "../components/PetCard";

import Box from "@mui/material/Box";

function MyPet() {
  const { currentUser, myPets, setMyPets, allSaveByUser } = useContext(AppContext);
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    async function myPet() {
      const headersConfig = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const res = await axios.get(
          `http://localhost:8000/users/${currentUser.id}/mypets`,
          {
            headers: headersConfig,
          }
        );
        setMyPets(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    myPet();

  }, []);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 1,
          m: 1,
        }}
      >
        <Box
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 25,
            backgroundColor: "white",
            p: 1,
          }}
        >
          {"My Pets"}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          {myPets && myPets.length > 0
            ? myPets.map((pet) => <PetCard pet={pet} key={pet.id}/>)
            : ""}
        </Box>
        <Box
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 25,
            backgroundColor: "white",
            p: 1,
          }}
        >
          {"My Favorites"}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          {allSaveByUser && allSaveByUser.length > 0
            ? allSaveByUser.map((pet) => <PetCard pet={pet} key={pet.id}/>)
            : ""}
        </Box>
      </Box>
    </div>
  );
}

export default MyPet;
