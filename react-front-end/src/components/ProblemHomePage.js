import React, {useState} from 'react';
import ProsList from "./ProsList";
import ConsList from "./ConsList";
import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton} from "@mui/material";
import axios from "axios";

const PROBLEMS_ENDPOINT = 'https://opobackend.azurewebsites.net/api/Problems';

const ProblemHomePage = ({problem, getProblems}) => {
  

  return (
    <div>
      <div className='problem-header' style={{display: "flex"}}>
        <h4>{problem.title}</h4>
      </div>
      <div className='problem-lists'>
        <ProsList className='list-c' problem={problem}/>
        <ConsList className='list-c' problem={problem}/>
      </div>

    </div>
  );
};

export default ProblemHomePage;
