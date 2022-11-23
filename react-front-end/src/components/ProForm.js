import React, {useState} from 'react';
import Button from "@mui/material/Button";

const ProForm = ({addPro}) => {
  const [pro, setPro] = useState({
    title: "",
  });


  function handleTaskInputChange(e) {
    // e.target.value contains new input from onChange
    // event for input elements
    setPro({ ...pro, title: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault(); // prevents browser refresh
    // trim() gets rid of string whitespace
    if (pro.title.trim()) {
      addPro({ ...pro });
      setPro({ ...pro, title: "" });
    }
  }
  return (
    <div className='form'>
      <form className="Pro-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          placeholder='Pro'
          value={pro.task}
          onChange={handleTaskInputChange}
        />
        <Button type="submit">Post</Button>
      </form>
    </div>
  );
};

export default ProForm;
