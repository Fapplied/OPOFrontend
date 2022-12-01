import React, { useState } from "react";
import Button from "@mui/material/Button";
import "../styles/Form.css";

const ProblemFrom = ({ addProblem }) => {
  const [problem, setProblem] = useState({
    Title: "",
  });

  function handleTaskInputChange(e) {
    setProblem({ ...problem, Title: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (problem.Title.trim()) {
      addProblem({ ...problem });
      setProblem({ ...problem, Title: "" });
    }
  }

  return (
    <div className="ProblemFormWrapper">
      <form className="Problem-form" onSubmit={handleSubmit}>
        <input
          className="TextInput"
          type="text"
          name="task"
          placeholder="What's bothering you?"
          value={problem.Title}
          onChange={handleTaskInputChange}
        />
        <Button type="submit">Post</Button>
      </form>
    </div>
  );
};

export default ProblemFrom;
