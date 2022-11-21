import React, {useEffect, useState} from 'react';
import Problem from "./Problem";
import axios, {Axios} from "axios";

const ProblemList = () => {
  const [problems, setPromlems] = useState([])
  useEffect(() => {

    const test = async () => {
      const test = await axios.get("https://opobackend.azurewebsites.net/WeatherForecast").then(res => setPromlems({res})
      )
    }
    test();
  }, [problems])
  //fetch and Map problems
  return (
    <div>
      <ul id='Problem-List'>
        problems.map(to =>  <li ><Problem /></li>)}
      </ul>
    </div>
  );
};

export default ProblemList;
