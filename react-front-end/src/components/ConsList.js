import React, {useEffect, useState} from 'react';
import axios from "axios";
import Problem from "./Problem";
import Con from "./Con";
import ConForm from "./ConForm";

const Cons_ENDPOINT = 'https://opobackend.azurewebsites.net/api/Cons';


const ConsList = ({problem}) => {
  const {conList, problemId} = problem
  const [cons, setCons] = useState([])
  
  const addCon = (con) => {
    // adds new con to beginning of cons array
    const {status } = axios.post(Cons_ENDPOINT + `?problemId=${problemId}`, con)
    if(status) {
      // setCons([ ...cons, con]);
    }
  }
  
  
  //Call back end and ask for list of cons. Add its own controller.
  return (
    <div >
      {conList && <h3>Cons</h3>}
      {conList && <ul id='Cons-List'>
        { conList.map(con =>  <li ><Con con={con} /></li>)}
      </ul>}
      
      <ConForm addCon={addCon}/>
    </div>
  );
};

export default ConsList;
