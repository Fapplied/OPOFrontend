import React, {useEffect, useState} from 'react';
import Problem from "./Problem";
import axios, {Axios} from "axios";
import ProblemFrom from "./ProblemFrom";

const PROBLEMS_ENDPOINT = 'https://opobackend.azurewebsites.net/api/Problems';

const ProblemList = () => {
  const [problems, setProblems] = useState([])

  const getProblems = async () => {
    const {data, status} = await axios.get(PROBLEMS_ENDPOINT);
    if (status === 200) {
      setProblems(data)
    }
  }

  const addProblem = async (problem) => {
    // adds new con to beginning of problems array
        const tokenRaw = localStorage.getItem("Token");
    const token = tokenRaw != null ? jwtDecode(tokenRaw) : false;

    if (token && token.type !== "Error") {
      console.log("WE ARE SIGNED IN")
          const {data, status} = await axios.get(PROBLEMS_ENDPOINT);
    if (status === 200) {
      setProblems(data)
    }
    }
    setProblems([problem, ...problems]);
  }

  useEffect(() => {

    getProblems();
  }, [])

  //fetch and Map problems
  return (
    <div>
      <ProblemFrom addProblem={addProblem}/>
      <ul id='Problem-List'>
        {problems.map(problem => <li key={problem.id}><Problem getProblems={getProblems} problem={problem}/></li>)}
      </ul>
    </div>
  );
};

export default ProblemList;
