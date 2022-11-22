import React, {useState} from 'react';
import ProForm from "./ProForm";
import ConForm from "./ConForm";

const ProblemFrom = (addProblem) => {
  const [problem, setProblem] = useState({
    title: "",
  });


  function handleTaskInputChange(e) {
    // e.target.value contains new input from onChange
    // event for input elements
    setProblem({ ...problem, title: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault(); // prevents browser refresh
    // trim() gets rid of string whitespace
    if (problem.title.trim()) {
      addProblem({ ...problem });
      setProblem({ ...problem, title: "" });
    }
  }
  
  return (
    <div>
      <form className="Pro-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          placeholder='Pro'
          value={problem.title}
          onChange={handleTaskInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProblemFrom;
