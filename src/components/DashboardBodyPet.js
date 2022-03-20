import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import NewPetModal from "./NewPetModal";
import EditPetModal from "./EditPetModal";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

function DashboardBodyPet() {
  const token = JSON.parse(localStorage.getItem("token"));
  const [allPets, setAllPets] = useState();
  const [open, setOpen] = useState(false);
  const [editPetMode, setEditPetMode] = useState(false);
  const [selectedPet, setSelectedPet] = useState();

  useEffect(() => {
    async function getAllPets() {
      try {
        if (!token) {
          return;
        }
        const decoded = jwt_decode(token);
        const res = await axios.get(`http://localhost:8000/pets/all`);
        setAllPets(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getAllPets();
  }, [allPets]);
  // }, [newPet]);


  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditPetMode(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ m: 1 }}
          onClick={handleOpen}
        >
          Add Pet
        </Button>
      </div>
      {allPets ? (
        <TableContainer
          component={Paper}
          sx={{ width: "99%", display: "flex", justifyContent: "center" }}
        >
          <Table
            stickyHeader
            sx={{ minWidth: 500, p: 1, m: 1 }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ width: "5%" }}>
                  Edit
                </TableCell>
                <TableCell align="left" sx={{ width: "5%" }}>
                  Id
                </TableCell>
                <TableCell align="left" sx={{ width: "15%" }}>
                  Name
                </TableCell>
                <TableCell align="left" sx={{ width: "10%" }}>
                  Type
                </TableCell>
                <TableCell align="left" sx={{ width: "10%" }}>
                  Status
                </TableCell>
                <TableCell align="left" sx={{ width: "5%" }}>
                  Height
                </TableCell>
                <TableCell align="left" sx={{ width: "5%" }}>
                  Weight
                </TableCell>
                <TableCell align="left" sx={{ width: "10%" }}>
                  Color
                </TableCell>
                <TableCell align="left" sx={{ width: "20%" }}>
                  Bio
                </TableCell>
                <TableCell align="left" sx={{ width: "10%" }}>
                  Hypoal
                </TableCell>
                <TableCell align="left" sx={{ width: "10%" }}>
                  Diet Restrict
                </TableCell>
                <TableCell align="left" sx={{ width: "10%" }}>
                  Breed
                </TableCell>
                <TableCell align="left" sx={{ width: "10%" }}>
                  Current Owner
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {allPets.map((pet) => (
                <TableRow
                  hover
                  key={pet.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell align="left">
                    <IconButton
                      aria-label="edit"
                      onClick={() => {
                        const { name } = pet;
                        setSelectedPet(pet);
                        console.log(name);
                        setEditPetMode(true);
                        setOpen(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="left">{pet.id}</TableCell>
                  <TableCell align="left">{pet.name}</TableCell>
                  <TableCell align="left">{pet.type}</TableCell>
                  <TableCell align="left">{pet.status}</TableCell>
                  <TableCell align="left">{pet.height}</TableCell>
                  <TableCell align="left">{pet.weight}</TableCell>
                  <TableCell align="left">{pet.color}</TableCell>
                  <TableCell align="left">{pet.bio}</TableCell>
                  <TableCell align="left">
                    {pet.hypoallergenic == 0 ? "No" : "Yes"}
                  </TableCell>
                  <TableCell align="left">{pet.dietary_restriction}</TableCell>
                  <TableCell align="left">{pet.breed}</TableCell>
                  <TableCell align="left">{pet.lastUserId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div></div>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {editPetMode ? <EditPetModal pet={selectedPet} /> : <NewPetModal />}
      </Modal>
    </div>
  );
}

export default DashboardBodyPet;
