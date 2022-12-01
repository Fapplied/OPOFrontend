import React, { useState } from "react";
import Button from "@mui/material/Button"
import {IconButton, Tooltip} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import "../styles/Form.css"
import Picker from "emoji-picker-react";

const ConForm = ({ addCon }) => {
  const [con, setCon] = useState({
    Disadvantage: "",
  });
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (event, emojiObject) => {

    setCon({ ...con, Disadvantage: con.Disadvantage + emojiObject.emoji });
    setShowPicker(false);
  };


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
        placeholder="Add a pro..."
        value={con.Disadvantage}
        onChange={handleTaskInputChange}
      />
      <img
        className="emoji-icon"
        src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
        onClick={() => setShowPicker(val => !val)}  alt='Emoji'/>
      {showPicker && <Picker
        pickerStyle={{ width: '100%' }}
        onEmojiClick={onEmojiClick} />}
      <Tooltip title='Add con'>
        <IconButton className="prosconButton" type="submit">
          <AddIcon />
        </IconButton>
      </Tooltip>
    </form>
  </div>
  );
};

export default ConForm;
