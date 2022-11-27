import React, {useEffect, useState} from 'react';
import {Avatar, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { ArrowUpwardOutlined} from "@mui/icons-material";
import axios from "axios";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardDoubleArrowUpOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowUpOutlined';

const Likes_ENDPOINT = 'https://opobackend.azurewebsites.net/api/Likes/pro';


const Pro = ({pro}) => {
  const {title, proId} = pro
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  const handleUpVoteClick = async () => {
    const {data, status} = await axios.post(Likes_ENDPOINT + `?proId=${proId}`, 2);
    if (status === 201 || status === 204) {
      setIsLiked(prevState => !prevState)
      getLikes()
    }
  }
  const getLikes = async () => {
    const {data, status} = await axios.get(Likes_ENDPOINT + `/${proId}`);
    if(status === 200 && Number.isInteger(data.length)) {
      setLikes(data.length)
    }
  }
  
  useEffect(() => {

    getLikes()
  }, [])

  return (
    <div style={{display: 'flex'}}>
      <Avatar style={{border: 'solid grey' , margin: '1vw' }} src={`https://avatars.dicebear.com/api/open-peeps/${proId}.svg`}/>

      <div>
        <IconButton onClick={handleUpVoteClick} >
          {isLiked ? <KeyboardDoubleArrowUpOutlinedIcon/> :<KeyboardArrowUpOutlinedIcon/> }
        </IconButton>
        <p style={{color: "black"}}>{likes}</p>
      </div>
      <p className="opinions">{title}</p>
      <IconButton  >
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default Pro;
