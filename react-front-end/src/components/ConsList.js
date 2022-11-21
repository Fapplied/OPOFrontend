import React, {useEffect, useState} from 'react';
import axios from "axios";
import Problem from "./Problem";
import Con from "./Con";
import ConForm from "./ConForm";

const ConsList = () => {

 const addCon = (con) => {
    // adds new con to beginning of cons array
    setCons([con, ...cons]);
  }

  const [cons, setCons] = useState([])
  useEffect(() => {

    const test = async () => {
      const test = await axios.get("https://opobackend.azurewebsites.net/WeatherForecast").then(res => setPromlems({res})
      )
    }
    test();
  }, [cons])
  
  //Call back end and ask for list of cons. Add its own controller.
  return (
    <div>
      <ul id='Cons-List'>
        { cons.map(to =>  <li ><Con /></li>)}
      </ul>
      <ConForm addCon={addCon} />
    </div>
  );
};

export default ConsList;
