import React, {useState} from 'react';
import Button from '@mui/material/Button';

const ConForm = ({ addCon}) => {
  const [con, setCon] = useState({
    Disadvantage: ""
  });
  

  function handleTaskInputChange(e) {
    // e.target.value contains new input from onChange
    // event for input elements
    setCon({ ...con, Disadvantage: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault(); // prevents browser refresh
    // trim() gets rid of string whitespace
    if (con.Disadvantage.trim()) {
      addCon({ ...con });
      setCon({ ...con, Disadvantage: "" });
    }
  }
  return (
    <div className='form'>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          placeholder='Con'
          value={con.Disadvantage}
          onChange={handleTaskInputChange}
        />
        <Button type="submit">Post</Button>
      </form>
    </div>
  );
};

export default ConForm;
