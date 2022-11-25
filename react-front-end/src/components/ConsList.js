import React, { useState} from 'react';
import axios from "axios";
import Con from "./Con";
import ConForm from "./ConForm";

const Cons_ENDPOINT = 'https://opobackend.azurewebsites.net/api/Cons';
const PROBLEMS_ENDPOINT = 'https://opobackend.azurewebsites.net/api/Problems';


const ConsList = ({problem}) => {
  const {conList, problemId} = problem
  
  const [cons, setCons] = useState( ()=> {
    return conList??[]})
  
  
  const addCon = async (con) => {
    // adds new con to beginning of cons array
    const {status } = await axios.post(Cons_ENDPOINT + `?problemId=${problemId}`, con)
    if(status === 201) {
      const { data} = await axios.get(PROBLEMS_ENDPOINT + `/${problemId}`)

      const {conList: theList} = data
      
      setCons([ ...theList]);
    }
  }
  
  //Call back end and ask for list of cons. Add its own controller.
  return (
    <div >
      {conList && <h3>Cons</h3>}
      {conList && <ul className='Cons-List'>
        { cons.map(con =>  <li ><Con con={con} /></li>)}
      </ul>}
      
      <ConForm addCon={addCon}/>
    </div>
  );
};

export default ConsList;
