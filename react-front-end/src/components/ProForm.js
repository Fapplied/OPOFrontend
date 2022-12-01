import React, { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import "../styles/Form.css"
import {IconButton, Tooltip} from "@mui/material";

const ProForm = ({ addPro }) => {
  const [pro, setPro] = useState({
    Advantage: "",
  });

  function handleTaskInputChange(e) {
    // e.target.value contains new input from onChange
    // event for input elements
    setPro({ ...pro, Advantage: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault(); // prevents browser refresh
    // trim() gets rid of string whitespace
    if (pro.Advantage.trim()) {
      addPro({ ...pro });
      setPro({ ...pro, Advantage: "" });
    }
  }

  return (
    <div >
      <form className="ProConForm" onSubmit={handleSubmit}>
        <input
          className="TextInput"
          type="text"
          name="task"
          placeholder="Add a pro..."
          value={pro.Advantage}
          onChange={handleTaskInputChange}
        />
        <Tooltip title='Add pro'>
      <IconButton className="prosconButton" type="submit">
        <AddIcon />
    </IconButton>
        </Tooltip>
      </form>
    </div>
  );
};

export default ProForm;
