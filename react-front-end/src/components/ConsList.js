import React, { useState } from "react";
import axios from "axios";
import Con from "./Con";
import ConForm from "./ConForm";

const Cons_ENDPOINT = "https://opobackend.azurewebsites.net/api/Cons";
const PROBLEMS_ENDPOINT = "https://opobackend.azurewebsites.net/api/Problems";

const ConsList = ({ problem, user, getProblems }) => {
  const { conList, problemId } = problem;
  const { userId } = user;

  const [cons, setCons] = useState(() => {
    return conList ?? [];
  });

  const addCon = async (con) => {
    // const { disadvantage } = con;
    // adds new con to beginning of cons array
    const { status } = await axios.post(
      Cons_ENDPOINT + `?problemId=${problemId}`,
      con
    );
    if (status === 201) {
      await getOneProblem()
    }
  };

  const getOneProblem = async () => {
    const { data } = await axios.get(PROBLEMS_ENDPOINT + `/${problemId}`);
    const { conList: theList } = data;
    setCons([...theList]);
  }


  return (
    <section className="ConSection">
    <div className="ConsWrapper">
      <h3>Cons</h3>
      {conList && (
        <ul className="Cons-List">
          {cons.map((con) => (
            <li key={con.conId}>
              <Con getProblems={getOneProblem} con={con} />
            </li>
          ))}
        </ul>
      )}
    </div>
      { user &&  <ConForm addCon={addCon} />}
    </section>
  );
};

export default ConsList;

