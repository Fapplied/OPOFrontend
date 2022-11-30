import React, { useState } from "react";
import Pro from "./Pro";
import axios from "axios";
import ProForm from "./ProForm";
import "../styles/ProConList.css";

const Pro_ENDPOINT = "https://opobackend.azurewebsites.net/api/Pros";
const PROBLEMS_ENDPOINT = "https://opobackend.azurewebsites.net/api/Problems";

const ProList = ({ problem, user }) => {
  const { proList, problemId } = problem;
  const { userId } = user;

  const [pros, setPros] = useState(() => {
    return proList ?? [];
  });

  const addPro = async (pro) => {
    // adds new pro to beginning of cons array
    const { Advantage } = pro;
    const { status } = await axios.post(
      Pro_ENDPOINT + `?problemId=${problemId}`,
      { Advantage: Advantage, UserId: userId }
    );
    if (status === 201) {
      await getOneProblem();
    }
  };

  const getOneProblem = async () => {
    const { data } = await axios.get(PROBLEMS_ENDPOINT + `/${problemId}`);
    const { proList: theList } = data;
    setPros([...theList]);
  };

  return (
    <section className="ProConSection ProSection">
      <div className="ProConWrapper">
        <div className="ListHeader">
        <h3 className="ProConHeader">Pros</h3>
        <p className="">({proList.length})</p>
        </div>
        {proList && (
          <ul className="ProsConsList">
            {pros.map((pro) => (
              <li key={pro.proId}>
                <Pro getProblems={getOneProblem} pro={pro} />
              </li>
            ))}
          </ul>
        )}
      </div>
      {user && <ProForm addPro={addPro} />}
    </section>
  );
};

export default ProList;
