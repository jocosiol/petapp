import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AppContext from "../context/AppContext";
import axios from "axios";

function Profile() {
  const { currentUser, setCurrentUser } = useContext(AppContext);

  const [first, setFirst] = useState(currentUser?.first);
  const [last, setLast] = useState(currentUser?.last);
  const [email, setEmail] = useState(currentUser?.email);
  const [phone, setPhone] = useState(currentUser?.phone);
  const [newCurrentUser, setNewCurrentUser] = useState([]);

  const handleOnChangeFirst = (e) => {
    setFirst(e.target.value);
  };

  const handleOnChangeLast = (e) => {
    setLast(e.target.value);
  };

  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleOnChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleEdit = async (e) => {
    try {
      e.preventDefault();

      setNewCurrentUser({ ...currentUser, email, first, last, phone });

      const res = await axios.put(
        `http://localhost:8000/users/${currentUser.id}`,
        newCurrentUser
      );
      if (res.data) {
        alert("Updated!");
        setCurrentUser(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
          display: "flex",
          justifyContent: "center",
          "& > :not(style)": { m: 2, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Stack spacing={2} sx={{ backgroundColor: "#D5DAF2", padding: 2 }}>
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            name="first"
            defaultValue={currentUser ? currentUser.first : ""}
            onChange={handleOnChangeFirst}
          />
          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            defaultValue={currentUser ? currentUser.last : ""}
            onChange={handleOnChangeLast}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            defaultValue={currentUser ? currentUser.email : ""}
            onChange={handleOnChangeEmail}
          />
          <TextField
            id="outlined-basic"
            label="Phone"
            variant="outlined"
            defaultValue={currentUser ? currentUser.phone : ""}
            onChange={handleOnChangePhone}
          />
          <Button variant="contained" onClick={handleEdit}>
            Edit
          </Button>
        </Stack>
      </Box>
    </div>
  );
}

export default Profile;
