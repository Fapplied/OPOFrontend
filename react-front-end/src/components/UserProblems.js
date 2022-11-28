import React, { useEffect, useState } from "react";
import ProblemHomePage from "./Problem";
import axios, { Axios } from "axios";
import logo from "../OPOlogo.jpg";
import ProblemFrom from "./ProblemFrom";

const UserProblems = ({ user }) => {
  const {userId} = user;
  //   console.log({ user2: user });
  const PROBLEMS_ENDPOINT =
    "https://opobackend.azurewebsites.net/api/Problems/user";

  const PROBLEMS_ENDPOINT2 = `https://opobackend.azurewebsites.net/api/Problems`;


  console.log("GET PROBLEMS URL", PROBLEMS_ENDPOINT + `/${user.userId}`);

  const [problems, setProblems] = useState([]);

  const getProblems = async () => {
    const { data, status } = await axios
      .get(PROBLEMS_ENDPOINT + `/${user.userId}`)
      .then((r) => r)
      .catch((e) => console.log({ AxiosError: e }));
    if (status === 200) {
      setProblems(data);
    }
  };

  const addProblem = async (problem) => {
    // adds new con to beginning of problems array
    const { status } = await axios.post(PROBLEMS_ENDPOINT2 + `?userId=${userId}`, problem)
    if (status === 201) {
      console.log('before the getProblem')
      // const {  data } = await axios.get(PROBLEMS_ENDPOINT);
      // setProblems([problem, ...problems]);
      // setProblems(data.p);
      getProblems()

    }
  };

  useEffect(() => {
    getProblems();
  }, []);

  //fetch and Map problems
  return (
    <div>
      <ProblemFrom addProblem={addProblem}/>
      {/* <img src={logo} alt="logo" width="500px" /> */}
      <ul className="Problem-List" style={{}}>
        {problems.map((problem) => (
          <li key={problem.id}>
            <ProblemHomePage
              user={user}
              getProblems={getProblems}
              problem={problem}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProblems;
