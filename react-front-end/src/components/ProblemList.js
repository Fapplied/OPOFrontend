import React, {useEffect, useState} from 'react';
import Problem from "./Problem";
import axios, {Axios} from "axios";
import ProForm from "./ProForm";
import ProblemFrom from "./ProblemFrom";

const ProblemList = () => {
  const [problems, setProblems] = useState([])
  const getProblems = async () => {
    const res = await axios.get("https://opobackend.azurewebsites.net/api/Problems");
    console.log(res)
    
  }
  useEffect(() => {

    
     getProblems();
  }, [])
  //fetch and Map problems
  return (
    <div>
      <ProblemFrom/>
      <ul id='Problem-List'>
        {/*{problems.map(to =>  <li ><Problem /></li>)}*/}
      </ul>
    </div>
  );
};

export default ProblemList;
