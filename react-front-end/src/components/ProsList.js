import React, {useEffect, useState} from 'react';
import Pro from './Pro'
import Con from "./Con";
import axios from "axios";
import ProForm from "./ProForm";

const ProList = () => {
  const [pros, setPros] = useState([])

  const addPro = (pro) => {
    // adds new con to beginning of cons array
    setPros([pro, ...pros]);
  }
  useEffect(() => {

    const test = async () => {
      const test = await axios.get("https://opobackend.azurewebsites.net/WeatherForecast").then(res => setPromlems({res})
      )
    }
    test();
  }, [pros])

  //Call back end and ask for list of Pros. Add its own controller.

  return (
    <div>
      <ul id='Cons-List'>
        { pros.map(to =>  <li ><Con /></li>)}
      </ul>
      <ProForm addPro={addPro}/>
      
    </div>
  );
};

export default ProList;
