import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import AppContext from "../context/AppContext";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function valuetextHeight(value) {
  return `${value} cms`;
}

function valuetextWeight(value) {
  return `${value} grms`;
}

function AdvanceSearch() {
  const { setAdvanceSearchPetArray, setIsTypePetSelected } =
    useContext(AppContext);
  const [rangeHeightValue, setRangeHeightValue] = useState([0, 200]);
  const [rangeWeightValue, setRangeWeightValue] = useState([0, 100]);
  const [status, setStatus] = useState("");
  const [nameInput, setNameInput] = useState(" ");
  const [statusInput, setStatusInput] = useState();
  const searchObject = {
    name: nameInput,
    status: statusInput,
    minHeight: rangeHeightValue[0],
    maxHeight: rangeHeightValue[1],
    minWeight: rangeWeightValue[0],
    maxWeight: rangeWeightValue[1],
  };

  const handleSearchName = (e) => {
    setNameInput(e.target.value);
  };
  const handleChangeStatus = (e) => {
    if (e.target.value === "All") {
      setStatusInput("");
      setStatus("All");
    } else {
      setStatusInput(e.target.value);
      setStatus(e.target.value);
    }
  };

  const handleChangeHeight = (event, newValue) => {
    setRangeHeightValue(newValue);
  };

  const handleChangeWeight = (event, newValue) => {
    setRangeWeightValue(newValue);
  };

  const handleSubmitAdvanceSearch = (event) => {
    getSearchedPets();
    setIsTypePetSelected("Advance");
  };

  useEffect(() => {
    console.log(searchObject);
  }, [, nameInput, statusInput, rangeHeightValue, rangeWeightValue]);

  async function getSearchedPets() {
    const token = JSON.parse(localStorage.getItem("token"));

    const headersConfig = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const res = await axios.post(
        "http://localhost:8000/pets/search",
        searchObject,
        {
          headers: headersConfig,
        }
      );
      setAdvanceSearchPetArray(res.data.advanceSearchPet);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="search_form_advance">
      <div className="search_form_range">
        <TextField
          id="name"
          label="Name"
          variant="filled"
          margin="normal"
          sx={{ width: 150 }}
          onChange={handleSearchName}
        />
        <FormControl required sx={{ width: 150 }} variant="filled">
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="form-pet-status"
            id="form-pet-status"
            value={status}
            label="Status"
            onChange={handleChangeStatus}
          >
            <MenuItem value={"All"}>All</MenuItem>
            {/* <MenuItem value={"Adopted"}>Adopted</MenuItem> */}
            <MenuItem value={"Fostered"}>Fostered</MenuItem>
            <MenuItem value={"Available"}>Available</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="search_form_range">
        <div className="search_form_element">
          <div>Height</div>
          <div>
            <Box sx={{ width: 150 }}>
              <Slider
                getAriaLabel={() => "Height range"}
                value={rangeHeightValue}
                onChange={handleChangeHeight}
                valueLabelDisplay="auto"
                // getAriaValueText={valuetextHeight}
                min={0}
                max={200}
              />
            </Box>
          </div>
        </div>
        <div className="search_form_element">
          <div>Weight</div>
          <div>
            <Box sx={{ width: 150 }}>
              <Slider
                getAriaLabel={() => "Weight range"}
                value={rangeWeightValue}
                onChange={handleChangeWeight}
                valueLabelDisplay="auto"
                // getAriaValueText={valuetextWeight}
                min={0}
                max={100}
              />
            </Box>
          </div>
        </div>
      </div>
      <div className="search_form_range">
        <Stack>
          <Button variant="contained" onClick={handleSubmitAdvanceSearch}>
            Search
          </Button>
        </Stack>
      </div>
    </div>
  );
}

export default AdvanceSearch;
