import React, { useEffect, useState } from "react";
import axios from "axios";
import PetCard from "./PetCard";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

function ViewPetsUserModal(props) {
  const { id, first, last } = props.user;
  const token = JSON.parse(localStorage.getItem("token"));
  const [userPets, setUsersPets] = useState([]);

  useEffect(() => {
    async function getUserPets() {
      const headersConfig = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const res = await axios.get(`http://localhost:8000/pets/user${id}`, {
          headers: headersConfig,
        });
        setUsersPets(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getUserPets();
  });

  return (
    <div>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {`${first} ${last}'s Pets`}{" "}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {userPets && userPets.length > 0
            ? userPets.map((pet) => <PetCard pet={pet} key={pet.id} />)
            : ""}
        </Typography>
      </Box>
    </div>
  );
}

export default ViewPetsUserModal;
