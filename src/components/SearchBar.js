import React, { useState, useContext } from "react";
import "./SearchBar.css";
import SimpleSearch from "./SimpleSearch";
import AdvanceSearch from "./AdvanceSearch";
import AppContext from "../context/AppContext";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function SearchBar() {
  const { setIsTypePetSelected } = useContext(AppContext);
  const [searchType, setSearchType] = useState(true);

  const handleSearchChange = () => {
    setSearchType((prev) => {
      return !prev;
    });
    setIsTypePetSelected("All");
  };

  return (
    <div className="search-wrapper">
      <Box sx={{ display: "flex", p: 1, m: 1, flexDirection: "column" }}>
        {searchType ? (
          <Button variant="contained" onClick={handleSearchChange}>
            Switch to Advance Search
          </Button>
        ) : (
          <Button variant="contained" onClick={handleSearchChange}>
            Switch to Simple Search
          </Button>
        )}

        {searchType ? <SimpleSearch /> : <AdvanceSearch />}
      </Box>
    </div>
  );
}

export default SearchBar;
