import React, { useEffect, useState } from "react";
import ProsList from "./ProsList";
import ConsList from "./ConsList";
import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar, IconButton } from "@mui/material";
import axios from "axios";
import "../styles/Problem.css";

const PROBLEMS_ENDPOINT = "https://opobackend.azurewebsites.net/api/Problems";

const Problem = ({ user, problem, getProblems }) => {
  const { problemId, userId } = problem;
  const [picURL, setPicURL] = useState();
  const [allLikes, setAllLikes] = useState(false);

  const allLikesURL = `https://opobackend.azurewebsites.net/api/Likes/all/${problemId}`;

  useEffect(() => {
    const getAllLikes = async (url) => {
      const likes = await axios.get(allLikesURL).then((r) => r.data);
      setAllLikes(likes);
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
  
  useEffect( () => {
    asyncprofilePic();
    }, []
  )
  

  return (
    <div className="problem">
      <div className="problem-header" style={{ display: "flex" }}>
        <Avatar
          style={{ border: "solid grey", margin: "1vw", marginTop: "1vw" }}
          src={picURL ?? `https://avatars.dicebear.com/api/open-peeps/${userId}.svg`}
        />
        <h4>{problem.title}</h4>
        <h6>All ProLikes = {allLikes.proLikes}</h6>
        <h6>All ConLikes = {allLikes.conLikes}</h6>
        {location.pathname === "/profile" && user ? (
          <IconButton onClick={clickDelete}>
            <DeleteIcon />
          </IconButton>
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
        />
        <ConsList
          className="list"
          user={user}
          problem={problem}
          allLikes={allLikes}
          setAllLikes={setAllLikes}
        />
      </div>
    </div>
  );
};

export default Problem;
