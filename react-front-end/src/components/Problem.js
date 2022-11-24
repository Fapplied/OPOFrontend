import React from 'react';
import ProsList from "./ProsList";
import ConsList from "./ConsList";
import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton} from "@mui/material";
import axios from "axios";

const PROBLEMS_ENDPOINT = 'https://opobackend.azurewebsites.net/api/Problems';

const Problem = ( {problem}) => {
  // const [thisProblem, setThisProblem] = useState( problem?? []);
  
  const clickDelete = async () => {
    const {status } = await axios.delete(PROBLEMS_ENDPOINT + `/${problem.id}`)
    if(status === 204) {
      getProblems();
    }
  }
  
  return (
    <div>
      <div className='problem-header' style={{display: "flex" }}>
      <h4>{problem.title}</h4>
      <IconButton onClick={clickDelete}>
        <DeleteIcon/>
      </IconButton>
      </div>
      <div className='problem-lists' >
      <ProsList className='list-c' problem={problem}/>
      <ConsList className='list-c' problem={problem}/>
      </div>
      
    </div>
  );
};

export default Problem;
