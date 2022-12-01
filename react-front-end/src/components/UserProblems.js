import React, { useEffect, useState } from "react";
import Problem from "./Problem";
import axios, { Axios } from "axios";
import logo from "../OPOlogo.jpg";
import ProblemFrom from "./ProblemFrom";
import PuffLoader from "react-spinners/PuffLoader";
import "../styles/Loading.css"
import "../styles/ProblemList.css"


const UserProblems = ({ user }) => {
  const { userId } = user;
  const PROBLEMS_ENDPOINT =
    "https://opobackend.azurewebsites.net/api/Problems/user";
  const [loading, setLoading] = useState(true);

  const PROBLEMS_ENDPOINT2 = `https://opobackend.azurewebsites.net/api/Problems`;

  console.log("GET PROBLEMS URL", PROBLEMS_ENDPOINT + `/${user.userId}`);

  const [problems, setProblems] = useState([]);
  
  const getProblems = async () => {
    const currentUserId = user.userId ?? user.data.userId;
    const { data, status } = await axios
      .get(PROBLEMS_ENDPOINT + `/${currentUserId}`)
      .then((r) => r)
      .catch((e) => console.log({ AxiosError: e }));
    if (status === 200) {
      setLoading(false);
      setProblems(data);
    }
  };

  const addProblem = async (problem) => {
    // adds new con to beginning of problems array
    const { status } = await axios.post(
      PROBLEMS_ENDPOINT2 + `?userId=${userId}`,
      problem
    );
    if (status === 201) {
      await getProblems();
    }
  };

  useEffect(() => {
    getProblems();
  }, []);

  //fetch and Map problems
  return (
    <div>
      <ProblemFrom addProblem={addProblem} />
      {/* <img src={logo} alt="logo" width="500px" /> */}
      {loading ?  <div className="Userloading"> <PuffLoader className="PuffLoader" size={200} color="#E88721"/> </div>: (
      <ul className="Problem-List">
        {[...problems].reverse().map((problem) => (
          <li key={problem.problemId}>
            <Problem
              user={user}
              getProblems={getProblems}
              problem={problem}
            />
          </li>
        ))}
      </ul>)}
    </div>
  );
};

export default UserProblems;
