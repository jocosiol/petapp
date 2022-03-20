import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import ViewPetsUserModal from "./ViewPetsUserModal";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import PreviewIcon from "@mui/icons-material/Preview";
import Modal from "@mui/material/Modal";


// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

function DashboardBodyUser() {
  const token = JSON.parse(localStorage.getItem("token"));
  const [allUsers, setAllUsers] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function getAllUsers() {
      try {
        if (!token) {
          return;
        }
        const decoded = jwt_decode(token);
        const res = await axios.get(`http://localhost:8000/users/`);
        setAllUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getAllUsers();
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {allUsers ? (
        <TableContainer
          component={Paper}
          sx={{ width: "50%", display: "flex", justifyContent: "center" }}
        >
          <Table
            stickyHeader
            sx={{ minWidth: 500, p: 1, m: 1 }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ width: "10%" }}>
                  View
                </TableCell>
                <TableCell align="left" sx={{ width: "5%" }}>
                  Id
                </TableCell>
                <TableCell align="left" sx={{ width: "30%" }}>
                  Name
                </TableCell>
                <TableCell align="left" sx={{ width: "40%" }}>
                  Email
                </TableCell>
                <TableCell align="left" sx={{ width: "15%" }}>
                  Phone
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers.map((user) => (
                <TableRow
                  hover
                  key={user.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                  }}
                >
                  <TableCell align="left">
                    <IconButton
                      aria-label="view_user"
                      onClick={() => {
                        const { id, first, last } = user;
                        setSelectedUser(user);
                        setOpen(true);
                      }}
                    >
                      <PreviewIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="left">{user.id}</TableCell>
                  <TableCell align="left">{`${user.first} ${user.last}`}</TableCell>
                  <TableCell align="left">{user.email}</TableCell>
                  <TableCell align="left">{user.phone}</TableCell>
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
        <ViewPetsUserModal user={selectedUser} />
      </Modal>
    </div>
  );
}

export default DashboardBodyUser;
