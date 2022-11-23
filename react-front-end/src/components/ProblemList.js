import React, {useEffect, useState} from 'react';
import Problem from "./Problem";
import axios, {Axios} from "axios";
import ProForm from "./ProForm";
import ProblemFrom from "./ProblemFrom";

const PROBLEMS_ENDPOINT = 'https://opobackend.azurewebsites.net/api/Problems';

const ProblemList = () => {
  const [problems, setProblems] = useState([])
  const getProblems = async () => {
    const {data, status} = await axios.get(PROBLEMS_ENDPOINT);
    if(status === 200) {
      setProblems(data)
    }
    
  }

  const addProblem = async (problem) => {
    // adds new con to beginning of cons array
    const {status } = axios.post(PROBLEMS_ENDPOINT + '?userId=1', problem)
    if(status === 200) {
      getProblems()
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
        {problems.map(problem =>  <li key={problem.id}><Problem  problem={problem}/></li>)}
      </ul>
    </div>
  );
};

export default ProblemList;
