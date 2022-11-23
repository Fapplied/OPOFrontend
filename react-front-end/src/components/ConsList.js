import React, {useEffect, useState} from 'react';
import axios from "axios";
import Problem from "./Problem";
import Con from "./Con";
import ConForm from "./ConForm";

const ConsList = ({problem}) => {
  const {conList} = problem

 const addCon = (con) => {
    // adds new con to beginning of cons array
    setCons([con, ...cons]);
  }

  const [cons, setCons] = useState([])
  // useEffect(() => {
  //
  //   const test = async () => {
  //     const test = await axios.get("https://opobackend.azurewebsites.net/WeatherForecast").then(res => setPromlems({res})
  //     )
  //   }
  //   test();
  // }, [])
  
  //Call back end and ask for list of cons. Add its own controller.
  return (
    <div >
      {conList && <h3>Cons</h3>}
      {conList && <ul id='Cons-List'>
        { conList.map(to =>  <li ><Con title={to.title} /></li>)}
      </ul>}
      
      <ConForm addCon={addCon} />
    </div>
  );
};

export default ConsList;
