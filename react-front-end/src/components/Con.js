import React, {useEffect, useState} from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton} from "@mui/material";
import {ArrowUpwardOutlined} from "@mui/icons-material";
import axios from "axios";

const Likes_ENDPOINT = 'https://opobackend.azurewebsites.net/api/Likes/con';


const Con = ({ con }) => {
  const {title, conId, problemId} = con
  const [likes, setLikes] = useState(0)


  const getLikes = async () => {
    const {data, status} = await axios.get(Likes_ENDPOINT + `/${conId}`);
    console.log(data)
    if(status === 200 && Number.isInteger(data)) {
      setLikes(data)
    }
  }

  useEffect(() => {

    getLikes()
  }, [])
  
  return (
    <div style={{display: 'flex'}}>
      <div>
      <IconButton >
        <ArrowUpwardOutlined/>
      </IconButton>
        <p style={{color: "black"}}>{likes}</p>
      </div>
     <p>{title}</p>
      <IconButton >
        <DeleteIcon/>
      </IconButton>
    </div>
  );
};

export default Con;
