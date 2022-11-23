import React, {useState} from 'react';
import Button from '@mui/material/Button';

const ConForm = ({addCon}) => {
  const [con, setCon] = useState({
    title: ""
  });
  

  function handleTaskInputChange(e) {
    // e.target.value contains new input from onChange
    // event for input elements
    setCon({ ...con, title: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault(); // prevents browser refresh
    // trim() gets rid of string whitespace
    if (con.task.trim()) {
      addCon({ ...con });
      setCon({ ...con, task: "" });
    }
  }
  return (
    <div className='form'>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          placeholder='Con'
          value={con.task}
          onChange={handleTaskInputChange}
        />
        <Button type="submit">Post</Button>
      </form>
    </div>
  );
};

export default ConForm;
