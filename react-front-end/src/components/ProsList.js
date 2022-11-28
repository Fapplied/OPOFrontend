import React, { useState } from "react";
import Pro from "./Pro";
import axios from "axios";
import ProForm from "./ProForm";

const Pro_ENDPOINT = "https://opobackend.azurewebsites.net/api/Pros";
const PROBLEMS_ENDPOINT = "https://opobackend.azurewebsites.net/api/Problems";

const ProList = ({ problem }) => {
  const { proList, problemId } = problem;

  const [pros, setPros] = useState(() => {
    return proList ?? [];
  });

  const addPro = async (pro) => {
    // adds new pro to beginning of cons array
    const { status } = await axios.post(
      Pro_ENDPOINT + `?problemId=${problemId}`,
      pro
    );
    if (status === 201) {
      const { data } = await axios.get(PROBLEMS_ENDPOINT + `/${problemId}`);
      const theList = data.proList;
      setPros([...theList]);
    }
  };

  //Call back end and ask for list of Pros. Add its own controller.
  return (
    <div>
      <h3>Pros</h3>
      {proList && (
        <ul className="Pros-List">
          {pros.map((pro) => (
            <li>
              <Pro pro={pro} />
            </li>
          ))}
        </ul>
      )}

      <ProForm addPro={addPro} />
    </div>
  );
};

export default ProList;
