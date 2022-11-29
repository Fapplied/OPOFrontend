import React, {useState} from 'react';
import Button from "@mui/material/Button";
import "../styles/ProblemForm.css"

const ProblemFrom = ({addProblem}) => {
  const [problem, setProblem] = useState({
    Title: "",
  });


  function handleTaskInputChange(e) {
    // e.target.value contains new input from onChange
    // event for input elements
    setProblem({...problem, Title: e.target.value});
  }

  function handleSubmit(e) {
    e.preventDefault(); // prevents browser refresh
    // trim() gets rid of string whitespace
    if (problem.Title.trim()) {
      addProblem({...problem});
      setProblem({...problem, Title: ""});
    }
  }

  return (
    <div>
      <form className="Pro-form" onSubmit={handleSubmit}>
        <input
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
