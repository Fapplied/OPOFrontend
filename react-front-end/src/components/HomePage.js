import React, { useEffect, useState } from "react";
import Problem from "./Problem";
import axios, { Axios } from "axios";
import logo from "../OPOlogo.jpg";

const PROBLEMS_ENDPOINT = "https://opobackend.azurewebsites.net/api/Problems";

const HomePage = ({ user }) => {
  const [problems, setProblems] = useState([]);

  const getProblems = async () => {
    const { data, status } = await axios.get(PROBLEMS_ENDPOINT);
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
      {/* <img src={logo} alt="logo" width="500px" /> */}
      <ul className="Problem-List" style={{}}>
        {problems.map((problem) => (
          <li key={problem.id}>
            <Problem
              user={user}
              getProblems={getProblems}
              problem={problem}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
