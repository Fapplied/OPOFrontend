import React, { useEffect, useState } from "react";
import ProblemHomePage from "./ProblemHomePage";
import axios from "axios";
import logo from "../OPOlogo.jpg";

const ProfileEndpoint = "https://opobackend.azurewebsites.net/api/Problems";

// name picture

const HomePage = () => {
  const [problems, setProblems] = useState([]);

  const getProblems = async () => {
    const { data, status } = await axios.get(ProfileEndpoint);
    if (status === 200) {
      setProblems(data);
    }
  };

  useEffect(() => {
    getProblems();
  }, []);

  //fetch and Map problems
  return (
    <div>
      <img src={logo} alt="logo" width="500px" />
      <ul className="Problem-List" style={{}}>
        {problems.map((problem) => (
          <li key={problem.id}>
            <ProblemHomePage getProblems={getProblems} problem={problem} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
