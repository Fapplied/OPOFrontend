import React, {useState} from 'react';

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
    <div>
      <form className="Pro-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          placeholder='Pro'
          value={pro.task}
          onChange={handleTaskInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProForm;
