import React, { useState } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2
};


function EditPetModal(props) {
  const [hypoallergenic, setHypoallergenic] = useState("");
  const [type, setType] = useState("");
  const [editedPet, setEditedPet] = useState({
    id: props.pet.id,
    type: props.pet.type,
    name: props.pet.name,
    pic: props.pet.pic,
    height: props.pet.height,
    weight: props.pet.weight,
    color: props.pet.color,
    bio: props.pet.bio,
    hypoallergenic: props.pet.hypoallergenic,
    dietary_restriction: props.pet.dietary_restriction,
    breed: props.pet.breed,
  });

  const handleChangeEditPet = (e) => {
    setEditedPet({ ...editedPet, [e.target.name]: e.target.value });
  };
  const handleChangeType = (event) => {
    setType(event.target.value);
    setEditedPet({ ...editedPet, type: event.target.value });
  };
  const handleChangeHypoallergenic = (event) => {
    setHypoallergenic(event.target.value);
    setEditedPet({ ...editedPet, hypoallergenic: event.target.value });
  };

  const handleEditPet = async (event) => {
    try {
      event.preventDefault();
      const res = await axios.put(
        `http://localhost:8000/pets/edit/${editedPet.id}`,
        editedPet
      );
      if (res.data) {
        setEditedPet({
          id: "",
          type: "",
          name: "",
          pic: "",
          height: "",
          weight: "",
          color: "",
          bio: "",
          hypoallergenic: "",
          dietary_restriction: "",
          breed: "",
        });
        //navigate("/dashboard");
        //setOpen(false);
        alert("Pet edited successfully");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePet = async (event) => {
    try {
      event.preventDefault();
      const res = await axios.delete(
        `http://localhost:8000/pets/${props.pet.id}`
      );
      if (res.data) {
        setEditedPet({
          id: "",
          type: "",
          name: "",
          pic: "",
          height: "",
          weight: "",
          color: "",
          bio: "",
          hypoallergenic: "",
          dietary_restriction: "",
          breed: "",
        });
        //navigate("/dashboard");
        //setOpen(false);
        window.confirm("Sure you want to delete this pet?");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Box component="form" sx={style} noValidate autoComplete="off">
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          sx={{  padding: 1 }}
        >
          Edit Pet
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            
            padding: 1,
            display: "flex",
            alignContent: "center",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            name="name"
            value={editedPet.name}
            sx={{ justifyContent: "center" }}
            onChange={handleChangeEditPet}
          />
          <FormControl
            spacing={1}
            sx={{
              display: "flex",
              width: "50%",
              
              padding: 1,
            }}
          >
            <InputLabel
              sx={{ padding: 1 }}
              id="demo-simple-select-helper-label"
            >
              Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={editedPet.type}
              label="Type"
              onChange={handleChangeType}
            >
              <MenuItem value="Dog">Dog</MenuItem>
              <MenuItem value="Cat">Cat</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          sx={{  padding: 1 }}
        >
          <TextField
            id="outlined-basic"
            label="Breed"
            name="breed"
            value={editedPet.breed}
            variant="outlined"
            onChange={handleChangeEditPet}
          />
          <TextField
            id="outlined-basic"
            label="Color"
            variant="outlined"
            name="color"
            value={editedPet.color}
            onChange={handleChangeEditPet}
          />
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          sx={{  padding: 1 }}
        >
          <TextField
            id="outlined-basic"
            label="Height"
            variant="outlined"
            name="height"
            value={editedPet.height}
            onChange={handleChangeEditPet}
          />
          <TextField
            id="outlined-basic"
            label="Weight"
            variant="outlined"
            name="weight"
            value={editedPet.weight}
            onChange={handleChangeEditPet}
          />
        </Stack>
        <Stack
          sx={{
            
            padding: 1,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Dietary Restriction"
            variant="outlined"
            value={editedPet.dietary_restriction}
            name="dietary_restriction"
            onChange={handleChangeEditPet}
          />
          <FormControl
            spacing={1}
            sx={{
              
              padding: 1,
              display: "flex",
              width: "50%",
            }}
          >
            <InputLabel
              sx={{ padding: 1 }}
              id="demo-simple-select-helper-label"
            >
              Hypoallergenic
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={editedPet.hypoallergenic}
              label="Hypoallergenic"
              onChange={handleChangeHypoallergenic}
            >
              <MenuItem value={1}>Yes</MenuItem>
              <MenuItem value={0}>No</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Stack sx={{  padding: 1, display: "flex" }}>
          <TextField
            id="outlined-multiline-static"
            label="Bio"
            multiline
            rows={3}
            name="bio"
            value={editedPet.bio}
            onChange={handleChangeEditPet}
          />
        </Stack>
        <Stack
          direction="column"
          spacing={1}
          sx={{  padding: 1 }}
        >
          <Button variant="contained" component="label">
            Upload Photo
            <input
              type="file"
              name="pic"
              onChange={handleChangeEditPet}
              hidden
            />
          </Button>
          <Stack direction="row" spacing={2} sx={{display: "flex"}}>
          <Button sx={{flexGrow:1}} variant="contained" onClick={handleEditPet}>
            Edit Pet
          </Button>
          <Button sx={{flexGrow:1}} variant="contained" color="error" onClick={handleDeletePet}>
            Delete
          </Button>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
}

export default EditPetModal;
