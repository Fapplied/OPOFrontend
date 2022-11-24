import React, {useState} from 'react';
import Button from "@mui/material/Button";

const ProblemFrom = ({addProblem}) => {
  const [problem, setProblem] = useState({
    title: "",
  });


  function handleTaskInputChange(e) {
    // e.target.value contains new input from onChange
    // event for input elements
    setProblem({...problem, title: e.target.value});
  }

  function handleSubmit(e) {
    e.preventDefault(); // prevents browser refresh
    // trim() gets rid of string whitespace
    if (problem.title.trim()) {
      addProblem({...problem});
      setProblem({...problem, title: ""});
    }
  }

  return (
    <div>
      <form className="Pro-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          placeholder='Problem'
          value={problem.title}
          onChange={handleTaskInputChange}
        />
        <Button type="submit">Post</Button>
      </form>
    </div>
  );
};

export default ProblemFrom;
