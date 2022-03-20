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
  bgcolor: "#D5DAF2",
  boxShadow: 24,
};

function NewPetModal() {
  const [hypoallergenic, setHypoallergenic] = useState("");
  const [type, setType] = useState("");
  const [newPet, setNewPet] = useState({
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

  const handleChangeNewPet = (e) => {
    setNewPet({ ...newPet, [e.target.name]: e.target.value });
  };
  const handleInputNewPet = async (e) => {
    // let file = e.target.files[0];
    // setNewPet({ ...newPet, pic: file });
    const fd = new FormData();
    fd.append("pic", e.target.files[0], e.target.files[0].name);
    const resImg = await axios.post(`http://localhost:8000/pets/image`, fd);
    //console.log(resImg.data.fileUrl);
    setNewPet({ ...newPet, pic: resImg.data.fileUrl });
  };
  const handleChangeType = (event) => {
    setType(event.target.value);
    setNewPet({ ...newPet, type: event.target.value });
  };
  const handleChangeHypoallergenic = (event) => {
    setHypoallergenic(event.target.value);
    setNewPet({ ...newPet, hypoallergenic: event.target.value });
  };

  const handleAddNewPet = async (event) => {
    try {
      event.preventDefault();

      const res = await axios.post("http://localhost:8000/pets/add", newPet);
      if (res.data) {
        setNewPet({
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

        alert("New pet added.");
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
          sx={{ backgroundColor: "#D5DAF2", padding: 1 }}
        >
          Add New Pet
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            backgroundColor: "#D5DAF2",
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
            sx={{ justifyContent: "center" }}
            onChange={handleChangeNewPet}
          />
          <FormControl
            spacing={1}
            sx={{
              display: "flex",
              width: "50%",
              backgroundColor: "#D5DAF2",
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
              value={type}
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
          sx={{ backgroundColor: "#D5DAF2", padding: 1 }}
        >
          <TextField
            id="outlined-basic"
            label="Breed"
            name="breed"
            variant="outlined"
            onChange={handleChangeNewPet}
          />
          <TextField
            id="outlined-basic"
            label="Color"
            variant="outlined"
            name="color"
            onChange={handleChangeNewPet}
          />
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          sx={{ backgroundColor: "#D5DAF2", padding: 1 }}
        >
          <TextField
            id="outlined-basic"
            label="Height"
            variant="outlined"
            name="height"
            onChange={handleChangeNewPet}
          />
          <TextField
            id="outlined-basic"
            label="Weight"
            variant="outlined"
            name="weight"
            onChange={handleChangeNewPet}
          />
        </Stack>
        <Stack
          sx={{
            backgroundColor: "#D5DAF2",
            padding: 1,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Dietary Restriction"
            variant="outlined"
            name="dietary_restriction"
            onChange={handleChangeNewPet}
          />
          <FormControl
            spacing={1}
            sx={{
              backgroundColor: "#D5DAF2",
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
              value={hypoallergenic}
              label="Hypoallergenic"
              onChange={handleChangeHypoallergenic}
            >
              <MenuItem value={1}>Yes</MenuItem>
              <MenuItem value={0}>No</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Stack sx={{ backgroundColor: "#D5DAF2", padding: 1, display: "flex" }}>
          <TextField
            id="outlined-multiline-static"
            label="Bio"
            multiline
            rows={3}
            name="bio"
            onChange={handleChangeNewPet}
          />
        </Stack>
        <Stack
          direction="column"
          spacing={1}
          sx={{ backgroundColor: "#D5DAF2", padding: 1 }}
        >
          <Button variant="contained" component="label">
            Upload Photo
            <input type="file" name="pic" onChange={handleInputNewPet} hidden />
          </Button>
          <Button variant="contained" onClick={handleAddNewPet}>
            Add Pet
          </Button>
        </Stack>
      </Box>
    </div>
  );
}

export default NewPetModal;
