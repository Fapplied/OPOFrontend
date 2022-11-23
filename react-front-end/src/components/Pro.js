import React, {useEffect} from 'react';
import {IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {ArrowUpward, ArrowUpwardOutlined} from "@mui/icons-material";
import axios from "axios";

const Likes_ENDPOINT = 'https://opobackend.azurewebsites.net/api/Likes';


const Pro = ({title}) => {
  const numberOfLikes = Math.floor(Math.random() * 11);
  
  const getLikes = async () => {
    const {data, status} = await axios.get(Likes_ENDPOINT + `/${id}`);
    if(status === 200) {
      setProblems(data)
    }
  }
  

  // useEffect(() => {
  //
  //   getLikes()
  // }, [])

  return (
    <div style={{display: 'flex'}}>
      <div>
        <IconButton >
          <ArrowUpwardOutlined/>
        </IconButton>
        <p style={{color: "black"}}>{numberOfLikes}</p>
      </div>
      
      <p>{title}</p>
      <IconButton >
        <DeleteIcon/>
      </IconButton>
    </div>
  );
};

export default Pro;
