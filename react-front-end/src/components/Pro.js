import React, { useEffect, useState } from "react";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Route, useLocation, Link } from "react-router-dom";
import axios from "axios";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardDoubleArrowUpOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
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
  const [proOwnerId, setProOwnerId] = useState(null);
  const [picURL, setPicURL] = useState();
  const [deleted, setDeleted] = useState(false)


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
    setDeleted(true);
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
          setIsLiked(true);
        }
      }
    }
  };

  const getProId = async () => {
    const { data, status } = await axios.get(PRO_ENDPOINT + `/${proId}`);
    setProOwnerId(data.userId);
    axios
      .get(`https://opobackend.azurewebsites.net/api/users/${data.userId}`)
      .then((res) => setPicURL(res.data.profilePicture.url));
  };

  useEffect(() => {
    getLikes();
    getProId();
  }, []);

  return (
    <div 
      className="ProConList-Item"
      style={{ display: deleted ? 'none' :'flex',
        boxShadow:
          proOwnerId == problemOwnerId
            ? " #F3C89D 0px 2px 4px 0px, #F3C89D 0px 2px 16px 0px"
            : "#DDDCDB 0px 2px 4px 0px, #DDDCDB 0px 2px 16px 0px",
        borderColor: proOwnerId == problemOwnerId ? "#F3C89D" : "#DDDCDB",
      }}
    >
      <div>
        <Avatar
          style={{ border: "solid grey", margin: "1vw" }}
          src={
            picURL ??
            `https://avatars.dicebear.com/api/big-ears/${proOwnerId}.svg`
          }
        />
        {proOwnerId == problemOwnerId ? (
          <WorkspacePremiumIcon titleAccess="Owner" className="badge" />
        ) : (
          <br />
        )}
      </div>
      {location.pathname === "/" && !user ? (
        <div>
          <p style={{ color: "black" }}>{likes}</p>
        </div>
      ) : (
        <div>
          <p style={{ color: "black" }}>{likes}</p>

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
      {location.pathname === "/profile" || user.userId === proOwnerId ? (
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

export default Pro;
