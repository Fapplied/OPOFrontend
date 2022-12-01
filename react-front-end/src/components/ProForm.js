import React, { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import "../styles/Form.css"
import {IconButton, Tooltip} from "@mui/material";
import Picker from 'emoji-picker-react';

const ProForm = ({ addPro }) => {
  const [pro, setPro] = useState({
    Advantage: "",
  });
  
  const [showPicker, setShowPicker] = useState(false);
  const onEmojiClick = (event, emojiObject) => {
    
    setPro({ ...pro, Advantage: pro.Advantage + emojiObject.emoji });
    setShowPicker(false);
  };

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
        <img
          className="emoji-icon"
          src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
          onClick={() => setShowPicker(val => !val)}  alt='Emoji'/>
        {showPicker && <Picker
          pickerStyle={{ width: '100%' }}
          onEmojiClick={onEmojiClick} />}
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
