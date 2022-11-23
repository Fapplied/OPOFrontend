import React, {useEffect, useState} from 'react';
import Pro from './Pro'
import Con from "./Con";
import axios from "axios";
import ProForm from "./ProForm";

const ProList = ({problem}) => {
  
  const [pros, setPros] = useState( [])

  const {proList } = problem
  

  const addPro = (pro) => {
    // adds new con to beginning of cons array
    setPros([pro, ...pros]);
  }
  // useEffect(() => {
  //
  //   const test = async () => {
  //     const test = await axios.get("https://opobackend.azurewebsites.net/WeatherForecast").then(res => setPromlems({res})
  //     )
  //   }
  //   test();
  // }, [])

  //Call back end and ask for list of Pros. Add its own controller.

  return (
    <div>
      {proList && <h3>Pros</h3>}
      {proList && 
        
        <ul id='Cons-List'>
        { proList.map(to =>  <li ><Pro title={to.title} /></li>)}
      </ul>}
      
      
      <ProForm addPro={addPro}/>
      
    </div>
  );
};

export default ProList;
