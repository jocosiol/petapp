import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PetCard.css";
import AppContext from "../context/AppContext";
import axios from "axios";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
};

function PetCard({ pet }) {
  const { currentUser, allSaveByUser } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isSaved, setIsSaved] = useState(false);
  let navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));

  let img;
  if (pet.type === "Dog" && !pet.pic) {
    img = <img src="./img/dog_profile.jpg" height="200" alt="dog"></img>;
  } else if (pet.type === "Cat" && !pet.pic) {
    img = <img src="./img/cat_profile.jpg" height="200" alt="cat"></img>;
  } else if (pet.type === "Other" && !pet.pic) {
    img = <img src="./img/frog_profile.jpg" height="200" alt="other"></img>;
  } else {
    img = <img src={pet.pic} height="200" width="200" alt="other"></img>;
  }

  useEffect(() => {
    if (allSaveByUser?.some((e) => e.id === pet.id)) {
      setIsSaved(true);
    } else setIsSaved(false);
  })
  

  // useEffect(() => {
  //   async function getUserSavedPets() {
  //     const headersConfig = {
  //       Authorization: `Bearer ${token}`,
  //     };
  //     try {
  //       const res = await axios.get(
  //         `http://localhost:8000/status/checksaved/${currentUser.id}`,
  //         {
  //           headers: headersConfig,
  //         }
  //       );
  //       console.log(res);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   getUserSavedPets();
  // }, [isSaved]);

  const handleSave = () => {
    async function savePet() {
      const headersConfig = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const res = await axios.post(
          `http://localhost:8000/status/save/${pet.id}`,
          { userId: currentUser.id, petId: pet.id },
          {
            headers: headersConfig,
          }
        );
      } catch (err) {
        console.log(err);
      }
    }

    async function unsavePet() {
      const headersConfig = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const res = await axios.post(
          `http://localhost:8000/status/unsave/${pet.id}`,
          { userId: currentUser.id, petId: pet.id },
          {
            headers: headersConfig,
          }
        );
      } catch (err) {
        console.log(err);
      }
    }

    if (!isSaved) {
      savePet();
    } else {
      unsavePet();
    }
    setIsSaved((prev) => {
      return !prev;
    });
    handleClose();
  };

  const handleAdopt = () => {
    async function adoptPet() {
      const headersConfig = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const res = await axios.post(
          `http://localhost:8000/status/adopt/${pet.id}`,
          { userId: currentUser.id, petId: pet.id },
          {
            headers: headersConfig,
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
    adoptPet();
    navigate("/mypet");
    //window.location.reload();
  };

  const handleFoster = () => {
    async function fosterPet() {
      const headersConfig = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const res = await axios.post(
          `http://localhost:8000/status/foster/${pet.id}`,
          { userId: currentUser.id, petId: pet.id },
          {
            headers: headersConfig,
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
    fosterPet();
    navigate("/mypet");
    //window.location.reload();
  };

  const handleReturn = () => {
    async function returnPet() {
      const headersConfig = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const res = await axios.put(
          `http://localhost:8000/status/return/${pet.id}`,
          { userId: currentUser.id, petId: pet.id, ownerId: pet.lastUserId },
          {
            headers: headersConfig,
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
    returnPet();
    window.location.reload();
  };

  return (
    <div>
      <div className="pet-card" onClick={handleOpen}>
        <div>{img}</div>
        <div className="pet-card-right">
          <div className="pet-name">{pet.name}</div>
          <div>Type: {pet.type}</div>
          <div>Adoption Status: {pet.status}</div>
          <div>Weight: {pet.weight}lb</div>
          <div>Height: {pet.height}lb</div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {img}

            <Stack spacing={2} direction="row">
              {pet.status === "Adopted" ? (
                <Button disabled variant="contained">
                  Adopt
                </Button>
              ) : (
                <Button variant="contained" onClick={handleAdopt}>
                  Adopt
                </Button>
              )}
              {pet.status === "Fostered" || pet.status === "Adopted" ? (
                <Button disabled variant="contained">
                  Foster
                </Button>
              ) : (
                <Button variant="contained" onClick={handleFoster}>
                  Foster
                </Button>
              )}
            </Stack>
            <Stack spacing={2} direction="row">
              {pet && pet.status !== "Available" && pet.lastUserId === currentUser.id ? (
                <Button color="secondary" onClick={handleReturn}>
                  Return
                </Button>
              ) : (
                <Button disabled color="secondary">
                  Return
                </Button>
              )}
            </Stack>
          </Box>
          <Box>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Hi! My name is {pet.name}{" "}
              <IconButton aria-label="delete" onClick={handleSave}>
                {!isSaved ? (
                  <FavoriteBorderIcon color="disabled" />
                ) : (
                  <FavoriteIcon color="error" />
                )}
              </IconButton>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Type: {pet.type}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 1 }}>
              Adoption Status: {pet.status}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 1 }}>
              Height: {pet.height}cm
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 1 }}>
              Weight: {pet.weight}gr
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 1 }}>
              Color: {pet.color}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 1 }}>
              Hypoallergenic: {pet.hypoallergenic ? "Yes" : "No"}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 1 }}>
              Dietary Restriction: {pet.dietary_restriction}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 1 }}>
              Breed: {pet.breed}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 1 }}>
              Bio: {pet.bio}
            </Typography>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default PetCard;
