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

  return (
    <div className="problem">
      <div className="problem-header" style={{ display: "flex" }}>
        <Avatar
          style={{ border: "solid grey", margin: "1vw", marginTop: "1vw" }}
          src={`https://avatars.dicebear.com/api/open-peeps/${userId}.svg`}
        />
        <h4>{problem.title}</h4>
        <h6>All ProLikes = {allLikes.ProLikes}</h6>
        <h6>All ConLikes = {allLikes.ConLikes}</h6>
        {location.pathname === "/profile" && user ? (
          <IconButton onClick={clickDelete}>
            <DeleteIcon />
          </IconButton>
        ) : (
          <br />
        )}
      </div>
      <div className="problem-lists">
        <ProsList className="list" user={user} problem={problem} />
        <ConsList className="list" user={user} problem={problem} />
      </div>
    </div>
  );
};

export default Problem;
