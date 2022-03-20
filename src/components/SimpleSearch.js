import React, { useContext, useState } from "react";
import "./SearchBar.css";
import AppContext from "../context/AppContext";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function SimpleSearch() {
  const {
    petsArray,
    setSearchedPetsByType,
    setPetDisplayed,
    setIsTypePetSelected,
  } = useContext(AppContext);
  const [petType, setPetType] = useState("");

  function handleSelect(e) {
    let filtered = petsArray.filter((pet) => pet.type === e.target.value);

    console.log(filtered);
    setSearchedPetsByType(filtered);
    setPetDisplayed(filtered);
    setIsTypePetSelected("Simple");
    setPetType(e.target.value);

    if (e.target.value === "All") {
      setSearchedPetsByType(petsArray);
    }
  }
  return (
    <div className="search_form_simple">
      <FormControl
        fullWidth
        variant="filled"
        sx={{ width: 300 }}
        margin="normal"
      >
        <InputLabel id="demo-simple-select-label">Search by</InputLabel>
        <Select
          labelId="pet-type"
          id="petType"
          value={petType}
          label="Pet Type"
          onChange={handleSelect}
        >
          <MenuItem value={"All"}>All</MenuItem>
          <MenuItem value={"Dog"}>Dog</MenuItem>
          <MenuItem value={"Cat"}>Cat</MenuItem>
          <MenuItem value={"Other"}>Other</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default SimpleSearch;
