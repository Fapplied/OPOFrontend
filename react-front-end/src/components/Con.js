import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar, IconButton } from "@mui/material";
import axios from "axios";
import KeyboardDoubleArrowUpOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useLocation } from "react-router-dom";
import { getLS } from "../helpers/storage";
import "../styles/ProConListItem.css";

const Likes_ENDPOINT = "https://opobackend.azurewebsites.net/api/Likes/con";
const Cons_ENDPOINT = "https://opobackend.azurewebsites.net/api/Cons";
const Cons2_ENDPOINT = "https://localhost:7057/api/Cons";
const Likes2_ENDPOINT = "https://localhost:7057/api/Likes/con";

const Con = ({ con, getProblems, allLikes, setAllLikes }) => {
  const { title, conId, problemId } = con;
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const user = getLS("User2");

  const location = useLocation();

  const handleUpVoteClick = async () => {
    const { data, status } = await axios.post(
      Likes_ENDPOINT +
        `?conId=${conId}&userId=${user.userId ?? user.data.userId}`
    );
    if (status === 201 || status === 204) {
      const newAllLikes = { ...allLikes };
      newAllLikes.conLikes =
        isLiked == false ? newAllLikes.conLikes + 1 : newAllLikes.conLikes - 1;
      setAllLikes(newAllLikes);
      setLikes(isLiked == false ? likes + 1 : likes - 1);
      setIsLiked((prevState) => !prevState);
    }
  };

  const handleDelete = async () => {
    const { status } = await axios.delete(Cons_ENDPOINT + `/${conId}`);
    if (status === 204) {
      await getProblems();
    }
  };
  const getLikes = async () => {
    const { data, status } = await axios.get(Likes_ENDPOINT + `/${conId}`);
    if (status === 200 && Number.isInteger(data.length)) {
      setLikes(data.length);
    }
  };

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div className="ProConList-Item">
      <Avatar
        style={{ border: "solid grey", margin: "1vw" }}
        src={`https://avatars.dicebear.com/api/open-peeps/${conId}.svg`}
      />
      {location.pathname === "/" && !user ? (
        <div>
          <p style={{ color: "black" }}>{likes}</p>
        </div>
      ) : (
        <div>
          <p style={{ color: "black" }}>{likes}</p>
          <IconButton onClick={handleUpVoteClick}>
            {isLiked ? (
              <KeyboardDoubleArrowUpOutlinedIcon htmlColor="green"/>
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

export default Con;
