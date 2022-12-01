import React, { useEffect, useState } from "react";
import Problem from "./Problem";
import axios, { Axios } from "axios";
import PuffLoader from "react-spinners/PuffLoader";
import "../styles/Loading.css";
import ProblemFrom from "./ProblemFrom";
import "../styles/ProblemList.css"

const PROBLEMS_ENDPOINT = "https://opobackend.azurewebsites.net/api/Problems";
const PROBLEMS_ENDPOINT2 = `https://opobackend.azurewebsites.net/api/Problems`;

const HomePage = ({ user }) => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = user;

  const getProblems = async () => {
    const { data, status } = await axios.get(PROBLEMS_ENDPOINT);
    if (status === 200) {
      setLoading(false)
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
    
    <div >
      {user && <ProblemFrom addProblem={addProblem} />}
      {loading ? <div className="HomePageLoading"> <PuffLoader className="PuffLoader" size={200} color="#E88721" /> </div> : (
      <ul className="Problem-List" style={{}}>
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

export default HomePage;
