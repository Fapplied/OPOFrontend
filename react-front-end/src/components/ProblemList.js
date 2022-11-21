import React, {useEffect, useState} from 'react';
import Problem from "./Problem";
import axios, {Axios} from "axios";
import ProForm from "./ProForm";

const ProblemList = () => {
  const [problems, setProblems] = useState([])
  useEffect(() => {

    const test = async () => {
      const test = await axios.get("https://opobackend.azurewebsites.net/ProblemController").then(res => console.log(res)
      )
    }
    test();
  }, [])
  //fetch and Map problems
  return (
    <div>
      <ul id='Problem-List'>
        {/*{problems.map(to =>  <li ><Problem /></li>)}*/}
      </ul>
      <ProForm/>
    </div>
  );
};

export default ProblemList;
