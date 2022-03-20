import React, {  useContext } from "react";
import AppContext from "../context/AppContext";
import "./Navbar.css";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

function DashboardNavbar() {
  const { setDashboardPressed } = useContext(AppContext);

  function handleAllPets() {
    setDashboardPressed("Pets");
  }
  function handleAllUser() {
    setDashboardPressed("Users");
  }

  return (
    <div>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
        sx={{
          display: "flex",
          p: 1,
          m: 1,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Button onClick={handleAllUser}>All Users</Button>
        <Button onClick={handleAllPets}>All Pets</Button>
      </ButtonGroup>


    </div>
  );
}

export default DashboardNavbar;
