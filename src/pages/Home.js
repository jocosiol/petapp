import React, {useContext} from "react";
import "./Home.css";
import AppContext from "../context/AppContext";


export const Home = () => {
  const appContext = useContext(AppContext);

  return (
    <div className="home-wrapper">
      <div className="home-left">
        <img src="./img/2.jpg" width="100%" alt="Home"></img>
        <div className="welcome">{appContext.currentUser ? `Welcome ${appContext.currentUser.first}!`  : 'Welcome!' }</div>
        <div className="intro">
          Petapp is the place where you will find your next four legged partner. In petapp we promise to take care of our furry friends in the best way possible. With the help of our Vets, Pet Stylers and Trainers we excel on keeping that promise. Everyone deserve a healthy diet and our Top Chefs take care of it, with the best ingredients on season and the best methods. Come and love what we do.
        </div>
      </div>
    </div>
  );
};

export default Home;

//<a href='https://www.freepik.com/photos/people'>People photo created by wayhomestudio - www.freepik.com</a>

//<a href='https://www.freepik.com/photos/woman'>Woman photo created by wayhomestudio - www.freepik.com</a>

//<a href='https://www.freepik.com/photos/background'>Background photo created by benzoix - www.freepik.com</a>
