import React from 'react';
import {IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {ArrowUpward, ArrowUpwardOutlined} from "@mui/icons-material";

const Pro = ({title}) => {
  const numberOfLikes = Math.floor(Math.random() * 11);

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
