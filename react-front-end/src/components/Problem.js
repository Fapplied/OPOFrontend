import React, {useState} from 'react';
import ProsList from "./ProsList";
import ConsList from "./ConsList";
import DeleteIcon from "@mui/icons-material/Delete";
import {Avatar, IconButton} from "@mui/material";
import axios from "axios";

const PROBLEMS_ENDPOINT = 'https://opobackend.azurewebsites.net/api/Problems';

const Problem = ({problem, getProblems}) => {
  const {problemId, userId} = problem

  const clickDelete = async () => {
    const {status} = await axios.delete(PROBLEMS_ENDPOINT + `/${problemId}`)
    if (status === 204) {
      getProblems();
    }
  }

  return (
    <div>
      <div className='problem-header' style={{display: "flex"}}>
        <Avatar style={{border: 'solid grey' , margin: '1vw', marginTop: '1vw'  }} src={`https://avatars.dicebear.com/api/open-peeps/${userId}.svg`}/>
        <h4>{problem.title}</h4>
        {location.pathname === "/user" ?
          <IconButton onClick={clickDelete} >
            <DeleteIcon />
          </IconButton> : <br /> }
      </div>
      <div className='problem-lists'>
        <ProsList className='list-c' problem={problem}/>
        <ConsList className='list-c' problem={problem}/>
      </div>

    </div>
  );
};

export default Problem;
