import React, { useEffect, useState } from "react";
import ProsList from "./ProsList";
import ConsList from "./ConsList";
import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import axios from "axios";
import "../styles/Problem.css";

const PROBLEMS_ENDPOINT = "https://opobackend.azurewebsites.net/api/Problems";

const Problem = ({ user, problem, getProblems }) => {
  const { problemId, userId } = problem;
  const [name, setName] = useState(null)
  const [picURL, setPicURL] = useState();
  const [allLikes, setAllLikes] = useState(false);
  const allLikesURL = `https://opobackend.azurewebsites.net/api/Likes/all/${problemId}`;

  useEffect(() => {
    const getAllLikes = async (url) => {
      const likes = await axios.get(allLikesURL).then((r) => r.data);
      setAllLikes(likes);
      axios.get(`https://opobackend.azurewebsites.net/api/users/${userId ?? user.data.userId}`).then(res => setName(res.data.name))
    };

    getAllLikes(allLikesURL);
  }, []);

  const clickDelete = async () => {
    const { status } = await axios.delete(PROBLEMS_ENDPOINT + `/${problemId}`);
    if (status === 204) {
      getProblems();
    }
  };

  const asyncprofilePic = async () => {
    await axios.get(`https://opobackend.azurewebsites.net/api/users/${userId ?? user.data.userId}`).then(res => setPicURL(res.data.profilePicture.url))

  }

  useEffect(() => {
      asyncprofilePic();
    }, []
  )


  return (
    <div className="problem">
      <div className="problem-header" style={{ display: "flex" }}>
        <div>
          <Avatar
            className="avatar"
            style={{ border: "solid grey", margin: "1vw", marginTop: "1vw", backgroundColor:'white' }}
            src={picURL ?? `https://avatars.dicebear.com/api/big-ears/${userId}.svg`}
          />
          <span><b>{name?.split(" ")[0]}</b></span>
        </div>
        <div>
          <h3>{problem.title}</h3>
          <h6><span className="total-likes" style={{color: allLikes.proLikes > allLikes.conLikes ? "#84d052" : "#9a9a9a" }}>{allLikes.proLikes}</span> Pro Likes <span className="versus">vs</span> Con
            Likes <span className="total-likes" style={{color: allLikes.conLikes > allLikes.proLikes ? "#84d052" : "#9a9a9a" }}>{allLikes.conLikes}</span></h6>
        </div>
        {location.pathname === "/profile" || user.userId === userId  ? (
            <Tooltip title="Delete">
            <IconButton onClick={clickDelete}>
            <DeleteIcon />
          </IconButton>
            </Tooltip>
        ) : (
          <br />
        )}
      </div>
      <div className="problem-lists">
        <ProsList
          className="list"
          user={user}
          problem={problem}
          allLikes={allLikes}
          setAllLikes={setAllLikes}
          problemOwnerId={userId}
        />
        <ConsList
          className="list"
          user={user}
          problem={problem}
          allLikes={allLikes}
          setAllLikes={setAllLikes}
          problemOwnerId={userId}
        />
      </div>
    </div>
  );
};

export default Problem;
