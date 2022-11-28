import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar, IconButton } from "@mui/material";
import axios from "axios";
import KeyboardDoubleArrowUpOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Likes_ENDPOINT = "https://opobackend.azurewebsites.net/api/Likes/con";

const Con = ({ con }) => {
  const { title, conId, problemId } = con;
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleUpVoteClick = async () => {
    const { data, status } = await axios.post(
      Likes_ENDPOINT + `?conId=${conId}`,
      1
    );
    if (status === 201 || status === 204) {
      getLikes();
      setIsLiked((prevState) => !prevState);
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
    <div style={{ display: "flex" }}>
      <Avatar
        style={{ border: "solid grey", margin: "1vw" }}
        src={`https://avatars.dicebear.com/api/open-peeps/${conId}.svg`}
      />
      {location.pathname === "/" ? (
        <br />
      ) : (
        <div>
          <IconButton onClick={handleUpVoteClick}>
            {isLiked ? (
              <KeyboardDoubleArrowUpOutlinedIcon />
            ) : (
              <KeyboardArrowUpOutlinedIcon />
            )}
          </IconButton>
          <p style={{ color: "black" }}>{likes}</p>
        </div>
      )}
      <p className="opinions">{title}</p>
      {location.pathname === "/user" ? (
        <IconButton>
          <DeleteIcon />
        </IconButton>
      ) : (
        <br />
      )}
    </div>
  );
};

export default Con;
