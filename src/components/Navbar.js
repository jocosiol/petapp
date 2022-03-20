import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "./Navbar.css";
import AppContext from "../context/AppContext";
import axios from "axios";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
  },
};

Modal.setAppElement("#root");

function Navbar() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
    repassword: "",
    phone: "",
    admin: "",
  });
  const [modalIsOpen, setIsOpen] = useState(false);
  const { addUser, setCurrentUser, currentUser } = useContext(AppContext);
  let navigate = useNavigate();
  const admin = currentUser?.admin;


  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    //subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleChangeSignUp = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };

    const res = await axios.post("http://localhost:8000/users/login", user);
    if (res.data.token) {
      setEmail("");
      setPassword("");
      localStorage.setItem("token", JSON.stringify(res.data.token));
      setCurrentUser(res.data.user);
      navigate("/");
      closeModal();
    }
  };

  const onSubmitSignUp = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post("http://localhost:8000/users/signup", user);
      if (res.data) {
        addUser({ ...user });
        setUser({
          first: "",
          last: "",
          email: "",
          password: "",
          repassword: "",
          phone: "",
          admin: "",
        });
        navigate("/");
        closeModal();
        alert("Thanks for signing up. Please Log in.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const HandleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="navbar-wrapper">
      <div className="navbar-left">
        <img src="petapp_logo.png" height="50" className="navbar-item" alt="logo"></img>
        <div>
          <Link className="navbar-item" to="/">
            Home
          </Link>
        </div>
        {currentUser ? (
          <div>
            <Link className="navbar-item" to="/mypet">
              My Pet
            </Link>
          </div>
        ) : (
          <div></div>
        )}
        {currentUser ? (
          <div>
            <Link className="navbar-item" to="/pets">
              Pets
            </Link>
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <div className="navbar-right">
        {admin ? (<div>
          <Link className="navbar-item" to="/dashboard">
            Dashboard
          </Link>
        </div>) : (<div></div>)}
        {currentUser ? (
          <>
            <div>
              <Link className="navbar-item" to="/profile">
                Profile
              </Link>
            </div>
          </>
        ) : (
          <div> </div>
        )}
        {!currentUser ? (
          <div className="signup button" onClick={openModal}>
            Sign up/ Log in
          </div>
        ) : (
          <div className="signup button" onClick={HandleLogOut}>
            Sign out
          </div>
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal-form">
          <div className="modal-form-size">
            <img
              src="petapp_logo.png"
              width="300"
              className="navbar-item"
              alt="logo"
            ></img>
            <h1>Log In</h1>
            <div className="form-item">Email</div>
            <input
              type="email"
              className="form-item"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            />
            <div className="form-item">Password</div>
            <input
              type="password"
              className="form-item"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />
            <div className="modal-form-button" onClick={onSubmitLogin}>
              Log in
            </div>
          </div>
          <div className="vline"></div>
          <div className="modal-form-size">
            <h1>Sign Up</h1>
            <div className="form-item">Email</div>
            <input
              type="email"
              name="email"
              className="form-item"
              onChange={handleChangeSignUp}
              id="email"
            />
            <div className="form-item">Password</div>
            <input
              type="password"
              name="password"
              className="form-item"
              onChange={handleChangeSignUp}
              id="password"
            />
            <div className="form-item">Confirm Password</div>
            <input
              type="password"
              name="repassword"
              className="form-item"
              onChange={handleChangeSignUp}
              id="repassword"
            />
            <div className="form-item">First Name</div>
            <input
              type="text"
              name="first"
              className="form-item"
              onChange={handleChangeSignUp}
              id="first"
            />
            <div className="form-item">Last Name</div>
            <input
              type="text"
              name="last"
              className="form-item"
              onChange={handleChangeSignUp}
              id="last"
            />
            <div className="form-item">Phone Number</div>
            <input
              type="tel"
              name="phone"
              className="form-item"
              onChange={handleChangeSignUp}
              id="phone"
            />
            <div className="modal-form-button" onClick={onSubmitSignUp}>
              Sign Up
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Navbar;
