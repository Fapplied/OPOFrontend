import React, { useState } from "react";
import axios from "axios";
import Con from "./Con";
import ConForm from "./ConForm";
import "../styles/ProConList.css";
import PostAddIcon from "@mui/icons-material/PostAdd";

const Cons_ENDPOINT = "https://opobackend.azurewebsites.net/api/Cons";
const PROBLEMS_ENDPOINT = "https://opobackend.azurewebsites.net/api/Problems";

const ConsList = ({ problem, user, allLikes, setAllLikes, problemOwnerId }) => {
  const { conList, problemId } = problem;
  const { userId } = user;

  const [cons, setCons] = useState(() => {
    return conList ?? [];
  });

  const addCon = async (con) => {
    const { Disadvantage } = con;
    const { status } = await axios.post(
      Cons_ENDPOINT + `?problemId=${problemId}`,
      { Disadvantage: Disadvantage, UserId: userId }
    );
    if (status === 201) {
      await getOneProblem();
    }
  };

  const getOneProblem = async () => {
    const data = await axios
      .get(PROBLEMS_ENDPOINT + `/${problemId}`)
      .then((res) => res.data);
    const theList = data.conList;
    setCons([...theList]);
  };

  return (
    <section className="ProConSection ConSection">
      <div className="ProConWrapper">
        <div className="ListHeader">
          <h3 className="ProConHeader">Cons</h3>
          <p className="">({conList.length})</p>
        </div>
        {conList && (
          <ul className="ProsConsList">
            {cons.length !== 0 ? (
              cons.map((con) => (
                <li key={con.conId}>
                  <Con
                    getProblems={getOneProblem}
                    con={con}
                    allLikes={allLikes}
                    setAllLikes={setAllLikes}
                    problemOwnerId={problemOwnerId}
                  />
                </li>
              ))
            ) : (
              <div className="empty-list">
                <PostAddIcon />
                <p>
                  No cons added yet, <br /> Add One!
                </p>
              </div>
            )}
          </ul>
        )}
      </div>
      {user && <ConForm addCon={addCon} />}
    </section>
  );
};

export default ConsList;
