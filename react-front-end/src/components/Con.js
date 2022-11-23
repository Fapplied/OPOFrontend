import React from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton} from "@mui/material";
import {ArrowUpwardOutlined} from "@mui/icons-material";

const Con = ({title}) => {
  const numberOfLikes = Math.floor(Math.random() * 11);
  return (
    <div style={{display: 'flex'}}>
      <div>
      <IconButton style={{padding: 0}} >
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

export default Con;
