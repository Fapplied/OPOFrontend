import React, {useEffect, useState} from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton} from "@mui/material";
import axios from "axios";
import KeyboardDoubleArrowUpOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Likes_ENDPOINT = 'https://opobackend.azurewebsites.net/api/Likes/con';


const Con = ({ con }) => {
  const {title, conId, problemId} = con
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)


  const handleUpVoteClick = async () => {
    const { data, status} = await axios.post(Likes_ENDPOINT + `?conId=${conId}`, 1);
    setIsLiked(prevState => !prevState)
    if (status === 201) {
      getLikes()
      console.log(isLiked)
    }
  }

  const getLikes = async () => {
    const {data, status} = await axios.get(Likes_ENDPOINT + `/${conId}`);
    if(status === 200 && Number.isInteger(data.length)) {
      setLikes(data.length)
    }
  }

  useEffect(() => {

    getLikes()
  }, [])

  return (

    <div style={{display: 'flex'}}>
      <div>
        <IconButton onClick={handleUpVoteClick} >
          {isLiked ? <KeyboardDoubleArrowUpOutlinedIcon/> :<KeyboardArrowUpOutlinedIcon/> }
        </IconButton>
        <p style={{color: "black"}}>{likes}</p>
      </div>
      <p className="opinions">{title}</p>
      <IconButton >
        <DeleteIcon/>
      </IconButton>
    </div>
  );
};

export default Con;