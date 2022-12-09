import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import axios from "axios";
import KeyboardDoubleArrowUpOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { useLocation } from "react-router-dom";
import { getLS } from "../helpers/storage";
import "../styles/ProConListItem.css";

const Likes_ENDPOINT = "https://opobackend.azurewebsites.net/api/Likes/con";
const Cons_ENDPOINT = "https://opobackend.azurewebsites.net/api/Cons";

const Con = ({ con, getProblems, allLikes, setAllLikes, problemOwnerId }) => {
  const { title, conId, problemId } = con;
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [picURL, setPicURL] = useState();
  const [conOwnerId, setConOwnerId] = useState(null);
  const user = getLS("User2");
  const [deleted, setDeleted] = useState(false)


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
    setDeleted(true);
    const { status } = await axios.delete(Cons_ENDPOINT + `/${conId}`);
    if (status === 204) {
      await getProblems();
    }
  };
  
  const getLikes = async () => {
    const { data, status } = await axios.get(Likes_ENDPOINT + `/${conId}`);
    if (status === 200 && Number.isInteger(data.length)) {
      setLikes(data.length);
      for (let i = 0; i < data.length; i++) {
        if (user.userId === data[i].userId) {
          setIsLiked(true);
        }
      }
    }
  };

  const getPic = async () => {
    const { data, status } = await axios.get(Cons_ENDPOINT + `/${conId}`);
    setConOwnerId(data.userId);
    axios
      .get(`https://opobackend.azurewebsites.net/api/users/${data.userId}`)
      .then((res) => setPicURL(res.data.profilePicture.url));
  };

  useEffect(() => {
    getLikes();
    getPic();
  }, []);

  return (
    <div
      className= {conOwnerId == problemOwnerId ? "ProConList-Item-owner" : "ProConList-Item"}
      style={{display: deleted ? 'none' :'flex',
      }}
    >
      <div>
        <Avatar
          style={{ border: "solid grey", margin: "1vw" }}
          src={
            picURL ??
            `https://avatars.dicebear.com/api/big-ears/${conOwnerId}.svg`
          }
        />
        {conOwnerId == problemOwnerId ? (
          <WorkspacePremiumIcon titleAccess="Owner" className="badge" />
        ) : (
          <br />
        )}
      </div>
      {location.pathname === "/" && !user ? (
        <div>
          <p>{likes}</p>
        </div>
      ) : (
        <div>
          <p >{likes}</p>
          {isLiked ? (
            <Tooltip title="Unlike">
              <IconButton onClick={handleUpVoteClick}>
                <KeyboardDoubleArrowUpOutlinedIcon htmlColor="green" />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Like">
              <IconButton onClick={handleUpVoteClick}>
                <KeyboardArrowUpOutlinedIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      )}
      <p className="opinions">{title}</p>
      {location.pathname === "/profile" || user.userId === conOwnerId ? (
        <Tooltip title="Delete">
          <IconButton onClick={handleDelete}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <br />
      )}
    </div>
  );
};

export default Con;
