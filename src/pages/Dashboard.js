import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import DashboardNavbar from "../components/DashboardNavbar";
import DashboardBodyUser from "../components/DashboardBodyUser";
import DashboardBodyPet from "../components/DashboardBodyPet";


function Dashboard() {
  const { dashboardPressed } = useContext(AppContext);
  let body;

  if (dashboardPressed === "Pets") {
    body = (
        <div>
          <DashboardBodyPet />
        </div>
      );
  } else if (dashboardPressed === "Users") {
    body = (
      <div>
        <DashboardBodyUser />
      </div>
    );
  }

  return (
    <div>
      <DashboardNavbar />
      <div>{body}</div>
    </div>
  );
}

export default Dashboard;
