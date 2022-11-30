import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Route, useLocation, Link } from "react-router-dom";
import axios from "axios";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardDoubleArrowUpOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";
import { getLS } from "../helpers/storage";
import "../styles/ProConListItem.css";

const Likes_ENDPOINT = "https://opobackend.azurewebsites.net/api/Likes/pro";
const PRO_ENDPOINT = "https://opobackend.azurewebsites.net/api/Pros";

const Pro = ({ pro, getProblems, allLikes, setAllLikes, problemOwnerId }) => {
  const { title, proId } = pro;
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const user = getLS("User2");
  const location = useLocation();
  const [proOwnerId, setProOwnerId] = useState(null)
  const [picURL, setPicURL] = useState();

  const handleUpVoteClick = async () => {
    const { data, status } = await axios.post(
      Likes_ENDPOINT +
      `?proId=${proId}&userId=${user.userId ?? user.data.userId}`
    );
    if (status === 201 || status === 204) {
      const newAllLikes = { ...allLikes };
      newAllLikes.proLikes =
        isLiked == false ? newAllLikes.proLikes + 1 : newAllLikes.proLikes - 1;
      setAllLikes(newAllLikes);
      setLikes(isLiked == false ? likes + 1 : likes - 1);
      setIsLiked((prevState) => !prevState);
    }
  };

  const handleDelete = async () => {
    const { status } = await axios.delete(PRO_ENDPOINT + `/${proId}`);
    if (status === 204) {
      await getProblems();
    }
  };

  const getLikes = async () => {
    const { data, status } = await axios.get(Likes_ENDPOINT + `/${proId}`);
    if (status === 200 && Number.isInteger(data.length)) {
      setLikes(data.length);

      for (let i = 0; i < data.length; i++) {
        if (user.userId === data[i].userId) {
          setIsLiked(true)
        }
      }

    }
  };

  const getProId = async () => {
    const { data, status } = await axios.get(PRO_ENDPOINT + `/${proId}`);
    setProOwnerId(data.userId)
    axios.get(`https://opobackend.azurewebsites.net/api/users/${data.userId}`).then(res => setPicURL(res.data.profilePicture.url))

  }

  useEffect(() => {
    getLikes();
    getProId();
  }, []);

  return (
    <div className="ProConList-Item">
      <div>
      <Avatar
        style={{ border: "solid grey", margin: "1vw" }}
        src={picURL ?? `https://avatars.dicebear.com/api/open-peeps/${proOwnerId}.svg`}
      />
      {proOwnerId == problemOwnerId ? <p>Owner</p> : <br />}
      </div>
      {location.pathname === "/" && !user ? (
        <div>
          <p style={{ color: "black" }}>{likes}</p>
        </div>
      ) : (
        <div>
          <p style={{ color: "black" }}>{likes}</p>
          <IconButton onClick={handleUpVoteClick}>
            {isLiked ? (
              <KeyboardDoubleArrowUpOutlinedIcon htmlColor="green" />
            ) : (
              <KeyboardArrowUpOutlinedIcon />
            )}
          </IconButton>
        </div>
      )}
      <p className="opinions">{title}</p>
      {location.pathname === "/profile" ? (
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      ) : (
        <br />
      )}
    </div>
  );
};

export default Pro;
