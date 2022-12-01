import React, { useState } from "react";
import Button from "@mui/material/Button"
import {IconButton, Tooltip} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import "../styles/Form.css"

const ConForm = ({ addCon }) => {
  const [con, setCon] = useState({
    Disadvantage: "",
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
    <div >
      <form className="ProConForm" onSubmit={handleSubmit}>
        <input
          className="TextInput"
          type="text"
          name="task"
          placeholder="Add a con.."
          value={con.Disadvantage}
          onChange={handleTaskInputChange}
        />
        <Tooltip title='Add con'>
      <IconButton type="submit">
        <AddIcon />
    </IconButton>
        </Tooltip>
      </form>
    </div>
  );
};

export default ConForm;
